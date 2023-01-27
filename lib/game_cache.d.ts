import { Question } from "./models";
export declare class GameCache {
    private static words;
    private static questionsByFirstLetterAnswer;
    static getWords: () => string[];
    static getQuestionsByFirstLetterAnswer: (firstLetterAnswer: string) => Question[];
    static init: (wordFiles?: string[] | undefined, questionFiles?: string[] | undefined, useUnrevised?: boolean) => Promise<void>;
    private static getResourcePath;
    private static cacheWords;
    private static fetchWords;
    private static cacheQuestions;
    private static getQuestions;
    private static groupBy;
    private static getCategory;
}
//# sourceMappingURL=game_cache.d.ts.map