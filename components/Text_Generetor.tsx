import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import { experimental_useObject as useObject } from "ai/react";
import { text_schema } from "@/schema/schema";
import { Card, Skeleton } from "@nextui-org/react";
import Qustions from "./Qustions";
import Loader from "./Loader";

export default function Text_Generetor({ level }: { level: string }) {
  // Dummy onsubmit function to simulate an API call or action
  const { object, submit, isLoading } = useObject({
    api: "/api/completion",
    schema: text_schema,
  });
  return (
    <div className=" ">
      <div className="flex justify-center  ">
        <Button onPress={() => submit({ level })} type="submit">
          Generte Text and questions
        </Button>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className=" px-2  lg:px-6 mt-10   ">
          <div className="">
            {object?.text_and_questions?.map((item, index) => {
              return (
                <div
                  key={index}
                  className=" flex items-stretch  max-lg:flex-col "
                >
                  <div className="lg:w-[80%]">
                    <h2>Title : {item?.title}</h2>
                    <div className="mt-10 sticky top-5  ">
                      <div className="">
                        <section className="text-base leading-7 font-bold  ">
                          {item?.text_body?.map((item) => {
                            return (
                              <p className="mt-4" key={item}>
                                {item}
                              </p>
                            );
                          })}
                        </section>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-[40%] ">
                    <Qustions questions={item?.possible_answers} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
