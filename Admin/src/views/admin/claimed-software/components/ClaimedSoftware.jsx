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
import ReactStars from "react-rating-stars-component";
import { useState } from "react";
import { submitResponse } from "redux/Actions/CustomerMessages";
import { getAllClaimedSoftwares } from "redux/Actions/ClaimedSoftwareActions";

import { MdStar, MdStarHalf, MdStarOutline } from "react-icons/md";
import { baseURL } from "constants/baseURL";
import { AlertPopUp } from "components/modals/Alert";
import { CreateCheckoutForNewSubscription } from "redux/Actions/ClaimedSoftwareActions";

let headers = [
  "User Name",
  "Email",
  "Phone Number",
  "Software Name",
  "Subscription Priod",
  "Action",
];

const ColumnsTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [alertIsOpen, setAlertOpen] = useState(false);
  const [yourMessage, setYourMessage] = useState({});

  const loading = useSelector((state) => state.ProgressBarReducer);

  const { claimedSoftwares } = useSelector(
    (state) => state.claimedSoftwareReducer
  );

  useEffect(() => {
    dispatch(getAllClaimedSoftwares());
  }, []);

  const handleDelete = async (value) => {
    let ids = [];
    ids.push(value);
    dispatch(deleteContactMail(ids, navigate, alert));
  };

  const handleReply = async (id) => {
    const singleUserMessage = claimedSoftwares.filter(
      (message) => message._id === id
    );
    setYourMessage(singleUserMessage.length > 0 ? singleUserMessage[0] : {});
    onOpen();
  };

  const handleSubmit = async () => {
    dispatch(
      CreateCheckoutForNewSubscription(
        yourMessage?._id,
        navigate,
        alert,
        onClose()
      )
    );
    handleAlertPopUP();
  };

  const handleAlertPopUP = (e) => {
    setAlertOpen(!alertIsOpen);
  };

  return (
    <>
      {!loading ? (
        <>
          {console.log(yourMessage, "claimedSoftwares")}
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
                    User Information Management for Claimed Software
                  </h1>
                  <form className="">
                    <div class="relative overflow-x-auto">
                      <h2 className="my-2">User Information</h2>
                      <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                        <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" class="px-6 py-3">
                              Username
                            </th>
                            <th scope="col" class="px-6 py-3">
                              Email
                            </th>
                            <th scope="col" class="px-6 py-3">
                              Phone Number
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                            <th
                              scope="row"
                              class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                            >
                              {yourMessage?.userId?.fullName}
                            </th>
                            <td class="px-6 py-4">
                              {yourMessage?.userId?.email}
                            </td>
                            <td class="px-6 py-4">
                              {yourMessage?.phoneNumber}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <h2 className="my-2">Software Information</h2>
                      <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                        <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" class="px-6 py-3">
                              Software Image
                            </th>
                            <th scope="col" class="px-6 py-3">
                              Software Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                              Rating
                            </th>
                            <th scope="col" class="px-6 py-3">
                              Subscription Period
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                            <th
                              scope="row"
                              class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                            >
                              <img
                                alt="no-img"
                                src={
                                  baseURL +
                                  yourMessage?.softwareId?.softwareLogo
                                }
                                className="h-10 w-10 rounded-full"
                              />
                            </th>
                            <th
                              scope="row"
                              class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                            >
                              {yourMessage?.softwareId?.softwareName}
                            </th>
                            <td class="px-6 py-4">
                              <ReactStars
                                count={5}
                                isHalf={true}
                                edit={false}
                                value={yourMessage?.softwareId?.averageRating}
                                emptyIcon={
                                  <MdStarOutline className="h-6 w-6" />
                                }
                                halfIcon={<MdStarHalf className="h-6 w-6" />}
                                fullIcon={<MdStar className="h-6 w-6" />}
                                size={24}
                                activeColor="#ffd700"
                              />
                            </td>
                            <td class="px-6 py-4">{yourMessage?.timePeriod}</td>
                          </tr>
                        </tbody>
                      </table>
                      <h2 className="my-2">Proof Document</h2>
                      <a
                        className="font-normal text-blue-500"
                        target="_black"
                        href={
                          yourMessage?.image !== ""
                            ? baseURL + yourMessage?.image
                            : baseURL + yourMessage?.document?.path
                        }
                      >
                        Click to Check Proof
                      </a>
                    </div>
                    <div className="mt-1 flex w-full flex-wrap items-center gap-1"></div>
                    <div className="mt-3 flex justify-end gap-2">
                      <button
                        onClick={onClose}
                        type="submit"
                        className="linear rounded-xl border-2 border-red-500 px-5 py-3 text-base font-medium text-red-500 transition duration-200 hover:bg-red-600/5 active:bg-red-700/5 dark:border-red-400 dark:bg-red-400/10 dark:text-white dark:hover:bg-red-300/10 dark:active:bg-red-200/10"
                      >
                        Decline
                      </button>
                      <button
                        onClick={handleAlertPopUP}
                        type="button"
                        className="linear rounded-xl border-2 border-gray-400 px-5 py-3 text-base font-medium text-gray-400 transition duration-200 hover:bg-gray-400/5 active:bg-gray-400/10 dark:border-gray-600 dark:bg-gray-600/10 dark:text-white dark:hover:bg-gray-600/20 dark:active:bg-gray-600/30"
                      >
                        Approve
                      </button>
                    </div>
                  </form>
                </Card>
              </ModalBody>
            </ModalContent>
          </Modal>
          <AlertPopUp
            alertIsOpen={alertIsOpen}
            alertTitle="Are you sure you want to Approve this request ?"
            handleClose={handleAlertPopUP}
            handleSubmit={handleSubmit}
          />
          <div className="mt-5 grid grid-cols-1 gap-5">
            <Card extra={"w-full h-full p-4 sm:overflow-x-auto"}>
              <div class="relative flex items-center justify-between">
                <div class="text-xl font-bold text-navy-700 dark:text-white">
                  Claimed Softwares
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
                      {claimedSoftwares?.length > 0 ? (
                        <>
                          {claimedSoftwares?.map((software) => (
                            <>
                              {!software?.claimed ? (
                                <tr
                                  key={software?._id}
                                  class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                                >
                                  <>
                                    <th
                                      scope="row"
                                      class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                                    >
                                      {software?.userId?.fullName}
                                    </th>
                                    <td class="px-6 py-4">
                                      {software?.userId?.email}
                                    </td>
                                    <td class="px-6 py-4">
                                      {software?.phoneNumber}
                                    </td>
                                    <td class="px-6 py-4">
                                      {software?.softwareId?.softwareName}
                                    </td>
                                    <td class="px-6 py-4">
                                      {software?.timePeriod === "30"
                                        ? "Monthly"
                                        : "Yearly"}
                                    </td>
                                    <td class="px-6 py-4">
                                      <CardMenu
                                        reply={false}
                                        approved={true}
                                        handleDeleteMessage={handleDelete}
                                        handleReplyMessage={handleReply}
                                        id={software?._id}
                                      />
                                    </td>
                                  </>
                                </tr>
                              ) : null}
                            </>
                          ))}
                        </>
                      ) : (
                        <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <>
                            <td class="px-6 py-4">No Claimed Software Found</td>
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
