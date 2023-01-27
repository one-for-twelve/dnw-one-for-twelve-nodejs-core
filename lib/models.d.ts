export declare class Game {
    word: string;
    numberOfQuestions: Number;
    questions: GameQuestion[];
    constructor(word: string, questions: GameQuestion[]);
}
export declare class Question {
    id: Number;
    category: QuestionCategories;
    answer: string;
    text: string;
    level: QuestionLevels;
    imageUrl: string | null;
    blurImage: boolean;
    video: RemoteVideo | null;
    firstLetterAnswer: string;
    protected constructor(id: Number, category: QuestionCategories, question: string, answer: string, level: QuestionLevels, imageUrl?: string | null, blurImage?: boolean, video?: RemoteVideo | null);
    static createText: (id: Number, category: QuestionCategories, question: string, answer: string, level: QuestionLevels) => Question;
    static createImage: (id: Number, category: QuestionCategories, question: string, answer: string, level: QuestionLevels, imageUrl: string, blurImage?: boolean) => Question;
    static createVideo: (id: Number, category: QuestionCategories, question: string, answer: string, level: QuestionLevels, video: RemoteVideo) => Question;
}
export declare class GameQuestion extends Question {
    number: Number;
    wordPosition: Number;
    constructor(number: Number, wordPosition: Number, question: Question);
    toJSON(): any;
}
export declare class RemoteVideo {
    videoId: string;
    startAt: Number;
    endAt: Number;
    source: RemoteVideoSources;
    constructor(videoId: string, startAt: Number, endAt: Number, source: RemoteVideoSources);
    toJSON(): any;
}
export declare enum RemoteVideoSources {
    Youtube = 0,
    Vimeo = 1
}
export declare enum QuestionCategories {
    Unknown = 0,
    Geography = 1,
    Bible = 2,
    Biology = 3,
    Cryptic = 4,
    Economy = 5,
    History = 6,
    Art = 7,
    Literature = 8,
    Music = 9,
    Politics = 10,
    Sports = 11,
    ScienceOrMaths = 12
}
export declare enum QuestionSelectionStrategies {
    Demo = 0,
    Random = 1,
    RandomOnlyEasy = 2
}
export declare enum QuestionLevels {
    Easy = 0,
    Normal = 1,
    Hard = 2
}
export declare class QuestionSelector {
    category: QuestionCategories;
    firstLetterAnswer: string;
    level: QuestionLevels;
    constructor(firstLetterAnswer: string, level: QuestionLevels, category: QuestionCategories);
}
export declare class CacheStats {
    wordCount: Number;
    questionCount: Number;
    constructor(wordCount: Number, questionCount: Number);
}
//# sourceMappingURL=models.d.ts.map