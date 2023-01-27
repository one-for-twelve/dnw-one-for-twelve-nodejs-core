import {
  Game,
  QuestionSelector,
  QuestionSelectionStrategies,
  GameQuestion,
  Question,
} from "./models";
import { GameCache } from "./game_cache";
import { QuestionSelectionStrategyFactory } from "./question_selection";
import { DemoGameFactoryEn } from "./demo_game_factory_en";
import { DemoGameFactoryNl } from "./demo_game_factory_nl";

export class GameFactory {
  public static getGame = async (
    languageCode: string,
    strategy: string
  ): Promise<Game> => {
    let game : Game | null = null;

    if (languageCode === "English") {
      game = DemoGameFactoryEn.getDemo1();
    } else if (
      strategy === QuestionSelectionStrategies[QuestionSelectionStrategies.Demo]
    ) {
      game = DemoGameFactoryNl.getDemo1();
    } else {
      game = await GameFactory.getRandom(strategy);
    }

    return game;
  };

  private static getRandom = async (strategy: string): Promise<Game> => {
    const questionSelectionStrategy =
      GameFactory.getQuestionSelectionStrategy(strategy);

    do {
      const randomWord = GameFactory.getRandomWord();
      const questionSelectors = GameFactory.getQuestionSelectors(
        questionSelectionStrategy,
        randomWord
      );

      if (randomWord.length === questionSelectors.length) {
        let gameQuestions = GameFactory.getRandomQuestions(
          questionSelectors
        ).map(
          (question, index) => new GameQuestion(index + 1, index + 1, question)
        );
        GameFactory.shuffle(gameQuestions);
        gameQuestions = gameQuestions.map(
          (gameQuestion, index) =>
            new GameQuestion(index + 1, gameQuestion.wordPosition, gameQuestion)
        );
        return new Game(randomWord, gameQuestions);
      }
    } while (true);
  };

  private static getRandomQuestion = (selector: QuestionSelector) => {
    const questions = GameFactory.getPossibleQuestions(selector);
    const count = questions.length;
    const randomIndex = Math.floor(Math.random() * count);
    return questions[randomIndex];
  };

  private static getPossibleQuestions = (
    selector: QuestionSelector
  ): Question[] => {
    return GameCache.getQuestionsByFirstLetterAnswer(
      selector.firstLetterAnswer
    )?.filter(
      (q) => q.category === selector.category && q.level === selector.level
    );
  };

  private static getQuestionSelectionStrategy = (strategy: string) => {
    if (strategy === null || strategy === undefined)
      return QuestionSelectionStrategies.Random;

    switch (strategy.toUpperCase()) {
      case QuestionSelectionStrategies[
        QuestionSelectionStrategies.RandomOnlyEasy
      ].toUpperCase():
        return QuestionSelectionStrategies.RandomOnlyEasy;
      default:
        return QuestionSelectionStrategies.Random;
    }
  };

  private static getQuestionSelectors = (
    strategy: QuestionSelectionStrategies,
    word: string
  ) => {
    const selectionStrategy = QuestionSelectionStrategyFactory.create(strategy);

    let questionSelectors : QuestionSelector[] = [];
    let attempt = 1;

    do {
      questionSelectors = selectionStrategy.getSelectors(word);
      attempt++;
    } while (attempt <= 3 && questionSelectors.length < 12);

    if (attempt > 3) {
      console.log(`Could not create game for word: ${word}`);
    }

    return questionSelectors;
  };

  private static getRandomWord = (): string => {
    const words = GameCache.getWords();
    const count = words.length;
    const randomIndex = Math.floor(Math.random() * count);
    return words[randomIndex];
  };

  private static getRandomQuestions = (selectors: QuestionSelector[]) => {
    return selectors.map((selector) => {
      return GameFactory.getRandomQuestion(selector);
    });
  };

  private static shuffle = (array: any) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

      // swap elements array[i] and array[j]
      // we use "destructuring assignment" syntax to achieve that
      // you'll find more details about that syntax in later chapters
      // same can be written as:
      // let t = array[i]; array[i] = array[j]; array[j] = t
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
}
