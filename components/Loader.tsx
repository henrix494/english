import { Card, Skeleton } from "@heroui/react";
import React from "react";

export default function Loader() {
  return (
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
  );
}
