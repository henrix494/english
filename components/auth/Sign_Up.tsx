"use client";
import { Button } from "@nextui-org/button";
import { Modal, ModalContent, Form, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import React, { FormEvent, useReducer } from "react";
import { toast, Toaster } from "sonner";

export default function Sign_Up({
  what_model,
  closeModel,
}: {
  what_model: boolean;
  closeModel: (set: boolean) => void;
}) {
  type State = {
    email: string;
    username: string;
    password: string;
    repeat_password: string;
  };

  type Action = { type: string; payload: string };

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "SET_EMAIL":
        return { ...state, email: action.payload };
      case "SET_USERNAME":
        return { ...state, username: action.payload };
      case "SET_PASSWORD":
        return { ...state, password: action.payload };
      case "SET_REPEAT_PASSWORD":
        return { ...state, repeat_password: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    email: "",
    username: "",
    password: "",
    repeat_password: "",
  });
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const respone = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: state.email,
          username: state.username,
          password: state.password,
          repeat_password: state.repeat_password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await respone.json();

      switch (json.status) {
        case 400:
          toast.error("User already exists");
          break;
        case 201:
          toast.success("User created successfully");
          await signIn("credentials", {
            username: state.username,
            password: state.password,
          });
          break;
        default:
          toast.error("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal isOpen={what_model} closeButton={<div></div>}>
      <Toaster richColors />
      <ModalContent>
        <Form onSubmit={onSubmit} validationBehavior="native" className="p-2">
          <h2 className="text-center mt-10 text-4xl font-bold">Sign up</h2>
          <Input
            onChange={(e) => {
              dispatch({ type: "SET_EMAIL", payload: e.target.value });
            }}
            type="text"
            label="Email"
            className="block mx-auto mt-10"
          />
          <Input
            isRequired
            onChange={(e) => {
              dispatch({ type: "SET_USERNAME", payload: e.target.value });
            }}
            type="text"
            label="Username"
            className="block mx-auto mt-10"
          />
          <Input
            isRequired
            type="password"
            label="Password"
            name="password"
            className="block mx-auto mt-10"
            onChange={(e) => {
              dispatch({ type: "SET_PASSWORD", payload: e.target.value });
            }}
            validate={(value) => {
              if (value && value.length < 8) {
                return "Password must be at least 8 characters long";
              }
            }}
          />
          <Input
            isRequired
            type="password"
            label="Repeat password"
            name="repassword"
            className="block mx-auto mt-10"
            onChange={(e) => {
              dispatch({
                type: "SET_REPEAT_PASSWORD",
                payload: e.target.value,
              });
            }}
            validate={(value) => {
              if (value !== state.password) {
                return "Passwords do not match";
              }
            }}
          />
          <div className="flex justify-center w-full">
            <Button type="submit" color="success" className=" mx-auto mt-10">
              Sign up
            </Button>
            <Button
              className=" mx-auto mt-10 mb-2"
              color="danger"
              onPress={() => {
                closeModel(false);
              }}
            >
              Close
            </Button>
          </div>
        </Form>
      </ModalContent>
    </Modal>
  );
}
