import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import { experimental_useObject as useObject } from "ai/react";
import { text_scema } from "@/schema/schema";
import { Card, Skeleton } from "@nextui-org/react";
import Qustions from "./Qustions";

export default function Text_Generetor({ level }: { level: string }) {
  // Dummy onsubmit function to simulate an API call or action
  const { object, submit, isLoading } = useObject({
    api: "/api/completion",
    schema: text_scema,
  });
  return (
    <div className=" ">
      <div className="flex justify-center  ">
        <Button onPress={() => submit(level)} type="submit">
          Submit
        </Button>
      </div>
      {isLoading ? (
        <div className="flex gap-10 mt-10">
          <div className="flex flex-col gap-3 w-[50%]">
            <Card className="w-[40vw] h-[400px] space-y-5 p-4" radius="lg">
              <Skeleton className="rounded-lg" isLoaded={false}>
                <div className="h-24 rounded-lg bg-secondary" />
              </Skeleton>
              <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg" isLoaded={false}>
                  <div className="h-3 w-full rounded-lg bg-secondary" />
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg" isLoaded={false}>
                  <div className="h-3 w-full rounded-lg bg-secondary-300" />
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg" isLoaded={false}>
                  <div className="h-3 w-full rounded-lg bg-secondary-200" />
                </Skeleton>
              </div>
            </Card>
          </div>
          <div className="flex flex-col gap-3">
            <Card className="w-[40vw] h-[400px] space-y-5 p-4" radius="lg">
              <Skeleton className="rounded-lg" isLoaded={false}>
                <div className="h-24 rounded-lg bg-secondary" />
              </Skeleton>
              <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg" isLoaded={false}>
                  <div className="h-3 w-full rounded-lg bg-secondary" />
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg" isLoaded={false}>
                  <div className="h-3 w-full rounded-lg bg-secondary-300" />
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg" isLoaded={false}>
                  <div className="h-3 w-full rounded-lg bg-secondary-200" />
                </Skeleton>
              </div>
            </Card>
          </div>
        </div>
      ) : (
        <div className="  px-6 mt-10   ">
          <div className="">
            {object?.text_and_questions?.map((item, index) => {
              return (
                <div
                  key={index}
                  className=" flex items-stretch overflow-visible "
                >
                  <div className="w-[60%]">
                    <h2>Title : {item?.title}</h2>
                    <div className="mt-10 sticky top-5">
                      <div className="">
                        <section className="text-base leading-7  ">
                          {item?.text_body}
                        </section>
                      </div>
                    </div>
                  </div>
                  <div className="w-[50%] ">
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