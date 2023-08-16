import Card from "components/card";
import {
  MdClose,
  MdDelete,
  MdEdit,
  MdEmail,
  MdLink,
  MdPhone,
} from "react-icons/md";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/hooks";
import { IoMdEye } from "react-icons/io";

const NftCard = ({
  softwareId,
  softwareLogo,
  softwareName,
  softwareCategory,
  softwareSubCategory,
  websiteLink,
  websiteEmail,
  websiteContact,
  deleteSubCategory,
  editSubCategory,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteCatey = async () => {
    deleteSubCategory(softwareId);
  };
  const editCatey = async () => {
    editSubCategory(softwareId);
  };

  return (
    <Card extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white`}>
      <div className="flex justify-start gap-4 rounded-xl p-4 dark:bg-gray-800">
        <div className="relative w-full">
          <img
            src={softwareLogo}
            alt={`${softwareName} Logo`}
            className="h-32 w-32 rounded-xl "
          />
        </div>
        <div className="flex flex-col justify-between">
          <div className="my-2 flex items-start justify-between text-gray-700 dark:text-white md:m-0">
            <p className="text-xl leading-5">{softwareName}</p>
          </div>
          <div className="my-2 flex items-start gap-3 md:m-0">
            {websiteLink ? (
              <div className="relative">
                <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                  <span className="flex items-center text-brand-500 dark:text-white">
                    <a
                      href={
                        websiteLink.includes("://")
                          ? websiteLink
                          : `http://${websiteLink}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block"
                    >
                      <MdLink className="h-5 w-5" />
                    </a>
                  </span>
                </div>
              </div>
            ) : null}
            {websiteEmail ? (
              <div className="relative">
                <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                  <span className="flex items-center text-brand-500 dark:text-white">
                    <a
                      href={`mailto:${websiteEmail}`}
                      className="relative block"
                    >
                      <MdEmail className="h-5 w-5" />
                    </a>
                  </span>
                </div>
              </div>
            ) : null}
            {websiteContact ? (
              <div className="relative">
                <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                  <span className="flex items-center text-brand-500 dark:text-white">
                    <a
                      href={`tel:${websiteContact}`}
                      className="relative block"
                    >
                      <MdPhone className="h-5 w-5" />
                    </a>
                  </span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div
          className="flex w-full flex-col-reverse justify-end gap-2"
          style={{ alignItems: "self-end" }}
        >
          <div className="cursor-pointer rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
            <span className="flex items-center text-brand-500 dark:text-white">
              <a href="/" className="relative block">
                <IoMdEye className="h-5 w-5" />
              </a>
            </span>
          </div>
          <div className="cursor-pointer rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
            <span
              onClick={onOpen}
              className="flex items-center text-red-500 dark:text-white"
            >
              <MdDelete className="h-5 w-5" />
            </span>
          </div>
          <div className="cursor-pointer rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
            <span
              onClick={editCatey}
              className="flex items-center text-brand-500 dark:text-white"
            >
              <MdEdit className="h-5 w-5" />
            </span>
          </div>
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
                Delete Software
              </h1>
              <p className="mb-4 text-start">
                Do you want to delete this Software?
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
