import {
  QuestionSelectionStrategies,
  QuestionCategories,
  QuestionSelector,
} from "./models";
import { GameCache } from "./game_cache";

export class QuestionSelectionStrategyFactory {
  static create(strategy: QuestionSelectionStrategies) {
    switch (strategy) {
      case QuestionSelectionStrategies.RandomOnlyEasy:
        return new RandomOnlyEasyQuestionSelectionStrategy();
      default:
        return new RandomQuestionSelectionStrategy();
    }
  }
}

abstract class QuestionSelectionStrategy {
  getRandomElement(elements: any[]) {
    const index = Math.floor(Math.random() * elements.length);
    const element = elements[index];

    elements.splice(index, 1);

    return element;
  }
}

class RandomQuestionSelectionStrategy extends QuestionSelectionStrategy {
  getSelectors(word: string) {
    const questionSelectors : QuestionSelector[] = [];

    const categories = [
      QuestionCategories.Geography,
      QuestionCategories.Bible,
      QuestionCategories.Biology,
      QuestionCategories.Cryptic,
      QuestionCategories.Economy,
      QuestionCategories.History,
      QuestionCategories.Art,
      QuestionCategories.Literature,
      QuestionCategories.Music,
      QuestionCategories.Politics,
      QuestionCategories.Sports,
      QuestionCategories.ScienceOrMaths,
    ];

    const levels = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2];
    const letters = [...word];

    for (const letter of letters) {
      const category = super.getRandomElement(categories);
      const level = super.getRandomElement(levels);
      const selector = new QuestionSelector(
        letter.toUpperCase(),
        level,
        category
      );
      const firstLetterAnswer = letter.toUpperCase();

      const questions =
        GameCache.getQuestionsByFirstLetterAnswer(firstLetterAnswer);

      const possibleQuestions = questions.filter(
        (q) => q.category === category && q.level === level
      );

      if (possibleQuestions.length === 0) {
        console.log(
          `No questions with: ${firstLetterAnswer}, ${category}, ${level}`
        );
        break;
      }

      questionSelectors.push(selector);
    }

    return questionSelectors;
  }
}

class RandomOnlyEasyQuestionSelectionStrategy extends QuestionSelectionStrategy {
  getSelectors(word: String) {
    const questionSelectors : QuestionSelector[] = [];
    const categories = [
      QuestionCategories.Geography,
      QuestionCategories.Geography,
      QuestionCategories.Biology,
      QuestionCategories.Cryptic,
      QuestionCategories.Economy,
      QuestionCategories.History,
      QuestionCategories.Art,
      QuestionCategories.Literature,
      QuestionCategories.Music,
      QuestionCategories.Politics,
      QuestionCategories.Sports,
      QuestionCategories.ScienceOrMaths,
    ];

    const levels = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const letters = [...word];

    for (const letter of letters) {
      const category = super.getRandomElement(categories);
      const level = super.getRandomElement(levels);
      const selector = new QuestionSelector(
        letter.toUpperCase(),
        level,
        category
      );
      const firstLetterAnswer = letter.toUpperCase();

      const questions =
        GameCache.getQuestionsByFirstLetterAnswer(firstLetterAnswer);

      const possibleQuestions = questions.filter(
        (q) => q.category === category && q.level === level
      );

      if (possibleQuestions.length === 0) {
        console.log(
          `No questions with: ${firstLetterAnswer}, ${category}, ${level}`
        );
        break;
      }

      questionSelectors.push(selector);
    }

    return questionSelectors;
  }
}
