import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

export default function CustomModal({
  isOpen,
  onOpenChange,
  header,
  children,
  size = "xl",
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  header: string;
  children: React.ReactNode;
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full";
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });
  return (
    <div className="relative">
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size={size}
        placement="top-center"
        backdrop="blur"
        hideCloseButton={true}
        motionProps={{
          initial: { opacity: 0, y: -20, scale: 0.9 },
          animate: { opacity: 1, y: 0, scale: 1 },
        }}
        classNames={{
          backdrop: "bg-black bg-opacity-60",
        }}
        className={`bg-white text-primary rounded-lg shadow-lg mt-4 sm:mt-14 border border-primary shadow-slate-500`}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-between gap-1 border-b p-3 ps-5 font-semibold shadow-sm bg-primary sm:bg-white text-white sm:text-primary rounded-t-sm">
                {header}
                <FaTimes onClick={onClose} className="cursor-pointer mr-3" />
              </ModalHeader>
              <ModalBody className="p-4 max-h-[80vh] sm:max-h-[85vh]">
                {children}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
