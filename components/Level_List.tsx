"use client";
import React, { useEffect, useState } from "react";
import { english_levels } from "@/constants";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Text_Generetor from "./Text_Generetor";

export default function Level_List() {
  const params = usePathname();

  const { data: session } = useSession();
  const [testData, setData] = useState<any[]>([]);
  const [level, set_level] = useState<{
    level: string;
    selected_index: number;
  }>();
  return (
    <>
      <div className="flex justify-center gap-10 mt-10 flex-wrap">
        {english_levels.map((item, index) => {
          const completedCount = getCompletedTests(item); // Get completed tests for the current level
          return (
            <Card
              onPress={() => {
                set_level({ level: item, selected_index: index });
              }}
              className={`w-[250px] h-[100px] border-0 transition-all ${
                level?.selected_index === index && "border-2"
              }`}
              key={index}
              isPressable
            >
              <CardBody className="overflow-visible p-0 flex items-center justify-center text-3xl font-bold">
                {item}
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b className="text-xs">
                  Question <br /> Completed
                </b>
                <p className="text-default-500">0</p>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      <div className="flex justify-center mt-10">
        {params === "/text_to_speach" ? (
          <SpeachGeneretor />
        ) : (
          <Text_Generetor level={level?.level as string} />
        )}
      </div>
    </>
  );
}
