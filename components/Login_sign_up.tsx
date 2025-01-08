"use client";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import Sign_Up from "./auth/Sign_Up";
import Log_In from "./auth/Log_In";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
export default function Login_sign_up() {
  const { data: session } = useSession();
  console.log(session?.token.sub);
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
        <Button
          className="lg:absolute lg:left-5 font-bold"
          onPress={() => signOut()}
        >
          Log out
        </Button>
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
