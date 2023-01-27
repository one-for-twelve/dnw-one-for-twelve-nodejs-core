import { ObjectPreJsonSerializer } from "./object_pre_json_serializer";

export class Game {
  public word: string;
  public numberOfQuestions: Number;
  public questions: GameQuestion[];

  constructor(word: string, questions: GameQuestion[]) {
    this.word = word;
    this.numberOfQuestions = questions.length;
    this.questions = questions;
  }
}

export class Question {
  public id: Number;
  public category: QuestionCategories;
  public answer: string;
  public text: string;
  public level: QuestionLevels;
  public imageUrl: string | null;
  public blurImage: boolean;
  public video: RemoteVideo | null;

  public firstLetterAnswer: string;

  protected constructor(
    id: Number,
    category: QuestionCategories,
    question: string,
    answer: string,
    level: QuestionLevels,
    imageUrl: string | null = null,
    blurImage: boolean = false,
    video: RemoteVideo | null = null
  ) {
    this.id = id;
    this.category = category;
    this.answer = answer;
    this.text = question;
    this.level = level;
    this.imageUrl = imageUrl;
    this.blurImage = blurImage;
    this.video = video;

    this.firstLetterAnswer = [...answer][0].toUpperCase();
  }

  static createText = (
    id: Number,
    category: QuestionCategories,
    question: string,
    answer: string,
    level: QuestionLevels
  ): Question => {
    return new Question(id, category, question, answer, level);
  };

  static createImage = (
    id: Number,
    category: QuestionCategories,
    question: string,
    answer: string,
    level: QuestionLevels,
    imageUrl: string,
    blurImage: boolean = false
  ): Question => {
    return new Question(
      id,
      category,
      question,
      answer,
      level,
      imageUrl,
      blurImage
    );
  };

  static createVideo = (
    id: Number,
    category: QuestionCategories,
    question: string,
    answer: string,
    level: QuestionLevels,
    video: RemoteVideo
  ): Question => {
    return new Question(
      id,
      category,
      question,
      answer,
      level,
      null,
      false,
      video
    );
  };
}

export class GameQuestion extends Question {
  public number: Number;
  public wordPosition: Number;

  constructor(number: Number, wordPosition: Number, question: Question) {
    super(
      question.id,
      question.category,
      question.text,
      question.answer,
      question.level,
      question.imageUrl,
      question.blurImage,
      question.video
    );

    this.number = number;
    this.wordPosition = wordPosition;
  }

  toJSON() {
    return ObjectPreJsonSerializer.copy(this, (src, dst) => {
      dst.category = QuestionCategories[src.category].toString();
      dst.level = QuestionLevels[src.level].toString();
    });
  }
}

export class RemoteVideo {
  public videoId: string;
  public startAt: Number;
  public endAt: Number;
  public source: RemoteVideoSources;

  constructor(
    videoId: string,
    startAt: Number,
    endAt: Number,
    source: RemoteVideoSources
  ) {
    this.videoId = videoId;
    this.startAt = startAt;
    this.endAt = endAt;
    this.source = source;
  }

  toJSON() {
    return ObjectPreJsonSerializer.copy(this, (src, dst) => {
      dst.source = RemoteVideoSources[src.source].toString();
    });
  }
}

export enum RemoteVideoSources {
  Youtube,
  Vimeo,
}

export enum QuestionCategories {
  Unknown,
  Geography,
  Bible,
  Biology,
  Cryptic,
  Economy,
  History,
  Art,
  Literature,
  Music,
  Politics,
  Sports,
  ScienceOrMaths,
}

export enum QuestionSelectionStrategies {
  Demo,
  Random,
  RandomOnlyEasy,
}

export enum QuestionLevels {
  Easy,
  Normal,
  Hard,
}

export class QuestionSelector {
  public category: QuestionCategories;
  public firstLetterAnswer: string;
  public level: QuestionLevels;

  constructor(
    firstLetterAnswer: string,
    level: QuestionLevels,
    category: QuestionCategories
  ) {
    this.category = category;
    this.firstLetterAnswer = firstLetterAnswer;
    this.level = level;
  }
}

export class CacheStats {
  public wordCount: Number;
  public questionCount: Number;

  constructor(wordCount: Number, questionCount: Number) {
    this.wordCount = wordCount;
    this.questionCount = questionCount;
  }
}
