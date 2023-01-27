import { QuestionSelectionStrategies, QuestionSelector } from "./models";
export declare class QuestionSelectionStrategyFactory {
    static create(strategy: QuestionSelectionStrategies): RandomOnlyEasyQuestionSelectionStrategy | RandomQuestionSelectionStrategy;
}
declare abstract class QuestionSelectionStrategy {
    getRandomElement(elements: any[]): any;
}
declare class RandomQuestionSelectionStrategy extends QuestionSelectionStrategy {
    getSelectors(word: string): QuestionSelector[];
}
declare class RandomOnlyEasyQuestionSelectionStrategy extends QuestionSelectionStrategy {
    getSelectors(word: String): QuestionSelector[];
}
export {};
//# sourceMappingURL=question_selection.d.ts.map