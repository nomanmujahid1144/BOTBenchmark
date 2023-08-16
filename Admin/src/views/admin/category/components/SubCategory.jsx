import Card from "components/card";
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { MdClose } from "react-icons/md";
import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/hooks";
import InputField from "components/fields/InputField";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "redux/Actions/CategoryActions";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useEffect } from "react";
import {
  addSubCategory,
  getSubCategories,
  deleteSubCategory,
  updateSubCategory,
} from "redux/Actions/SubCategoryAction";
import SubCategoryCard from "components/card/SubCategoryCard";
import { Loader } from "components/loader/Loader";

const ColumnsTable = (props) => {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [subcategory, setSubCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [isModelOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryI = categoryId;
    const subcategories = subcategory;

    if (isNewProduct) {
      dispatch(
        addSubCategory(
          categoryI,
          subcategories,
          navigate,
          alert,
          isModelOpen,
          setIsOpen,
          onClose
        )
      );
    } else {
      dispatch(
        updateSubCategory(
          categoryI,
          global.editId,
          subcategories,
          navigate,
          alert,
          isModelOpen,
          setIsOpen,
          onClose
        )
      );
    }
  };

  const onChange = (e) => {
    setCategoryId(e.target.value);
  };

  const { categories } = useSelector((state) => state.categoryReducer);
  const loading = useSelector((state) => state.ProgressBarReducer);
  const { subcategories } = useSelector((state) => state.subcategoryReducer);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubCategories());
    setCategoryId("");
  }, [dispatch, isModelOpen]);

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
    dispatch(deleteSubCategory(ids, navigate, alert));
    onClose();
  };

  const addNewCategory = async () => {
    onOpen();
    setIsNewProduct(true);
    setCategoryId("");
    setSubCategory([]);
  };

  const editCategory = async (id) => {
    setIsNewProduct(false);
    const subcategory = subcategories.filter((category) => category._id === id);
    setSubCategory(subcategory[0].subcategory);
    setCategoryId(subcategory[0].categoryId._id);
    global.editId = subcategory[0]._id;

    onOpen();
  };

  function handleTags(event, type) {
    if (event.key !== "Enter") return;
    const value = event.target.value;
    if (!value.trim()) return;

    if (type === "subcategory") {
      setSubCategory([...subcategory, value]);
    }
    event.target.value = "";
  }

  function removeTag(index, type) {
    if (type === "subcategory") {
      setSubCategory(subcategory.filter((el, i) => i !== index));
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      return false;
    }
  }

  return (
    <>
      {!loading ? (
        <>
          <Card extra={"w-full pb-5 p-4 h-full"}>
            <header className="relative flex items-center justify-between">
              <div className="text-xl font-bold text-navy-700 dark:text-white">
                Sub-Categories
              </div>
              <button
                onClick={addNewCategory}
                className="rounded-xl bg-brand-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
              >
                Add Sub Category
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
                      {isNewProduct
                        ? "Add Sub Category"
                        : "Update Sub Category"}
                    </h1>
                    <form
                      onSubmit={handleSubmit}
                      onKeyDown={(event) => handleKeyDown(event)}
                    >
                      <select
                        onChange={onChange}
                        value={categoryId}
                        className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                        label="Select Version"
                      >
                        <option selected hidden>
                          Select Category
                        </option>
                        {categories.map((category) => (
                          <option value={category._id}>
                            {category.categoryName}
                          </option>
                        ))}
                      </select>
                      <InputField
                        variant="auth"
                        extra="mb-3 mt-5"
                        label="Sub Category List*"
                        placeholder="Enter to Add SubCategory"
                        id="subcategory"
                        type="text"
                        onKeyDown={(event) => handleTags(event, "subcategory")}
                      />
                      <div className="mt-1 flex w-full flex-wrap items-center gap-1">
                        {subcategory.map((tag, index) => (
                          <div
                            key={index}
                            className="inline-flex rounded-full  bg-[#Dad8d8] px-3 py-1"
                          >
                            <div className="text-gray-700">{tag}</div>
                            <div
                              onClick={() => removeTag(index, "subcategory")}
                              className="ml-2 flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-[50%] bg-brand-500 text-[#fff]"
                            >
                              &times;
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 flex justify-end gap-2">
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
            {subcategories.map((category) => (
              <SubCategoryCard
                subcategoryId={category._id}
                category={category.categoryId.categoryName}
                subcategory="Sub-Category List"
                subcategorylist={category.subcategory}
                extra="max-w-[370px]"
                deleteSubCategory={categoryDelete}
                editSubCategory={editCategory}
              />
            ))}
            ;
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ColumnsTable;
