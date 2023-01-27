import { Question, QuestionCategories } from "./models";

import csv from "fast-csv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

export class GameCache {
  private static words: string[] | null = null;
  private static questionsByFirstLetterAnswer: Map<string, Question[]> | null =
    null;

  public static getWords = (): string[] => {
    return GameCache.words ?? [];
  };

  public static getQuestionsByFirstLetterAnswer = (
    firstLetterAnswer: string
  ): Question[] => {
    return (
      (
        GameCache.questionsByFirstLetterAnswer ??
        ({} as Map<string, Question[]>)
      ).get(firstLetterAnswer) ?? []
    );
  };

  public static init = async (
    wordFiles: string[] | undefined = undefined,
    questionFiles: string[] | undefined = undefined,
    useUnrevised: boolean = false
  ): Promise<void> => {
    const resourcePath = this.getResourcePath();

    if (wordFiles == undefined) {
      wordFiles = [`${resourcePath}/words.csv`];
      if (useUnrevised) {
        wordFiles.push(`${resourcePath}/words_unrevised.csv`);
      }
    }

    if (questionFiles == undefined) {
      questionFiles = [`${resourcePath}/questions.csv`];
      if (useUnrevised) {
        questionFiles.push(`${resourcePath}/questions_unrevised.csv`);
      }
    }

    console.log("GameCache.init => start");
    console.time();

    const promises : Promise<void>[] = [];

    if (GameCache.words === null) {
      console.log("Caching words");
      promises.push(GameCache.cacheWords(wordFiles));
      console.log("Cached words");
    }

    if (GameCache.questionsByFirstLetterAnswer === null) {
      console.log("Caching questions");
      promises.push(GameCache.cacheQuestions(questionFiles));
      console.log("Cached questions");
    }

    await Promise.all(promises);

    console.timeEnd();
    console.log("GameCache.init => finished");
  };

  private static getResourcePath(): string {
    return path.dirname(fileURLToPath(import.meta.url));
  }

  private static cacheWords = async (files: string[]): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      const promises: Promise<string[]>[] = [];
      files.forEach((f) => promises.push(GameCache.fetchWords(f)));

      GameCache.words = ([] as string[]).concat(
        ...(await Promise.all(promises))
      );

      resolve();
    });
  };

  private static fetchWords = async (file: string): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      const words: string[] = [];

      fs.createReadStream(file.toString())
        .pipe(csv.parse({ delimiter: ";", headers: true, trim: true }))
        .on("data", (data: any) => {
          words.push(data.word);
        })
        .on("end", () => {
          resolve(words);
        });
    });
  };

  private static cacheQuestions = async (files: string[]): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      const promises: Promise<Question[]>[] = [];
      files.forEach((f) => promises.push(GameCache.getQuestions(f)));

      const questions = ([] as Question[]).concat(
        ...(await Promise.all(promises))
      );
      GameCache.questionsByFirstLetterAnswer = GameCache.groupBy(
        questions,
        (q: Question) => q.firstLetterAnswer
      );

      resolve();
    });
  };

  private static getQuestions = async (file: string): Promise<Question[]> => {
    return new Promise((resolve, reject) => {
      const questions: Question[] = [];

      fs.createReadStream(file)
        .pipe(csv.parse({ delimiter: ";", headers: true, trim: true }))
        .transform((row: any, next: any) => {
          return next(
            null,
            Question.createText(
              row.number,
              GameCache.getCategory(String(row.category)),
              row.question,
              row.answer,
              parseInt(row.m) - 1
            )
          );
        })
        .on("data", (row: Question) => {
          questions.push(row);
        })
        .on("end", () => {
          resolve(questions);
        });
    });
  };

  private static groupBy = <T, K>(
    list: T[],
    getKey: (item: T) => K
  ): Map<K, T[]> => {
    const map = new Map<K, T[]>();
    list.forEach((item) => {
      const key = getKey(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });

    return map;
  };

  private static getCategory = (category: string): QuestionCategories => {
    switch (category) {
      case "AARD":
        return QuestionCategories.Geography;
      case "BIJB":
        return QuestionCategories.Bible;
      case "BIO":
        return QuestionCategories.Biology;
      case "CRYP":
        return QuestionCategories.Cryptic;
      case "ECO":
        return QuestionCategories.Economy;
      case "GES":
        return QuestionCategories.History;
      case "KUN":
        return QuestionCategories.Art;
      case "LIT":
        return QuestionCategories.Literature;
      case "MUZ":
        return QuestionCategories.Music;
      case "POL":
        return QuestionCategories.Politics;
      case "SPO":
        return QuestionCategories.Sports;
      case "REK":
        return QuestionCategories.ScienceOrMaths;
      case "WET":
        return QuestionCategories.ScienceOrMaths;
      default:
        return QuestionCategories.Unknown;
    }
  };
}
