"use client";
import React, { useState } from "react";
import { english_levels } from "@/constants";
import { Button, Card, CardBody, CardFooter } from "@nextui-org/react";
import Text_Generetor from "./Text_Generetor";
import { Toaster, toast } from "sonner";

export default function Level_List() {
  const [selected_index, set_selected_index] = useState<boolean | number>(true);
  const [level, set_level] = useState<string>("");
  return (
    <>
      <div className="flex justify-center gap-10 mt-10 ">
        {english_levels.map((item, index) => {
          return (
            <Card
              onPress={() => {
                set_selected_index(index);
                set_level(item);
              }}
              className={`w-[500px] h-[100px] border-0 transition-all ${
                selected_index === index && "border-2"
              }`}
              key={index}
              isPressable
            >
              <CardBody
                className={`overflow-visible p-0 flex items-center justify-center text-3xl font-bold`}
              >
                {item}
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b className="text-xs">
                  Qustion <br /> Complted
                </b>
                <p className="text-default-500">0</p>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      <div className="flex justify-center mt-10">
        <Text_Generetor level={level} />
      </div>
    </>
  );
}
