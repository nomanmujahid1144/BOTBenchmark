import Loading from "../../assets/gif/loading.gif";
export const Loader = () => {
  return (
    <div className="bg-loaderBg/60 absolute top-0 right-0 left-0 bottom-0 z-40 flex h-screen w-screen items-center justify-center">
      <img className="z-50 mx-auto w-72" src={Loading} alt="Loading..." />
    </div>
  );
};
