"use client";
import React, { useEffect, useState } from "react";
import { english_levels } from "@/constants";
import { Card, CardBody, CardFooter } from "@heroui/react";
import Text_Generetor from "./Text_Generetor";
import getCount from "@/actions/getCount";
import { useSession } from "next-auth/react";

export default function Level_List() {
  const [level, set_level] = useState<{
    level: string;
    selected_index: number;
  }>();
  const [counts, setCounts] = useState<{ [key: string]: number }>({});

  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        const data = await getCount({ userId: session.token.sub });
        data.forEach((data) => {
          console.log(data.level);
        });
      };
      fetchData();
    }
  }, [session]);
  return (
    <>
      <div className="flex justify-center gap-10 mt-10 flex-wrap">
        {english_levels.map((item, index) => {
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
              <CardBody
                className={`overflow-visible p-0 flex items-center justify-center text-3xl font-bold`}
              >
                {item}
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b className="text-xs">
                  Qustion <br /> Complted
                </b>
                <p className="text-default-500">{counts[item] || 0}</p>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      <div className="flex justify-center mt-10">
        <Text_Generetor level={level?.level as string} />
      </div>
    </>
  );
}
