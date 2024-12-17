"use client";

import { Button, Radio, RadioGroup } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import Confetti from "react-confetti";

interface Answer {
  answer: string;
  is_true?: boolean;
}

interface Question {
  questions: string;
  possible_answers: Answer[];
}

interface Props {
  questions: Question[];
}

// Utility function to shuffle an array
const shuffleArray = (array: Answer[]) => {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};

export default function Questions({ questions }: Props) {
  const [radio_choice, set_radio_choice] = useState<
    { index: number; isOK: boolean }[]
  >([]);
  const [shuffledQuestions, setShuffledQuestions] = useState<
    { possible_answers: Answer[] }[]
  >([]);

  const set_radio_choice_handler = (
    index: number,
    choice: boolean | undefined
  ) => {
    set_radio_choice((prev: any) => {
      const updatedChoices = prev.filter((item: any) => item.index !== index);
      return [...updatedChoices, { index: index, isOK: choice }];
    });
  };

  const [confettiPieces, setConfettiPieces] = useState(0);

  const setAnswershandler = (index: number) => {
    const selectedChoice = radio_choice.find((item) => item.index === index);
    if (selectedChoice?.isOK) {
      toast.success("You got It Right!");
      setConfettiPieces(200);
      decreaseConfettiOverTime();
    } else {
      toast.error("Wrong answer");
    }
  };

  const decreaseConfettiOverTime = () => {
    const interval = setInterval(() => {
      setConfettiPieces((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 100;
      });
    }, 2000);
  };

  useEffect(() => {
    const shuffled = questions.map((q) => ({
      ...q,
      possible_answers: shuffleArray(q.possible_answers),
    }));
    setShuffledQuestions(shuffled);
  }, [questions]);

  return (
    <div className="">
      <Toaster richColors />
      <h2>Questions</h2>
      {shuffledQuestions?.map((question, index) => (
        <div key={index} className="mb-4 mt-10 ml-5 border-2 pl-4 py-2">
          <p className="font-bold">{question.questions}</p>
          <div className="flex flex-row">
            <RadioGroup className="mt-10 flex-row" orientation="horizontal">
              {question.possible_answers.map((answer, answerIndex) => (
                <div
                  key={answerIndex}
                  className="px-5 py-2 bg-white rounded-xl"
                >
                  <Radio
                    isDisabled={radio_choice.some(
                      (item) => item.index === index
                    )}
                    onChange={() => {
                      set_radio_choice_handler(index, answer.is_true);
                    }}
                    value={answer.answer}
                    className="text-gray-600"
                  >
                    {answer.answer}
                  </Radio>
                </div>
              ))}
            </RadioGroup>
          </div>
          <Button onPress={() => setAnswershandler(index)} className="mt-10">
            Check Answer
          </Button>
        </div>
      ))}
      <Confetti
        numberOfPieces={confettiPieces}
        style={{
          width: "100vw",
          position: "fixed",
          height: "100vh",
        }}
        gravity={0.3}
      />
    </div>
  );
}
