import Card from "components/card";
import { MdDelete, MdEdit } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/hooks";

const Widget = ({ categoryId, icon, title, deleteCategory, editCategory }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteCatey = async () => {
    deleteCategory(categoryId);
  };
  const editCatey = async () => {
    editCategory(categoryId);
  };

  return (
    <Card extra="!flex-row flex-grow items-center rounded-[20px] justify-between">
      <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center ">
        <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
          <span className="flex items-center text-brand-500 dark:text-white">
            <svg
              className={`block h-5 w-5 cursor-pointer rounded-[50%] text-brand-500`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24" // Replace with the appropriate viewBox for your SVG
            >
              <image
                xlinkHref={icon}
                height="100%"
                width="100%"
                preserveAspectRatio="xMidYMid slice"
              />
            </svg>
          </span>
        </div>
        <div className="h-50 ml-4 flex w-auto flex-col justify-center">
          <p className="font-dm text-lg font-medium text-gray-600">{title}</p>
        </div>
      </div>
      <div className="mr-[18px] grid grid-cols-1 gap-3 divide-y">
        <div
          onClick={editCatey}
          className="rounded-full bg-lightPrimary p-2 dark:bg-navy-700"
        >
          <span className="flex items-center text-brand-500 dark:text-white">
            <MdEdit className="h-5 w-5" />
          </span>
        </div>
        <div className="rounded-full bg-lightPrimary p-2 dark:bg-navy-700">
          <span
            onClick={onOpen}
            className="flex items-center text-red-500 dark:text-white"
          >
            <MdDelete className="h-5 w-5" />
          </span>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose} className="!z-[1010]">
        <ModalOverlay className="bg-[#000] !opacity-30" />
        <ModalContent className="!z-[1002] !m-auto !w-max min-w-[350px] !max-w-[85%] md:top-[12vh]">
          <ModalBody>
            <Card extra="px-[30px] pt-[35px] pb-[40px] max-w-[450px] flex flex-col !z-[1004]">
              <div
                onClick={onClose}
                className="flex cursor-pointer justify-end"
              >
                <MdClose className="h-6 w-6" />
              </div>
              <h1 className="mb-[10px] text-start text-2xl font-bold">
                Delete Category
              </h1>
              <p className="mb-4 text-start">
                Do you want to delete this Category?
              </p>
              <div className="flex justify-center gap-2">
                <button
                  onClick={deleteCatey}
                  className="linear rounded-xl border-2 border-red-500 px-5 py-3 text-base font-medium text-red-500 transition duration-200 hover:bg-red-600/5 active:bg-red-700/5 dark:border-red-400 dark:bg-red-400/10 dark:text-white dark:hover:bg-red-300/10 dark:active:bg-red-200/10"
                >
                  Yes
                </button>
                <button
                  onClick={onClose}
                  className="linear rounded-xl border-2 border-gray-400 px-5 py-3 text-base font-medium text-gray-400 transition duration-200 hover:bg-gray-400/5 active:bg-gray-400/10 dark:border-gray-600 dark:bg-gray-600/10 dark:text-white dark:hover:bg-gray-600/20 dark:active:bg-gray-600/30"
                >
                  No
                </button>
              </div>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default Widget;
