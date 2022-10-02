import React, { Component } from "react";
import "./quiz.css";
import NavBar from "../NavBar/NavBar";

const questions = [
  {
    question: "In what year did President Reagan direct Nasa to build the ISS?",
    options: [1984, 2000, 1995, 1979],
    answer: 1984,
  },

  {
    question: "How many countries have participated in the ISS program?",
    options: [15, 20, 25, 30],
    answer: 15,
  },

  {
    question: "In what year was the first module of the ISS launched?",
    options: [1982, 1995, 1998, 2005],
    answer: 1998,
  },

  {
    question: "Where was the first ISS segment launched from?",
    options: ["USA", "Kazakhstan", "Russia", "China"],
    answer: "Kazakhstan",
  },
  {
    question: "When was the first US built component sent into orbit?",
    options: [
      "Two weeks later",
      "A month later",
      "A day later",
      "Four weeks later",
    ],
    answer: "Two weeks later",
  },
  {
    question: "Who was not part of the first crew that resided on the station?",
    options: [
      "Sergei Krikalev",
      "Yuri Gidzenko",
      "William Shepherd",
      "Mikhail Tyurin",
    ],
    answer: "Mikhail Tyurin",
  },
  {
    question:
      "What is the name of the lab module that boosted onboard living space by 41%?",
    options: ["Destiny", "Hope", "Dream", "Joy"],
    answer: "Destiny",
  },
  {
    question:
      "The Japanese Kibo Laboratory was integrated into the into the station in March 2008.",
    options: ["True", "False"],
    answer: "True",
  },
  {
    question:
      "How many people have visited the ISS by its 10-year anniversary?",
    options: ["150", "254", "202", "193"],
    answer: "202",
  },
];

class Quiz extends Component {
  state = {};

  render() {
    return (
      <div>
        <NavBar />
        <div
          style={{
            backgroundColor: "#000",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            fontSize: "14",
            color: "black",
            padding: "1rem",
          }}
        >
          <div className="quizContainer">
            {questions.map((question, index) => {
              return (
                <div className="questionContainer" key={index}>
                  <h2>{question.question}</h2>
                  <div className="optionsContainer">
                    {question.options.map((option, index) => {
                      return (
                        <div className="option" key={index}>
                          <button
                            style={{
                              backgroundColor:
                                this.state.selectedOption === option
                                  ? "blue"
                                  : "white",
                              padding: "10px",
                              paddingLeft: "50px",
                              paddingRight: "50px",
                              margin: "10px",
                              borderRadius: "5px",
                              boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.75)",
                              cursor: "pointer",
                              alignSelf: "center",
                            }}
                            onClick={() => {
                              if (option === question.answer) {
                                alert("Correct");
                              } else {
                                alert("Incorrect");
                              }
                            }}
                          >
                            {option}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Quiz;
