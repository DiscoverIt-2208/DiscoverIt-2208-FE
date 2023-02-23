import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import "./Quiz.scss";

const Quiz = () => {
  const [question, setQuestions] = useState({});
  const [options, setOptions] = useState([]);
  const [choice, setChoice] = useState("");
  const [empty, setEmpty] = useState("");

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=1&category=22"
    );
    const data = await response.json();
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
    setChoice(e.target.innerText);
    e.target.classList.add(e.target.value);
    // console.log(e.target.value);
  };

  // console.log(question);
  // console.log(options);

  const questionType = () => {
    if (Object.keys(question) != 0) {
      const quizOptions =
        question.type != "boolean" ? (
          <div className="options">
            <button
              className={empty}
              value={options[0].type}
              onClick={(e) => handleClick(e)}
            >
              {options[0].option}
            </button>
            <button
              className={empty}
              value={options[1].type}
              onClick={(e) => handleClick(e)}
            >
              {options[1].option}
            </button>
            <button
              className={empty}
              value={options[2].type}
              onClick={(e) => handleClick(e)}
            >
              {options[2].option}
            </button>
            <button
              className={empty}
              value={options[3].type}
              onClick={(e) => handleClick(e)}
            >
              {options[3].option}
            </button>
          </div>
        ) : (
          <div className="options">
            <button onClick={(e) => handleClick(e)}>True</button>
            <button onClick={(e) => handleClick(e)}>False</button>
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
        <h2 className="question">Question: {question.question}</h2>
        {questionType()}
        <button onClick={getQuestions}>Next Question!</button>
      </div>
    </div>
  );
};

export default Quiz;
