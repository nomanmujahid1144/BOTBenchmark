import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useEffect } from "react";
import { Loader } from "components/loader/Loader";
import { axiosInstance } from "constants/axiosInstance";
import { getCustomersMessages } from "redux/Actions/CustomerMessages";
import { MdClose } from "react-icons/md";
import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/hooks";
import Card from "components/card";
import CardMenu from "components/card/CardMenu";
import { deleteContactMail } from "redux/Actions/CustomerMessages";
import InputField from "components/fields/TextField";
import { useState } from "react";
import { submitResponse } from "redux/Actions/CustomerMessages";

let headers = ["User Name", "Email", "Phone Number", "Message", "Action"];

const ColumnsTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [replyMessage, setReplyMessage] = useState([]);
  const [yourMessage, setYourMessage] = useState({
    yourmessage: "",
  });
  const loading = useSelector((state) => state.ProgressBarReducer);

  const { messages } = useSelector((state) => state.customerMessagesReducer);

  useEffect(() => {
    dispatch(getCustomersMessages());
  }, []);

  const handleDelete = async (value) => {
    console.log(value, "ID");
    let ids = [];
    ids.push(value);
    dispatch(deleteContactMail(ids, navigate, alert));
  };

  const handleReply = async (id) => {
    console.log(id, "ID");
    setYourMessage({
      yourmessage: "",
    });
    const singleUserMessage = messages.filter((message) => message._id === id);
    setReplyMessage(singleUserMessage.length > 0 ? singleUserMessage[0] : []);
    onOpen();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { yourmessage } = yourMessage;
    console.log(replyMessage.emailId);
    console.log(replyMessage.message);
    console.log(yourmessage);
    const id = replyMessage?._id;
    const message = yourmessage;
    dispatch(submitResponse(message, id, onClose, navigate, alert));
  };

  const handleOnChange = (e) => {
    setYourMessage({ ...yourMessage, [e.target.name]: e.target.value });
  };

  return (
    <>
      {!loading ? (
        <>
          {/* <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-3">
            {messages.map((software, index) => (
              <div>{index}</div>
            ))}
          </div> */}

          <Modal isOpen={isOpen} onClose={onClose} className="!z-[1010]">
            <ModalOverlay className="bg-[#000] !opacity-30" />
            <ModalContent className="!z-[1002] !m-auto !w-max min-w-[750px] !max-w-[100%] md:top-[12vh]">
              <ModalBody>
                <Card extra="px-[30px] pt-[35px] pb-[40px] max-w-[750px] flex flex-col !z-[1004]">
                  <div
                    onClick={onClose}
                    className="flex cursor-pointer justify-end"
                  >
                    <MdClose className="h-6 w-6" />
                  </div>
                  <h1 className="mb-[20px] text-center text-2xl font-bold">
                    Reply to {replyMessage?.fullName}
                    {/* {isNewProduct
                        ? "Add Sub Category"
                        : "Update Sub Category"} */}
                  </h1>
                  <form onSubmit={handleSubmit}>
                    <InputField
                      variant="auth"
                      extra="mb-3 mt-5"
                      label="Client Message*"
                      placeholder="Client Message"
                      disabled={true}
                      id="message"
                      rows={7}
                      type="text"
                      value={replyMessage?.message}
                    />
                    <InputField
                      variant="auth"
                      extra="mb-3 mt-5"
                      label="Your Response*"
                      placeholder="Please Type your Response..."
                      id="yourmessage"
                      rows={7}
                      type="text"
                      value={yourMessage?.yourmessage}
                      onChange={handleOnChange}
                    />
                    <div className="mt-1 flex w-full flex-wrap items-center gap-1"></div>
                    <div className="mt-3 flex justify-end gap-2">
                      <button
                        type="submit"
                        className="linear rounded-xl border-2 border-red-500 px-5 py-3 text-base font-medium text-red-500 transition duration-200 hover:bg-red-600/5 active:bg-red-700/5 dark:border-red-400 dark:bg-red-400/10 dark:text-white dark:hover:bg-red-300/10 dark:active:bg-red-200/10"
                      >
                        Send Respond
                      </button>
                    </div>
                  </form>
                </Card>
              </ModalBody>
            </ModalContent>
          </Modal>
          <div className="mt-5 grid grid-cols-1 gap-5">
            <Card extra={"w-full h-full p-4 sm:overflow-x-auto"}>
              <div class="relative flex items-center justify-between">
                <div class="text-xl font-bold text-navy-700 dark:text-white">
                  Contact Mail Messages
                </div>
              </div>

              <div class="mt-8 h-full overflow-x-scroll xl:overflow-hidden">
                <div class="relative overflow-x-auto">
                  <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                    <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        {headers.map((header, index) => (
                          <th
                            key={header + index}
                            scope="col"
                            class="px-6 py-3"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {messages?.length > 0 ? (
                        <>
                          {messages?.map((message) => (
                            <tr
                              key={message?._id}
                              class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                              <>
                                <th
                                  scope="row"
                                  class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                                >
                                  {message?.fullName}
                                </th>
                                <td class="px-6 py-4">{message?.emailId}</td>
                                <td class="px-6 py-4">
                                  {message?.phoneNumber}
                                </td>
                                <td class="px-6 py-4">
                                  {message?.message?.length > 200
                                    ? message?.message?.slice(0, 200) + "..."
                                    : message?.message}
                                </td>
                                <td class="px-6 py-4">
                                  <CardMenu
                                    handleDeleteMessage={handleDelete}
                                    handleReplyMessage={handleReply}
                                    id={message?._id}
                                  />
                                </td>
                              </>
                            </tr>
                          ))}
                        </>
                      ) : (
                        <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <>
                            <td class="px-6 py-4">No Message Found</td>
                          </>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ColumnsTable;
