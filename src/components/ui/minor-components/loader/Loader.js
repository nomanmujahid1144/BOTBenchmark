import Loading from "../../../../assets/gif/loader.gif";
export const Loader = () => {
  return (
    <div className="top-0 right-0 left-0 vh-100 bottom-0 d-flex align-items-center justify-content-center" style={{ background: 'rgba(255, 248, 220, 0.3)' }}>
      <img className="z-index-50 mx-auto" style={{width : '30%'}} src={Loading} alt="Loading..." />
  </div>
  );
};
