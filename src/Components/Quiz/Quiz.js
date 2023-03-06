import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import "./Quiz.scss";
import { getQuestions } from "../apiCalls";

const Quiz = () => {
  const [question, setQuestions] = useState({});
  const [options, setOptions] = useState([]);
  const [option1, setOption1] = useState("neutral");
  const [option2, setOption2] = useState("neutral");
  const [option3, setOption3] = useState("neutral");
  const [option4, setOption4] = useState("neutral");
  const [optionTrue, setOptionTrue] = useState("neutral");
  const [optionFalse, setOptionFalse] = useState("neutral");

  const getAllQuestions = async () => {
    const data = await getQuestions();
    setQuestions(data.results[0]);
    const incorrect = data.results[0].incorrect_answers.map((item) => {
      return { option: item, type: "incorrect" };
    });
    const op = [
      ...incorrect,
      { option: data.results[0].correct_answer, type: "correct" },
    ];
    setOptions(shuffleArray(op));
  };

  useEffect(() => {
    if (Object.keys(question).length === 0) {
      getAllQuestions();
    }
  }, [getAllQuestions]);

  const shuffleArray = (shuffled) => {
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = temp;
    }
    return shuffled;
  };

  const handleClick = (e) => {
    e.preventDefault();

    switch (e.target.id) {
      case "1":
        setOption1(e.target.value);
        break;
      case "2":
        setOption2(e.target.value);
        break;
      case "3":
        setOption3(e.target.value);
        break;
      case "4":
        setOption4(e.target.value);
        break;
      case "true":
        if (question.correct_answer === "True") {
          setOptionTrue("correct");
        } else {
          setOptionTrue("incorrect");
        }
        break;
      case "false":
        if (question.correct_answer === "False") {
          setOptionFalse("correct");
        } else {
          setOptionFalse("incorrect");
        }
        break;
      default:
        break;
    }
  };

  const getNextQuestion = () => {
    setOption1("neutral");
    setOption2("neutral");
    setOption3("neutral");
    setOption4("neutral");
    setOptionTrue("neutral");
    setOptionFalse("neutral");
    getAllQuestions();
  };

  const questionType = () => {
    if (Object.keys(question) !== 0) {
      const quizOptions =
        question.type !== "boolean" ? (
          <div className="options">
            <button
              id={1}
              className={option1}
              value={options[0].type}
              onClick={(e) => handleClick(e)}
            >
              {options[0].option}
            </button>
            <button
              id={2}
              className={option2}
              value={options[1].type}
              onClick={(e) => handleClick(e)}
            >
              {options[1].option}
            </button>
            <button
              id={3}
              className={option3}
              value={options[2].type}
              onClick={(e) => handleClick(e)}
            >
              {options[2].option}
            </button>
            <button
              id={4}
              className={option4}
              value={options[3].type}
              onClick={(e) => handleClick(e)}
            >
              {options[3].option}
            </button>
          </div>
        ) : (
          <div className="options">
            <button
              id="true"
              className={optionTrue}
              onClick={(e) => handleClick(e)}
            >
              True
            </button>
            <button
              id="false"
              className={optionFalse}
              onClick={(e) => handleClick(e)}
            >
              False
            </button>
          </div>
        );
      return quizOptions;
    } else {
      return <h4>There was a problem on our end!</h4>;
    }
  };

  return (
    <div>
      <NavBar />
      <div className="quizContainer">
        <div className="background">
          <h2 className="question">Question: {question.question}</h2>
          {questionType()}
        </div>
        <button className="next" onClick={getNextQuestion}>
          Next Question
        </button>
      </div>
    </div>
  );
};

export default Quiz;
