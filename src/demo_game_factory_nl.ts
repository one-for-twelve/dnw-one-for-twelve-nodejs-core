import {
  Game,
  GameQuestion,
  QuestionCategories,
  Question,
  RemoteVideo,
  RemoteVideoSources,
} from "./models";

export class DemoGameFactoryNl {
  public static getDemo1(): Game {
    return new Game("buschauffeur", [
      new GameQuestion(
        8,
        1,
        Question.createImage(
          1,
          QuestionCategories.Sports,
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
          QuestionCategories.Music,
          "Welke britse groep zong o.a. dit nummer 'Kingston Town'?",
          "UB40",
          1,
          new RemoteVideo("154445067", 35, 55, RemoteVideoSources.Vimeo)
        )
      ),
      new GameQuestion(
        3,
        3,
        Question.createImage(
          3,
          QuestionCategories.Biology,
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
          QuestionCategories.Art,
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
          QuestionCategories.Art,
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
          QuestionCategories.Art,
          "O'G3NE zingt hier het nummer Clown in De Beste Zangers 2016. De zussen heten Lisa, Shelley en ... wie is de derde?",
          "Amy",
          1,
          new RemoteVideo("167597368", 50, 70, RemoteVideoSources.Vimeo)
        )
      ),
      new GameQuestion(
        2,
        7,
        Question.createText(
          7,
          QuestionCategories.Cryptic,
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
          QuestionCategories.Geography,
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
          QuestionCategories.Biology,
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
          QuestionCategories.Art,
          "Welke groep had een grote hit met het nummer 'more than words'?",
          "Extreme",
          1,
          new RemoteVideo("500134973", 60, 90, RemoteVideoSources.Vimeo)
        )
      ),
      new GameQuestion(
        10,
        11,
        Question.createImage(
          11,
          QuestionCategories.Music,
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
          QuestionCategories.Biology,
          "Wat is de naam van de grootste bloem ter wereld?",
          "Rafflesia",
          1,
          "assets/rafflesia.png"
        )
      ),
    ]);
  }
}
