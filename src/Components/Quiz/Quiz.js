import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";

const Quiz = () => {
  const [question, setQuestions] = useState({});

  useEffect(() => {
    const getQuestions = async () => {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=1&category=22"
      );
      const data = await response.json();
      setQuestions(data.results[0]);
      console.log("questions", question);
    };
    getQuestions();
  }, []);

  console.log(question);

  return (
    <div>
      <NavBar />
      <div>
        <h2>Question: {question.question}</h2>
      </div>
      <p>Hello</p>
    </div>
  );
};

export default Quiz;
