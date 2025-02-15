"use client";
import { Button } from "@heroui/react";
import React, { useState } from "react";
import Sign_Up from "./auth/Sign_Up";
import Log_In from "./auth/Log_In";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
export default function Login_sign_up() {
  const { data: session } = useSession();

  const [what_model, setWhat_model] = useState({
    login: false,
    sign_up: false,
  });
  const closeModel = (set: boolean) => {
    setWhat_model({ login: false, sign_up: set });
  };
  const closeLoginModel = (set: boolean) => {
    setWhat_model({ login: set, sign_up: false });
  };
  const goToUserInfo = () => {
    router.push("profile");
  };
  return (
    <div>
      {!session ? (
        <div className="max-lg:flex justify-around mt-10">
          <Button
            onPress={() => {
              setWhat_model({ login: true, sign_up: false });
            }}
            color="success"
            className=" lg:absolute lg:left-5 font-bold"
          >
            Log in
          </Button>
          <Button
            onPress={() => {
              setWhat_model({ login: false, sign_up: true });
            }}
            color="success"
            className=" lg:absolute lg:left-40 font-bold"
          >
            Fast sign up to save data
          </Button>
        </div>
      ) : (
        <div>
          <Button
            className="lg:absolute lg:left-5 font-bold"
            onPress={() => signOut()}
          >
            Log out
          </Button>
          <Button onPress={goToUserInfo} className="font-bold ml-6">
            User Info
          </Button>
        </div>
      )}

      {what_model.login ? (
        <Log_In
          what_model={what_model.login}
          closeLoginModel={closeLoginModel}
        />
      ) : null}
      {what_model.sign_up ? (
        <Sign_Up what_model={what_model.sign_up} closeModel={closeModel} />
      ) : null}
    </div>
  );
}
