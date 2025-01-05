"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Progress,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { addAnswer } from "@/actions/addAnswer";
export function ModelFinish({
  model_handler,
  changeCloseModel,
  radio_choice,
  level
}: {
  model_handler: boolean;
  changeCloseModel: () => void;
  radio_choice: { index: number; isOK: boolean }[];
  level:string
}) {
  const { data: session } = useSession()

  const { onOpenChange } = useDisclosure();
  const [value, setValue] = useState(0);
  let totalOk = radio_choice.filter((item) => item.isOK === true).length;
  useEffect(() => {
    setValue((totalOk / radio_choice.length) * 100);
    if(model_handler && session?.user){
      addAnswer({grade:value,level:level,user_id:session.user.id})
    }
  }, [radio_choice,model_handler]);

  return (
    <>
      <Modal
        closeButton={<div></div>}
        isOpen={model_handler}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center">
                Score
              </ModalHeader>
              <ModalBody>
                <p className="text-center   inline self-center  text-white font-bold text-2xl ">
                  You got {totalOk}/{radio_choice.length} Right
                </p>

                <Progress
                  aria-label="Downloading..."
                  className="max-w-md"
                  color="success"
                  showValueLabel={true}
                  size="md"
                  translate="yes"
                  value={value}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={changeCloseModel}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
