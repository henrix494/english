"use client";
import { Button, cn, Radio, RadioGroup } from "@nextui-org/react";
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
  const [btn_add, set_btn_add] = useState<number[]>([])
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
  const set_btn_hanlder = (index: number) => {
    set_btn_add([...btn_add, index])
  }
  const [confettiPieces, setConfettiPieces] = useState(0);

  const setAnswershandler = (index: number) => {
    set_btn_hanlder(index);
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
    <div className="flex flex-col ">
      <Toaster richColors />
      <h2>Questions</h2>
      {shuffledQuestions?.map((question, index) => (
        <div
          key={index}
          className="mb-4 mt-10 lg:ml-5 border-2 lg:pl-4 py-2 max-lg:text-center    "
        >
          <p className="font-bold ">{question.questions}</p>
          <div className=" ">
            <RadioGroup
              orientation="horizontal"
              classNames={{
                base: cn(
                  "max:lg-inline-flex m-0 flex flex-row     ",
                  " cursor-pointer rounded-lg gap-4 py-4 border-2 border-transparent",
                  "data-[selected=true]:border-primary"
                ),
              }}
            >
              {question.possible_answers.map((answer, answerIndex) => (
                <div
                  key={answerIndex}
                  className="px-5 py-2 bg-white rounded-xl mr-2 max-lg:mb-2"
                >
                  <Radio
                    isDisabled={radio_choice.some(
                      (item) => item.index === index
                    )}
                    onChange={() => {
                      set_radio_choice_handler(index, answer.is_true);
                    }}
                    value={answer.answer}
                    className="text-black font-medium "
                  >

                    {answer.answer}
                  </Radio>
                </div>
              ))}
            </RadioGroup>

          </div>
          {btn_add.some(item => item === index) && !radio_choice[index].isOK && <div key={index} className=" flex px-10"><p>{question.possible_answers.map(item => {
            if (item.is_true) {
              return <p key={index} className="bg-[#ffffff88] p-3 rounded-xl"> The correct answer is: {item.answer}</p>
            }
          })}</p>
          </div>}

          <Button onPress={() => setAnswershandler(index)} isDisabled={btn_add.some(item => item === index)} className="mt-10">
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
