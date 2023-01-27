import {
  Game,
  GameQuestion,
  QuestionCategories,
  Question,
  RemoteVideo,
  RemoteVideoSources,
} from "./models";

export class DemoGameFactoryEn {
  public static getDemo1(): Game {
    return new Game("supermarkets", [
      new GameQuestion(
        8,
        1,
        Question.createVideo(
          1,
          QuestionCategories.Music,
          "Which artist sings 'The Greatest' here?",
          "Sia",
          1,
          new RemoteVideo("181938772", 100, 125, RemoteVideoSources.Vimeo)
        )
      ),
      new GameQuestion(
        1,
        2,
        Question.createText(
          2,
          QuestionCategories.Geography,
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
          QuestionCategories.Biology,
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
          QuestionCategories.Art,
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
          QuestionCategories.Art,
          "Which song is Katy Perry singing here?",
          "Roar",
          1,
          new RemoteVideo("160883302", 75, 100, RemoteVideoSources.Vimeo)
        )
      ),
      new GameQuestion(
        6,
        6,
        Question.createImage(
          6,
          QuestionCategories.Art,
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
          QuestionCategories.Art,
          "What is the name of the movie in which Lady Gaga sang this song? (4 words, first word)",
          "A star is born",
          1,
          new RemoteVideo("308775088", 35, 55, RemoteVideoSources.Vimeo)
        )
      ),
      new GameQuestion(
        11,
        8,
        Question.createImage(
          8,
          QuestionCategories.Geography,
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
          QuestionCategories.Geography,
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
          QuestionCategories.ScienceOrMaths,
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
          QuestionCategories.Art,
          "Which movie (saga) is this?",
          "Twilight",
          1,
          new RemoteVideo("134816480", 0, 25, RemoteVideoSources.Vimeo)
        )
      ),
      new GameQuestion(
        5,
        12,
        Question.createVideo(
          12,
          QuestionCategories.Music,
          "Who sings 'Slow Down' here? (first name)",
          "Selena Gomez",
          1,
          new RemoteVideo("156668480", 30, 50, RemoteVideoSources.Vimeo)
        )
      ),
    ]);
  }

  public static getDemoYenni1(): Game {
    return new Game("mosquitonets", [
      new GameQuestion(
        5,
        1,
        Question.createText(
          1,
          QuestionCategories.Geography,
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
          QuestionCategories.ScienceOrMaths,
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
          QuestionCategories.Music,
          "Who is the singer of 'ME!' (last name)?",
          "Swift, Taylor",
          1,
          new RemoteVideo("379050150", 60, 85, RemoteVideoSources.Vimeo)
        )
      ),
      new GameQuestion(
        8,
        4,
        Question.createText(
          4,
          QuestionCategories.Art,
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
          QuestionCategories.ScienceOrMaths,
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
          QuestionCategories.Geography,
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
          QuestionCategories.Art,
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
          QuestionCategories.Biology,
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
          QuestionCategories.ScienceOrMaths,
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
          QuestionCategories.ScienceOrMaths,
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
          QuestionCategories.Economy,
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
          QuestionCategories.Music,
          "What is the name of the professor in Harry Potter who has his classroom in the dungeon?",
          "Snape",
          1,
          new RemoteVideo("173071484", 420, 445, RemoteVideoSources.Vimeo)
        )
      ),
    ]);
  }

  public static getDemoYenni2 = (): Game => {
    return new Game("earthquake", [
      new GameQuestion(
        3,
        1,
        Question.createText(
          1,
          QuestionCategories.ScienceOrMaths,
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
          QuestionCategories.Sports,
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
          QuestionCategories.Sports,
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
          QuestionCategories.ScienceOrMaths,
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
          QuestionCategories.ScienceOrMaths,
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
          QuestionCategories.Art,
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
          QuestionCategories.Art,
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
          QuestionCategories.ScienceOrMaths,
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
          QuestionCategories.ScienceOrMaths,
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
          QuestionCategories.ScienceOrMaths,
          "The square root of 121 is ... ?",
          "Eleven",
          1
        )
      ),
    ]);
  };
}
