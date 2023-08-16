import ColumnsTable from "./components/Message";

const Message = () => {
  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5">
        <ColumnsTable />
      </div>
    </div>
  );
};

export default Message;
