import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getCustomersMessages } from "redux/Actions/CustomerMessages";

let headers = ["User Name", "Email", "Phone Number", "Message"];

const ComplexTable = (props) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { messages } = useSelector((state) => state.customerMessagesReducer);

  useEffect(() => {
    dispatch(getCustomersMessages(alert));
  }, []);

  return (
    <Card extra={"w-full h-full p-4 sm:overflow-x-auto"}>
      <div class="relative flex items-center justify-between">
        <div class="text-xl font-bold text-navy-700 dark:text-white">
          Contact Mail Messages
        </div>
        <CardMenu />
      </div>

      <div class="mt-8 h-full overflow-x-scroll xl:overflow-hidden">
        <table className="w-full">
          <thead>
            <tr key={3}>
              {headers.map((header, index) => (
                <th
                  key={1 + index}
                  className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
                >
                  <p className="text-xs tracking-wide text-gray-600">
                    {header}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="">
              {messages?.map((message) => (
                <>
                  <td>
                    <p className="pt-3 text-sm font-bold text-navy-700 dark:text-white">
                      {message.fullName}
                    </p>
                  </td>
                  <td>
                    <p className="pt-3 text-sm font-bold text-navy-700 dark:text-white">
                      {message.email}
                    </p>
                  </td>
                  <td>
                    <p className="pt-3 text-sm font-bold text-navy-700 dark:text-white">
                      {message.phoneNumber}
                    </p>
                  </td>
                  <td>
                    <p className="pt-3 text-sm font-bold text-navy-700 dark:text-white">
                      {message.message}
                    </p>
                  </td>
                </>
              ))}

              {/* <div className="flex items-center gap-2">
                <div className={`rounded-full text-xl`}>
                  <MdOutlineError className="text-orange-500" />
                </div>
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                  ALi
                </p>
              </div>
              <p className="text-sm font-bold text-navy-700 dark:text-white">
                Haider
              </p>
              <Progress width="w-[68px]" value={56} />;
              <td className="pt-[14px] pb-[18px] sm:text-[14px]" key={3}>
                Salman
              </td> */}
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ComplexTable;
