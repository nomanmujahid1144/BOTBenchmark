import Card from "components/card";
import { MdDelete, MdEdit } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/hooks";

const NftCard = ({
  category,
  subcategory,
  subcategorylist,
  subcategoryId,
  deleteSubCategory,
  editSubCategory,
  extra,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteCatey = async () => {
    deleteSubCategory(subcategoryId);
  };
  const editCatey = async () => {
    editSubCategory(subcategoryId);
  };

  return (
    <Card
      extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
    >
      <div className="h-full w-full">
        <div className="flex w-full justify-between">
          <p className="text-lg font-bold text-navy-700 dark:text-white">
            {category}
          </p>
          <div className="flex gap-3">
            <div
              onClick={onOpen}
              className="flex h-full w-full items-center justify-center rounded-full bg-lightPrimary p-2 text-xl text-red-500 hover:bg-gray-50 dark:bg-navy-700 dark:text-navy-900"
            >
              <MdDelete className="h-5 w-5" />
            </div>
            <div
              onClick={editCatey}
              className="flex h-full w-full items-center justify-center rounded-full bg-lightPrimary p-2 text-xl text-brand-500 hover:bg-gray-50 dark:bg-navy-700 dark:text-navy-900"
            >
              <MdEdit className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <div className="mb-2">
            <p className="text-lg font-bold text-navy-700 dark:text-white">
              {subcategory}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {subcategorylist.map((subcategory) => (
            <div className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90">
              {subcategory}
            </div>
          ))}
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
                Delete Sub Category
              </h1>
              <p className="mb-4 text-start">
                Do you want to delete this Sub Category?
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

export default NftCard;
