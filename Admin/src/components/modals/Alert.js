import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/hooks";
import { MdClose } from "react-icons/md";
import Card from "components/card";

export const AlertPopUp = ({
  alertTitle,
  alertIsOpen,
  handleClose,
  handleSubmit,
}) => {
  const handleCloseAlert = () => {
    handleClose();
  };

  const handleApprove = () => {
    handleSubmit();
  };
  return (
    <Modal isOpen={alertIsOpen} onClose={!alertIsOpen} className="!z-[1010]">
      <ModalOverlay className="bg-[#000] !opacity-30" />
      <ModalContent className="!z-[1002] !m-auto !w-max min-w-[750px] !max-w-[100%] md:top-[12vh]">
        <ModalBody>
          <Card extra="px-[30px] pt-[35px] pb-[40px] max-w-[750px] flex flex-col !z-[1004]">
            <div
              onClick={handleCloseAlert}
              className="flex cursor-pointer justify-end"
            >
              <MdClose className="h-6 w-6" />
            </div>
            <h1 className="mb-[20px] text-center text-2xl font-bold">
              {alertTitle}
            </h1>
            <div className="flex justify-center gap-2">
              <button
                onClick={handleCloseAlert}
                className="linear rounded-xl border-2 border-red-500 px-5 py-3 text-base font-medium text-red-500 transition duration-200 hover:bg-red-600/5 active:bg-red-700/5 dark:border-red-400 dark:bg-red-400/10 dark:text-white dark:hover:bg-red-300/10 dark:active:bg-red-200/10"
              >
                No
              </button>
              <button
                onClick={handleApprove}
                className="linear rounded-xl border-2 border-gray-400 px-5 py-3 text-base font-medium text-gray-400 transition duration-200 hover:bg-gray-400/5 active:bg-gray-400/10 dark:border-gray-600 dark:bg-gray-600/10 dark:text-white dark:hover:bg-gray-600/20 dark:active:bg-gray-600/30"
              >
                Yes
              </button>
            </div>
          </Card>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
