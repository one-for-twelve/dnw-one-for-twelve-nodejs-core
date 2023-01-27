import { Game } from "./models";
export declare class GameFactory {
    static getGame: (languageCode: string, strategy: string) => Promise<Game>;
    private static getRandom;
    private static getRandomQuestion;
    private static getPossibleQuestions;
    private static getQuestionSelectionStrategy;
    private static getQuestionSelectors;
    private static getRandomWord;
    private static getRandomQuestions;
    private static shuffle;
}
//# sourceMappingURL=game_factory.d.ts.map