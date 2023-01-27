// src/object_pre_json_serializer.ts
var ObjectPreJsonSerializer = class {
  static copy(from, customize) {
    const src = from;
    const dest = {};
    for (const key of Object.keys(src)) {
      if (src[key] !== null) {
        dest[key] = src[key];
      }
    }
    customize(from, dest);
    return dest;
  }
};

// src/models.ts
var Game = class {
  constructor(word, questions) {
    this.word = word;
    this.numberOfQuestions = questions.length;
    this.questions = questions;
  }
};
var _Question = class {
  constructor(id, category, question, answer, level, imageUrl = null, blurImage = false, video = null) {
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
};
var Question = _Question;
Question.createText = (id, category, question, answer, level) => {
  return new _Question(id, category, question, answer, level);
};
Question.createImage = (id, category, question, answer, level, imageUrl, blurImage = false) => {
  return new _Question(
    id,
    category,
    question,
    answer,
    level,
    imageUrl,
    blurImage
  );
};
Question.createVideo = (id, category, question, answer, level, video) => {
  return new _Question(
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
var GameQuestion = class extends Question {
  constructor(number, wordPosition, question) {
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
};
var RemoteVideo = class {
  constructor(videoId, startAt, endAt, source) {
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
};
var RemoteVideoSources = /* @__PURE__ */ ((RemoteVideoSources2) => {
  RemoteVideoSources2[RemoteVideoSources2["Youtube"] = 0] = "Youtube";
  RemoteVideoSources2[RemoteVideoSources2["Vimeo"] = 1] = "Vimeo";
  return RemoteVideoSources2;
})(RemoteVideoSources || {});
var QuestionCategories = /* @__PURE__ */ ((QuestionCategories2) => {
  QuestionCategories2[QuestionCategories2["Unknown"] = 0] = "Unknown";
  QuestionCategories2[QuestionCategories2["Geography"] = 1] = "Geography";
  QuestionCategories2[QuestionCategories2["Bible"] = 2] = "Bible";
  QuestionCategories2[QuestionCategories2["Biology"] = 3] = "Biology";
  QuestionCategories2[QuestionCategories2["Cryptic"] = 4] = "Cryptic";
  QuestionCategories2[QuestionCategories2["Economy"] = 5] = "Economy";
  QuestionCategories2[QuestionCategories2["History"] = 6] = "History";
  QuestionCategories2[QuestionCategories2["Art"] = 7] = "Art";
  QuestionCategories2[QuestionCategories2["Literature"] = 8] = "Literature";
  QuestionCategories2[QuestionCategories2["Music"] = 9] = "Music";
  QuestionCategories2[QuestionCategories2["Politics"] = 10] = "Politics";
  QuestionCategories2[QuestionCategories2["Sports"] = 11] = "Sports";
  QuestionCategories2[QuestionCategories2["ScienceOrMaths"] = 12] = "ScienceOrMaths";
  return QuestionCategories2;
})(QuestionCategories || {});
var QuestionSelectionStrategies = /* @__PURE__ */ ((QuestionSelectionStrategies2) => {
  QuestionSelectionStrategies2[QuestionSelectionStrategies2["Demo"] = 0] = "Demo";
  QuestionSelectionStrategies2[QuestionSelectionStrategies2["Random"] = 1] = "Random";
  QuestionSelectionStrategies2[QuestionSelectionStrategies2["RandomOnlyEasy"] = 2] = "RandomOnlyEasy";
  return QuestionSelectionStrategies2;
})(QuestionSelectionStrategies || {});
var QuestionLevels = /* @__PURE__ */ ((QuestionLevels2) => {
  QuestionLevels2[QuestionLevels2["Easy"] = 0] = "Easy";
  QuestionLevels2[QuestionLevels2["Normal"] = 1] = "Normal";
  QuestionLevels2[QuestionLevels2["Hard"] = 2] = "Hard";
  return QuestionLevels2;
})(QuestionLevels || {});
var QuestionSelector = class {
  constructor(firstLetterAnswer, level, category) {
    this.category = category;
    this.firstLetterAnswer = firstLetterAnswer;
    this.level = level;
  }
};

// src/game_cache.ts
import csv from "fast-csv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
var _GameCache = class {
  static getResourcePath() {
    return path.dirname(fileURLToPath(import.meta.url));
  }
};
var GameCache = _GameCache;
GameCache.words = null;
GameCache.questionsByFirstLetterAnswer = null;
GameCache.getWords = () => {
  return _GameCache.words ?? [];
};
GameCache.getQuestionsByFirstLetterAnswer = (firstLetterAnswer) => {
  return (_GameCache.questionsByFirstLetterAnswer ?? {}).get(firstLetterAnswer) ?? [];
};
GameCache.init = async (wordFiles = void 0, questionFiles = void 0, useUnrevised = false) => {
  const resourcePath = _GameCache.getResourcePath();
  if (wordFiles == void 0) {
    wordFiles = [`${resourcePath}/words.csv`];
    if (useUnrevised) {
      wordFiles.push(`${resourcePath}/words_unrevised.csv`);
    }
  }
  if (questionFiles == void 0) {
    questionFiles = [`${resourcePath}/questions.csv`];
    if (useUnrevised) {
      questionFiles.push(`${resourcePath}/questions_unrevised.csv`);
    }
  }
  console.log("GameCache.init => start");
  console.time();
  const promises = [];
  if (_GameCache.words === null) {
    console.log("Caching words");
    promises.push(_GameCache.cacheWords(wordFiles));
    console.log("Cached words");
  }
  if (_GameCache.questionsByFirstLetterAnswer === null) {
    console.log("Caching questions");
    promises.push(_GameCache.cacheQuestions(questionFiles));
    console.log("Cached questions");
  }
  await Promise.all(promises);
  console.timeEnd();
  console.log("GameCache.init => finished");
};
GameCache.cacheWords = async (files) => {
  return new Promise(async (resolve, reject) => {
    const promises = [];
    files.forEach((f) => promises.push(_GameCache.fetchWords(f)));
    _GameCache.words = [].concat(
      ...await Promise.all(promises)
    );
    resolve();
  });
};
GameCache.fetchWords = async (file) => {
  return new Promise((resolve, reject) => {
    const words = [];
    fs.createReadStream(file.toString()).pipe(csv.parse({ delimiter: ";", headers: true, trim: true })).on("data", (data) => {
      words.push(data.word);
    }).on("end", () => {
      resolve(words);
    });
  });
};
GameCache.cacheQuestions = async (files) => {
  return new Promise(async (resolve, reject) => {
    const promises = [];
    files.forEach((f) => promises.push(_GameCache.getQuestions(f)));
    const questions = [].concat(
      ...await Promise.all(promises)
    );
    _GameCache.questionsByFirstLetterAnswer = _GameCache.groupBy(
      questions,
      (q) => q.firstLetterAnswer
    );
    resolve();
  });
};
GameCache.getQuestions = async (file) => {
  return new Promise((resolve, reject) => {
    const questions = [];
    fs.createReadStream(file).pipe(csv.parse({ delimiter: ";", headers: true, trim: true })).transform((row, next) => {
      return next(
        null,
        Question.createText(
          row.number,
          _GameCache.getCategory(String(row.category)),
          row.question,
          row.answer,
          parseInt(row.m) - 1
        )
      );
    }).on("data", (row) => {
      questions.push(row);
    }).on("end", () => {
      resolve(questions);
    });
  });
};
GameCache.groupBy = (list, getKey) => {
  const map = /* @__PURE__ */ new Map();
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
GameCache.getCategory = (category) => {
  switch (category) {
    case "AARD":
      return 1 /* Geography */;
    case "BIJB":
      return 2 /* Bible */;
    case "BIO":
      return 3 /* Biology */;
    case "CRYP":
      return 4 /* Cryptic */;
    case "ECO":
      return 5 /* Economy */;
    case "GES":
      return 6 /* History */;
    case "KUN":
      return 7 /* Art */;
    case "LIT":
      return 8 /* Literature */;
    case "MUZ":
      return 9 /* Music */;
    case "POL":
      return 10 /* Politics */;
    case "SPO":
      return 11 /* Sports */;
    case "REK":
      return 12 /* ScienceOrMaths */;
    case "WET":
      return 12 /* ScienceOrMaths */;
    default:
      return 0 /* Unknown */;
  }
};

// src/question_selection.ts
var QuestionSelectionStrategyFactory = class {
  static create(strategy) {
    switch (strategy) {
      case 2 /* RandomOnlyEasy */:
        return new RandomOnlyEasyQuestionSelectionStrategy();
      default:
        return new RandomQuestionSelectionStrategy();
    }
  }
};
var QuestionSelectionStrategy = class {
  getRandomElement(elements) {
    const index = Math.floor(Math.random() * elements.length);
    const element = elements[index];
    elements.splice(index, 1);
    return element;
  }
};
var RandomQuestionSelectionStrategy = class extends QuestionSelectionStrategy {
  getSelectors(word) {
    const questionSelectors = [];
    const categories = [
      1 /* Geography */,
      2 /* Bible */,
      3 /* Biology */,
      4 /* Cryptic */,
      5 /* Economy */,
      6 /* History */,
      7 /* Art */,
      8 /* Literature */,
      9 /* Music */,
      10 /* Politics */,
      11 /* Sports */,
      12 /* ScienceOrMaths */
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
      const questions = GameCache.getQuestionsByFirstLetterAnswer(firstLetterAnswer);
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
};
var RandomOnlyEasyQuestionSelectionStrategy = class extends QuestionSelectionStrategy {
  getSelectors(word) {
    const questionSelectors = [];
    const categories = [
      1 /* Geography */,
      1 /* Geography */,
      3 /* Biology */,
      4 /* Cryptic */,
      5 /* Economy */,
      6 /* History */,
      7 /* Art */,
      8 /* Literature */,
      9 /* Music */,
      10 /* Politics */,
      11 /* Sports */,
      12 /* ScienceOrMaths */
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
      const questions = GameCache.getQuestionsByFirstLetterAnswer(firstLetterAnswer);
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
};

// src/demo_game_factory_en.ts
var DemoGameFactoryEn = class {
  static getDemo1() {
    return new Game("supermarkets", [
      new GameQuestion(
        8,
        1,
        Question.createVideo(
          1,
          9 /* Music */,
          "Which artist sings 'The Greatest' here?",
          "Sia",
          1,
          new RemoteVideo("181938772", 100, 125, 1 /* Vimeo */)
        )
      ),
      new GameQuestion(
        1,
        2,
        Question.createText(
          2,
          1 /* Geography */,
          "Of which South American country is Montevideo the capital?",
          "Uruguay",
          1
        )
      ),
      new GameQuestion(
        3,
        3,
        Question.createImage(
          3,
          3 /* Biology */,
          "What is the name of this freshwater fish that inhabits South American rivers and has extremely sharp teeth?",
          "Piranha",
          1,
          "assets/piranha.png"
        )
      ),
      new GameQuestion(
        9,
        4,
        Question.createImage(
          4,
          7 /* Art */,
          "What is the french word for 'star'?",
          "Etoille",
          1,
          "assets/star.png"
        )
      ),
      new GameQuestion(
        7,
        5,
        Question.createVideo(
          5,
          7 /* Art */,
          "Which song is Katy Perry singing here?",
          "Roar",
          1,
          new RemoteVideo("160883302", 75, 100, 1 /* Vimeo */)
        )
      ),
      new GameQuestion(
        6,
        6,
        Question.createImage(
          6,
          7 /* Art */,
          "Who is this wife of Harry in this picture?",
          "Markle, Meghan",
          1,
          "assets/markle.png",
          true
        )
      ),
      new GameQuestion(
        2,
        7,
        Question.createVideo(
          7,
          7 /* Art */,
          "What is the name of the movie in which Lady Gaga sang this song? (4 words, first word)",
          "A star is born",
          1,
          new RemoteVideo("308775088", 35, 55, 1 /* Vimeo */)
        )
      ),
      new GameQuestion(
        11,
        8,
        Question.createImage(
          8,
          1 /* Geography */,
          "What is the Indonesian name of this 'Hairy' fruit?",
          "Rambutan",
          1,
          "assets/rambutan.png"
        )
      ),
      new GameQuestion(
        12,
        9,
        Question.createText(
          9,
          1 /* Geography */,
          "What is the name of Zurich's international airport?",
          "Kloten",
          1
        )
      ),
      new GameQuestion(
        4,
        10,
        Question.createText(
          10,
          12 /* ScienceOrMaths */,
          "What do we call it when the moon moves in between the sun and earth, (partially) blocking sunlight? Solar ... ?",
          "Eclips",
          1
        )
      ),
      new GameQuestion(
        10,
        11,
        Question.createVideo(
          11,
          7 /* Art */,
          "Which movie (saga) is this?",
          "Twilight",
          1,
          new RemoteVideo("134816480", 0, 25, 1 /* Vimeo */)
        )
      ),
      new GameQuestion(
        5,
        12,
        Question.createVideo(
          12,
          9 /* Music */,
          "Who sings 'Slow Down' here? (first name)",
          "Selena Gomez",
          1,
          new RemoteVideo("156668480", 30, 50, 1 /* Vimeo */)
        )
      )
    ]);
  }
  static getDemoYenni1() {
    return new Game("mosquitonets", [
      new GameQuestion(
        5,
        1,
        Question.createText(
          1,
          1 /* Geography */,
          "Kuala Lumpur is the capital of which country?",
          "Malaysia",
          1
        )
      ),
      new GameQuestion(
        3,
        2,
        Question.createText(
          2,
          12 /* ScienceOrMaths */,
          "Which letter is used to present 0?",
          "O",
          1
        )
      ),
      new GameQuestion(
        6,
        3,
        Question.createVideo(
          3,
          9 /* Music */,
          "Who is the singer of 'ME!' (last name)?",
          "Swift, Taylor",
          1,
          new RemoteVideo("379050150", 60, 85, 1 /* Vimeo */)
        )
      ),
      new GameQuestion(
        8,
        4,
        Question.createText(
          4,
          7 /* Art */,
          "In James Bond the scientist making all the gadgets is called what?",
          "Q",
          1
        )
      ),
      new GameQuestion(
        11,
        5,
        Question.createText(
          5,
          12 /* ScienceOrMaths */,
          "What do you call it when everyone votes tha same? A ... vote?",
          "Unanimous",
          1
        )
      ),
      new GameQuestion(
        2,
        6,
        Question.createText(
          6,
          1 /* Geography */,
          "Tikka masala, biryani and samoso are all food from which country?",
          "India",
          1
        )
      ),
      new GameQuestion(
        12,
        7,
        Question.createText(
          7,
          7 /* Art */,
          "In 'Peter Pan', what is the name of the little fairy?",
          "Tinkerbell",
          1
        )
      ),
      new GameQuestion(
        9,
        8,
        Question.createText(
          8,
          3 /* Biology */,
          "What do you call a dentist (a doctor that works on teeth) that specializes in straightening teeth with things like braces?",
          "Orthodontist",
          1
        )
      ),
      new GameQuestion(
        7,
        9,
        Question.createText(
          9,
          12 /* ScienceOrMaths */,
          "30 squared is equal to ... ?",
          "Nine hundred",
          1
        )
      ),
      new GameQuestion(
        1,
        10,
        Question.createText(
          10,
          12 /* ScienceOrMaths */,
          "What do we call a triangle with three equal sides and angles?",
          "Equilateral triangle",
          1
        )
      ),
      new GameQuestion(
        10,
        11,
        Question.createText(
          11,
          5 /* Economy */,
          "Which social media platform has a bird in its logo?",
          "Twitter",
          1
        )
      ),
      new GameQuestion(
        4,
        12,
        Question.createVideo(
          12,
          9 /* Music */,
          "What is the name of the professor in Harry Potter who has his classroom in the dungeon?",
          "Snape",
          1,
          new RemoteVideo("173071484", 420, 445, 1 /* Vimeo */)
        )
      )
    ]);
  }
};
DemoGameFactoryEn.getDemoYenni2 = () => {
  return new Game("earthquake", [
    new GameQuestion(
      3,
      1,
      Question.createText(
        1,
        12 /* ScienceOrMaths */,
        "Fractions with the same value are called?",
        "Equivalents",
        1
      )
    ),
    new GameQuestion(
      9,
      2,
      Question.createText(
        2,
        11 /* Sports */,
        "The once famous soccer player Diego Armando Maradonna comes from which country? (the tango also originated there)",
        "Argentina",
        1
      )
    ),
    new GameQuestion(
      5,
      3,
      Question.createText(
        3,
        11 /* Sports */,
        "What is the name of the soccer club from the capital of spain?",
        "Real madrid",
        1
      )
    ),
    new GameQuestion(
      8,
      4,
      Question.createText(
        4,
        12 /* ScienceOrMaths */,
        "25% of 48 is ... ?",
        "Twelve",
        1
      )
    ),
    new GameQuestion(
      2,
      5,
      Question.createText(
        5,
        12 /* ScienceOrMaths */,
        "Water is made up of oxygen and ... ?",
        "Hydrogen",
        1
      )
    ),
    new GameQuestion(
      1,
      6,
      Question.createText(
        6,
        7 /* Art */,
        "What is the name of the game in Harry Potter with a ball and broomstick? (english name)",
        "Quidditch",
        1
      )
    ),
    new GameQuestion(
      7,
      7,
      Question.createText(
        7,
        7 /* Art */,
        "How is a horse with one horn (fantasy figure) called?",
        "Unicorn",
        1
      )
    ),
    new GameQuestion(
      4,
      8,
      Question.createText(
        8,
        12 /* ScienceOrMaths */,
        "Topic of maths where you solve equations using letters?",
        "Algebra",
        1
      )
    ),
    new GameQuestion(
      10,
      9,
      Question.createText(
        9,
        12 /* ScienceOrMaths */,
        "Five letters before P?",
        "K",
        1
      )
    ),
    new GameQuestion(
      6,
      10,
      Question.createText(
        10,
        12 /* ScienceOrMaths */,
        "The square root of 121 is ... ?",
        "Eleven",
        1
      )
    )
  ]);
};

// src/demo_game_factory_nl.ts
var DemoGameFactoryNl = class {
  static getDemo1() {
    return new Game("buschauffeur", [
      new GameQuestion(
        8,
        1,
        Question.createImage(
          1,
          11 /* Sports */,
          "Wie is deze basketballer die begin 2020 samen met zijn dochter om het leven kwam bij een helikoper ongeluk?",
          "Bryant, Kobe",
          1,
          "assets/bryant.png"
        )
      ),
      new GameQuestion(
        1,
        2,
        Question.createVideo(
          2,
          9 /* Music */,
          "Welke britse groep zong o.a. dit nummer 'Kingston Town'?",
          "UB40",
          1,
          new RemoteVideo("154445067", 35, 55, 1 /* Vimeo */)
        )
      ),
      new GameQuestion(
        3,
        3,
        Question.createImage(
          3,
          3 /* Biology */,
          "Wat is de naam van deze Japanse rauwe vis lekkernij?",
          "Sashimi",
          1,
          "assets/sashimi.png"
        )
      ),
      new GameQuestion(
        9,
        4,
        Question.createImage(
          4,
          7 /* Art */,
          "Wie is deze filmster die ook bekend werd met zijn Nespresso reclames?",
          "Clooney, George",
          1,
          "assets/clooney.png",
          true
        )
      ),
      new GameQuestion(
        7,
        5,
        Question.createImage(
          5,
          7 /* Art */,
          "Wie is de acteur die samen met Tom Cruise in de film Rainman speelde?",
          "Hoffman, Dustin",
          1,
          "assets/hoffman.png"
        )
      ),
      new GameQuestion(
        6,
        6,
        Question.createVideo(
          6,
          7 /* Art */,
          "O'G3NE zingt hier het nummer Clown in De Beste Zangers 2016. De zussen heten Lisa, Shelley en ... wie is de derde?",
          "Amy",
          1,
          new RemoteVideo("167597368", 50, 70, 1 /* Vimeo */)
        )
      ),
      new GameQuestion(
        2,
        7,
        Question.createText(
          7,
          4 /* Cryptic */,
          "Cryptisch: Doven die gaan stappen ...",
          "Uitgaan",
          1
        )
      ),
      new GameQuestion(
        11,
        8,
        Question.createImage(
          8,
          1 /* Geography */,
          "Wat is de naam van deze bekendse Japanse berg?",
          "Fuji",
          1,
          "assets/fuji.png"
        )
      ),
      new GameQuestion(
        12,
        9,
        Question.createImage(
          9,
          3 /* Biology */,
          "Hoe wordt het proces genoemd waarbij in de bladgroenkorrels van planten CO2 wordt omgezet in zuurstof?",
          "Fotosynthese",
          1,
          "assets/fotosynthese.png"
        )
      ),
      new GameQuestion(
        4,
        10,
        Question.createVideo(
          10,
          7 /* Art */,
          "Welke groep had een grote hit met het nummer 'more than words'?",
          "Extreme",
          1,
          new RemoteVideo("500134973", 60, 90, 1 /* Vimeo */)
        )
      ),
      new GameQuestion(
        10,
        11,
        Question.createImage(
          11,
          9 /* Music */,
          "Dit is het nationale instrument van Hawai. Wat is de naam?",
          "Ukulele",
          1,
          "assets/ukulele.png"
        )
      ),
      new GameQuestion(
        5,
        12,
        Question.createImage(
          12,
          3 /* Biology */,
          "Wat is de naam van de grootste bloem ter wereld?",
          "Rafflesia",
          1,
          "assets/rafflesia.png"
        )
      )
    ]);
  }
};

// src/game_factory.ts
var _GameFactory = class {
};
var GameFactory = _GameFactory;
GameFactory.getGame = async (languageCode, strategy) => {
  let game = null;
  if (languageCode === "English") {
    game = DemoGameFactoryEn.getDemo1();
  } else if (strategy === QuestionSelectionStrategies[0 /* Demo */]) {
    game = DemoGameFactoryNl.getDemo1();
  } else {
    game = await _GameFactory.getRandom(strategy);
  }
  return game;
};
GameFactory.getRandom = async (strategy) => {
  const questionSelectionStrategy = _GameFactory.getQuestionSelectionStrategy(strategy);
  do {
    const randomWord = _GameFactory.getRandomWord();
    const questionSelectors = _GameFactory.getQuestionSelectors(
      questionSelectionStrategy,
      randomWord
    );
    if (randomWord.length === questionSelectors.length) {
      let gameQuestions = _GameFactory.getRandomQuestions(
        questionSelectors
      ).map(
        (question, index) => new GameQuestion(index + 1, index + 1, question)
      );
      _GameFactory.shuffle(gameQuestions);
      gameQuestions = gameQuestions.map(
        (gameQuestion, index) => new GameQuestion(index + 1, gameQuestion.wordPosition, gameQuestion)
      );
      return new Game(randomWord, gameQuestions);
    }
  } while (true);
};
GameFactory.getRandomQuestion = (selector) => {
  const questions = _GameFactory.getPossibleQuestions(selector);
  const count = questions.length;
  const randomIndex = Math.floor(Math.random() * count);
  return questions[randomIndex];
};
GameFactory.getPossibleQuestions = (selector) => {
  return GameCache.getQuestionsByFirstLetterAnswer(
    selector.firstLetterAnswer
  )?.filter(
    (q) => q.category === selector.category && q.level === selector.level
  );
};
GameFactory.getQuestionSelectionStrategy = (strategy) => {
  if (strategy === null || strategy === void 0)
    return 1 /* Random */;
  switch (strategy.toUpperCase()) {
    case QuestionSelectionStrategies[2 /* RandomOnlyEasy */].toUpperCase():
      return 2 /* RandomOnlyEasy */;
    default:
      return 1 /* Random */;
  }
};
GameFactory.getQuestionSelectors = (strategy, word) => {
  const selectionStrategy = QuestionSelectionStrategyFactory.create(strategy);
  let questionSelectors = [];
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
GameFactory.getRandomWord = () => {
  const words = GameCache.getWords();
  const count = words.length;
  const randomIndex = Math.floor(Math.random() * count);
  return words[randomIndex];
};
GameFactory.getRandomQuestions = (selectors) => {
  return selectors.map((selector) => {
    return _GameFactory.getRandomQuestion(selector);
  });
};
GameFactory.shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};
export {
  GameCache,
  GameFactory
};
