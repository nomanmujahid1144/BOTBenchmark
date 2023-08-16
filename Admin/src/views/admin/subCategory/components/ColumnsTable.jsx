import upload from "../../../../assets/svg/upload.svg";
import Card from "components/card";
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import Widget from "components/widget/WidgetSVG";
import { MdClose } from "react-icons/md";
import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/hooks";
import InputField from "components/fields/InputField";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} from "redux/Actions/CategoryActions";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useEffect } from "react";
import { baseURL } from "constants/baseURL";

const ColumnsTable = (props) => {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [category, setCategoryName] = useState({
    categoryName: "",
  });
  const [filePreview, setFilePreview] = useState(null);
  const [editPreview, setEditPreview] = useState("");
  const [fileSVG, setFileSVG] = useState(null);
  const [imgCheck, setImgCheck] = useState(false);
  const [isModelOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryName = category.categoryName;
    var formData = new FormData();

    if (fileSVG) {
      formData.append("categoryImage", fileSVG);
    }

    if (isNewProduct) {
      dispatch(
        addCategory(
          categoryName,
          formData,
          navigate,
          alert,
          isModelOpen,
          setIsOpen
        )
      );
    } else {
      dispatch(
        updateCategory(
          categoryName,
          global.editId,
          formData,
          navigate,
          alert,
          isModelOpen,
          setIsOpen
        )
      );
    }
  };

  const onChange = (e) => {
    setCategoryName({ ...category, [e.target.name]: e.target.value });
  };

  const { categories } = useSelector((state) => state.categoryReducer);

  useEffect(() => {
    dispatch(getCategories());
    setCategoryName({
      categoryName: "",
    });
    setFilePreview(null);
    setFileSVG(null);
    setImgCheck(false);
  }, [isModelOpen]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { initialState } = tableInstance;
  initialState.pageSize = 5;

  const categoryDelete = async (id) => {
    let ids = [];
    ids.push(id);
    dispatch(deleteCategory(ids, navigate, alert, isModelOpen, setIsOpen));
  };

  const addNewCategory = async () => {
    onOpen();
    setIsNewProduct(true);
    setEditPreview("");
    setCategoryName({
      categoryName: "",
    });
    setFilePreview(null);
    setFileSVG(null);
    setImgCheck(false);
  };

  const editCategory = async (id) => {
    setIsNewProduct(false);
    const category = categories.filter((category) => category._id === id);
    setCategoryName({
      categoryName: category[0].categoryName,
    });
    setEditPreview(`${baseURL + category[0].categoryImage}`);
    global.editId = category[0]._id;
    onOpen();
  };
  return (
    <>
      <Card extra={"w-full pb-5 p-4 h-full"}>
        <header className="relative flex items-center justify-between">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            Categories
          </div>
          <button
            onClick={addNewCategory}
            className="rounded-xl bg-brand-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            Add Category
          </button>
        </header>
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
                <h1 className="mb-[20px] text-center text-2xl font-bold">
                  {isNewProduct ? "Add Category" : "Update Category"}
                </h1>
                <form onSubmit={handleSubmit}>
                  <div className=" mx-auto justify-center md:mr-2 md:mb-0 md:w-full">
                    <label
                      htmlFor="upload"
                      className={`mx-auto mb-2 block h-[120px] w-[120px] cursor-pointer rounded-[50%] ${
                        filePreview || editPreview ? "border-2" : "border-0"
                      }`}
                    >
                      <svg
                        className={`${
                          filePreview || editPreview
                            ? "relative left-[19%] top-[26%] h-[4rem] w-[5rem]"
                            : "h-full w-full"
                        } mb-2 block cursor-pointer rounded-[50%]`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24" // Replace with the appropriate viewBox for your SVG
                      >
                        {!imgCheck && !editPreview && !isNewProduct ? (
                          <image
                            xlinkHref={upload}
                            height="100%"
                            width="100%"
                            preserveAspectRatio="xMidYMid slice"
                          /> // Replace with the appropriate SVG content or use xlink:href for external SVG file
                        ) : (
                          <image
                            xlinkHref={
                              filePreview
                                ? filePreview
                                : editPreview
                                ? editPreview
                                : upload
                            }
                            height="90%"
                            width="90%"
                            preserveAspectRatio="xMidYMid slice"
                          />
                        )}
                      </svg>
                      <input
                        className="hidden"
                        id="upload"
                        name="image"
                        type="file"
                        accept="image/svg+xml" // Specify the accepted file type as SVG
                        onChange={(event) => {
                          setFileSVG(event.currentTarget.files[0]);
                          setFilePreview(
                            URL.createObjectURL(event.target.files[0])
                          );
                          setImgCheck(true);
                        }}
                      />
                    </label>
                    <label
                      className="ml-1.5 flex justify-center text-sm font-medium text-navy-700 dark:text-white"
                      name="productPhoto"
                    >
                      Upload Category SVG* <br />
                      (Click to Upload SVG)
                    </label>
                  </div>
                  <div className="text-center">
                    <label className="ml-1.5 text-sm font-medium text-navy-700 dark:text-white"></label>
                  </div>
                  <InputField
                    variant="auth"
                    extra="mb-3 mt-5"
                    label="Category Name*"
                    placeholder="Add Category Name"
                    id="categoryName"
                    type="text"
                    value={category.categoryName}
                    onChange={onChange}
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="submit"
                      className="linear rounded-xl border-2 border-red-500 px-5 py-3 text-base font-medium text-red-500 transition duration-200 hover:bg-red-600/5 active:bg-red-700/5 dark:border-red-400 dark:bg-red-400/10 dark:text-white dark:hover:bg-red-300/10 dark:active:bg-red-200/10"
                    >
                      {isNewProduct ? "Save" : "Update"}
                    </button>
                  </div>
                </form>
              </Card>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Card>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        {categories.map((category) => (
          <Widget
            categoryId={category._id}
            icon={baseURL + category.categoryImage}
            title={category.categoryName}
            deleteCategory={categoryDelete}
            editCategory={editCategory}
          />
        ))}
      </div>
    </>
  );
};

export default ColumnsTable;
