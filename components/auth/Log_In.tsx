"use client";

import { Button } from "@nextui-org/button";
import { Modal, ModalContent, Input, Form } from "@nextui-org/react";
import React from "react";
import { signIn } from "next-auth/react";

export default function Log_In({
  what_model,
  closeLoginModel,
}: {
  what_model: boolean;
  closeLoginModel: (set: boolean) => void;
}) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formObject: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      formObject[key] = value.toString();
    });
    console.log(formObject);
    signIn("credentials", formObject);
  };

  return (
    <Modal isOpen={what_model} closeButton={<div></div>}>
      <Form onSubmit={handleSubmit}>
        <ModalContent>
          <h2 className="text-center mt-20 text-4xl font-bold">Log in</h2>
          <Input
            type="text"
            label="Username"
            name="username"
            className="block mx-auto mt-10"
            id="username"
          />
          <Input
            type="password"
            label="Password"
            name="password"
            className="block mx-auto mt-10"
            id="password"
          />
          <div className="flex flex-col items-center gap-5 mt-10 mb-2">
            <Button type="submit" color="success">
              Log in
            </Button>
            <Button
              color="danger"
              onPress={() => {
                closeLoginModel(false);
              }}
            >
              Close
            </Button>
          </div>
        </ModalContent>
      </Form>
    </Modal>
  );
}
