import Card from "components/card";
import React, { useMemo } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import upload from "../../../../assets/svg/upload.svg";
import { MdClose } from "react-icons/md";
import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/hooks";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "redux/Actions/CategoryActions";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useEffect } from "react";
import { getSubCategories } from "redux/Actions/SubCategoryAction";
import SoftwareCard from "components/card/SoftwareCard";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { baseURL } from "constants/baseURL";
import {
  addSoftware,
  getSoftwares,
  deleteSoftwares,
} from "redux/Actions/SoftwareActions";
import { updateSoftware } from "redux/Actions/SoftwareActions";
import { Loader } from "components/loader/Loader";
import { axiosInstance } from "constants/axiosInstance";

const SoftwareSchema = Yup.object().shape({
  softwareLogo: Yup.string().required("Image is required"),
  softwareName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  categoryId: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  subcategory: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  // description: Yup.string()
  //   .min(2, "Too Short!")
  //   .max(10000, "Too Long!")
  //   .required("Required"),
  contacts: Yup.object().shape({
    webLink: Yup.string(),
    email: Yup.string(),
    contactno: Yup.string(),
    location: Yup.object().shape({
      address: Yup.string(),
      coordinates: Yup.array(),
    }),
  }),
});

const ColumnsTable = (props) => {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [description, setDesceiprion] = useState("");
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [subcategory, setSubCategory] = useState([]);
  const [isModelOpen, setIsOpen] = useState(false);

  const [filePreview, setFilePreview] = useState(null);
  const [editItem, setEditItem] = useState([]);
  const [imgCheck, setImgCheck] = useState(false);

  const { categories } = useSelector((state) => state.categoryReducer);
  const { subcategories } = useSelector((state) => state.subcategoryReducer);
  const loading = useSelector((state) => state.ProgressBarReducer);
  const { softwares } = useSelector((state) => state.softwareReducer);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubCategories());
    dispatch(getSoftwares());
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

  const softwareDelete = async (id) => {
    let ids = [];
    ids.push(id);
    dispatch(deleteSoftwares(ids, navigate, alert, isModelOpen, setIsOpen));
    onClose();
  };

  const addNewCategory = async () => {
    onOpen();
    setEditItem([]);
    setDesceiprion("");
    setIsNewProduct(true);
  };

  const editSoftware = async (id) => {
    setIsNewProduct(false);
    const software = softwares.filter((software) => software._id === id);
    setDesceiprion(software[0]?.description);
    setEditItem(softwares.filter((software) => software._id === id));
    global.editId = software[0]._id;
    onOpen();
  };

  // Description Coding
  const handleEditorChange = (event, editor) => {
    setDesceiprion(editor.getData());
  };

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("image", file);
            axiosInstance
              .post(`${baseURL}/api/v1/software/adddescriptionimage`, body)
              .then((res) => {
                resolve({ default: `${res.data.url}` });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <>
      {!loading ? (
        <>
          <Card extra={"w-full pb-5 p-4 h-full"}>
            <header className="relative flex items-center justify-between">
              <div className="text-xl font-bold text-navy-700 dark:text-white">
                Softwares
              </div>
              <button
                onClick={addNewCategory}
                className="rounded-xl bg-brand-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
              >
                Add Softwares
              </button>
            </header>
            <Modal isOpen={isOpen} onClose={onClose} className="!z-[1010]">
              <ModalOverlay className="bg-[#000] !opacity-30" />
              <ModalContent className="!z-[1002] !m-auto !w-max min-w-[58%] !max-w-[85%] md:top-[1vh]">
                <ModalBody>
                  <Card extra="px-[20px] pt-[15px] pb-[20px] max-w-[750px] flex flex-col !z-[1004]">
                    <div
                      onClick={onClose}
                      className="flex cursor-pointer justify-end"
                    >
                      <MdClose className="h-6 w-6" />
                    </div>
                    <h1 className="mb-[10px] text-center text-2xl font-bold">
                      {isNewProduct ? "Add Software" : "Update Software Info"}
                    </h1>
                    <Formik
                      enableReinitialize
                      initialValues={{
                        softwareLogo:
                          editItem.length !== 0
                            ? `${editItem[0].softwareLogo}`
                            : "",
                        softwareName:
                          editItem.length !== 0
                            ? `${editItem[0].softwareName}`
                            : "",
                        categoryId:
                          editItem.length !== 0
                            ? `${editItem[0].categoryId._id}`
                            : "",
                        subcategory:
                          editItem.length !== 0
                            ? `${editItem[0].subcategory}`
                            : "",
                        // description:
                        //   editItem.length !== 0
                        //     ? `${editItem[0].description}`
                        //     : "",
                        contacts: {
                          webLink:
                            editItem.length !== 0
                              ? `${editItem[0].contacts.webLink}`
                              : "",
                          email:
                            editItem.length !== 0
                              ? `${editItem[0].contacts.email}`
                              : "",
                          contactno:
                            editItem.length !== 0
                              ? `${editItem[0].contacts.contactno}`
                              : "",
                          location: {
                            address:
                              editItem.length !== 0
                                ? `${editItem[0].contacts.location.address}`
                                : "",
                          },
                        },
                      }}
                      validationSchema={SoftwareSchema}
                      onSubmit={async (values) => {
                        var formData = new FormData();
                        values.description = description.toString();
                        if (!isNewProduct) {
                          if (imgCheck) {
                            let image = values.softwareLogo;
                            formData.append("softwareLogo", image);
                            dispatch(
                              updateSoftware(
                                values,
                                formData,
                                navigate,
                                alert,
                                isModelOpen,
                                setIsOpen,
                                setIsNewProduct,
                                onClose
                              )
                            );
                          } else {
                            dispatch(
                              updateSoftware(
                                values,
                                formData,
                                navigate,
                                alert,
                                isModelOpen,
                                setIsOpen,
                                setIsNewProduct,
                                onClose
                              )
                            );
                          }
                        } else {
                          let image = values.softwareLogo;
                          formData.append("softwareLogo", image);
                          dispatch(
                            addSoftware(
                              values,
                              formData,
                              navigate,
                              alert,
                              isModelOpen,
                              setIsOpen,
                              onClose
                            )
                          );
                        }
                      }}
                    >
                      {({
                        isSubmitting,
                        values,
                        setFieldValue,
                        handleChange,
                      }) => (
                        <Form className="rounded bg-white">
                          <div className="mx-auto flex justify-center">
                            <div className=" mx-auto justify-center md:mr-2 md:mb-0 md:w-full">
                              <label
                                htmlFor="softwareLogo"
                                className="mx-auto mb-2 block h-[120px] w-[120px] cursor-pointer rounded-[50%]"
                              >
                                <img
                                  className="mb-2 block h-[125px] w-[125px] cursor-pointer rounded-[50%] "
                                  src={
                                    !isNewProduct &&
                                    !editItem.length !== 0 &&
                                    !imgCheck
                                      ? baseURL + editItem[0].softwareLogo
                                      : !values.softwareLogo
                                      ? upload
                                      : filePreview
                                  }
                                  alt="img"
                                />
                                <input
                                  className="hidden"
                                  id="softwareLogo"
                                  name="image"
                                  type="file"
                                  accept="image/*"
                                  onChange={(event) => {
                                    setFieldValue(
                                      "softwareLogo",
                                      event.currentTarget.files[0]
                                    );
                                    setFilePreview(
                                      URL.createObjectURL(event.target.files[0])
                                    );
                                    setImgCheck(true);
                                  }}
                                />
                              </label>
                              <label
                                className="ml-1.5 flex justify-center text-sm font-medium text-navy-700 dark:text-white"
                                name="softwareLogo"
                              >
                                Software Logo*
                              </label>
                              <ErrorMessage
                                className="text-center text-xs text-red-600"
                                name="softwareLogo"
                                component="div"
                              />
                            </div>
                          </div>
                          <div className="h-[17rem] overflow-y-auto overflow-x-hidden">
                            <div className="grid  grid-cols-2 ">
                              <div className="m-3 ">
                                <div className=" md:mr-2 md:mb-0 md:w-full">
                                  <label
                                    className="ml-1.5 text-sm font-medium text-navy-700 dark:text-white"
                                    htmlFor="softwareName"
                                  >
                                    Software Name*
                                  </label>
                                  <Field
                                    className="mb-1 mt-3 flex h-10 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                                    type="text"
                                    name="softwareName"
                                  />
                                  <ErrorMessage
                                    className="text-xs text-red-600"
                                    name="softwareName"
                                    component="div"
                                  />
                                </div>
                                <div className=" md:mr-2 md:mb-0 md:w-full">
                                  <label
                                    className="ml-1.5 text-sm font-medium text-navy-700 dark:text-white"
                                    htmlFor="categoryId"
                                  >
                                    Software Category*
                                  </label>
                                  <Field
                                    className="mb-1 mt-3 flex h-10 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                                    as="select"
                                    name="categoryId"
                                    onChange={(event) => {
                                      handleChange(event);
                                      const subcaty = subcategories.filter(
                                        (catrgory) =>
                                          catrgory.categoryId._id ===
                                          event.target.value
                                      );
                                      setSubCategory(subcaty[0].subcategory);
                                      try {
                                      } catch (e) {
                                        console.log(e);
                                      }
                                    }}
                                  >
                                    <option value="" hidden selected>
                                      Select Category Here
                                    </option>
                                    {categories.map((catrgory, index) => (
                                      <option key={index} value={catrgory._id}>
                                        {catrgory.categoryName}
                                      </option>
                                    ))}
                                  </Field>
                                  <ErrorMessage
                                    className="text-xs font-thin text-red-600"
                                    name="categoryId"
                                    component="div"
                                  />
                                </div>

                                {/* <div className=" mt-4 md:mr-2 md:mb-0 md:w-full">
                                  <label
                                    className="ml-1.5 text-sm font-medium text-navy-700 dark:text-white"
                                    htmlFor="subcategory"
                                  >
                                    Software Sub Category*
                                  </label>
                                  <Field
                                    className="mb-1 mt-3 flex h-10 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                                    as="select"
                                    name="subcategory"
                                  >
                                    <option value="" hidden selected>
                                      Select Category Here
                                    </option>
                                    {subcategory.map((catrgory, index) => (
                                      <option key={index} value={catrgory}>
                                        {catrgory}
                                      </option>
                                    ))}
                                  </Field>
                                  <ErrorMessage
                                    className="text-xs font-thin text-red-600"
                                    name="subcategory"
                                    component="div"
                                  />
                                </div> */}
                              </div>
                              <div className="m-3">
                                <div className="md:mr-2 md:mb-0 md:w-full">
                                  <label
                                    className="ml-1.5 text-sm font-medium text-navy-700 dark:text-white"
                                    htmlFor="subcategory"
                                  >
                                    Software Sub Category*
                                  </label>
                                  <Field
                                    className="mb-1 mt-3 flex h-10 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                                    as="select"
                                    // multiple
                                    name="subcategory"
                                  >
                                    <option value="" hidden selected>
                                      Select Category Here
                                    </option>
                                    {subcategory.map((catrgory, index) => (
                                      <option key={index} value={catrgory}>
                                        {catrgory}
                                      </option>
                                    ))}
                                  </Field>
                                  <ErrorMessage
                                    className="text-xs font-thin text-red-600"
                                    name="subcategory"
                                    component="div"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className=" md:mr-2 md:mb-0 md:w-full">
                              <label
                                className="ml-1.5 text-sm font-medium text-navy-700 dark:text-white"
                                htmlFor="description"
                              >
                                Description*
                              </label>
                              {/* <Field
                                className="mb-1 mt-3 flex w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                                type="text"
                                as="textarea"
                                rows="8"
                                name="description"
                              />
                              <ErrorMessage
                                className="text-xs text-red-600"
                                name="description"
                                component="div"
                              /> */}
                              <CKEditor
                                editor={ClassicEditor}
                                data={description}
                                config={{
                                  extraPlugins: [uploadPlugin],
                                  toolbar: [
                                    "heading",
                                    "|",
                                    "bold",
                                    "italic",
                                    "|",
                                    "table",
                                    "link",
                                    "bulletedList",
                                    "numberedList",
                                    "blockQuote",
                                    "undo",
                                    "redo",
                                    "|",
                                    "imageUpload",
                                    // "insertTable",
                                  ],
                                  heading: {
                                    options: [
                                      {
                                        model: "paragraph",
                                        title: "Paragraph",
                                        class: "ck-heading_paragraph",
                                      },
                                      {
                                        model: "heading1",
                                        view: "h1",
                                        title: "Heading 1",
                                        class: "ck-heading_heading1",
                                      },
                                      {
                                        model: "heading2",
                                        view: "h2",
                                        title: "Heading 2",
                                        class: "ck-heading_heading2",
                                      },
                                      {
                                        model: "heading3",
                                        view: "h3",
                                        title: "Heading 3",
                                        class: "ck-heading_heading3",
                                      },
                                      {
                                        model: "heading4",
                                        view: "h4",
                                        title: "Heading 4",
                                        class: "ck-heading_heading4",
                                      },
                                      {
                                        model: "heading5",
                                        view: "h5",
                                        title: "Heading 5",
                                        class: "ck-heading_heading5",
                                      },
                                      {
                                        model: "heading6",
                                        view: "h6",
                                        title: "Heading 6",
                                        class: "ck-heading_heading6",
                                      },
                                    ],
                                  },
                                }}
                                onReady={(editor) => {
                                  editor.editing.view.change((writer) => {
                                    writer.setStyle(
                                      "height",
                                      "300px",
                                      editor.editing.view.document.getRoot()
                                    );
                                  });
                                }}
                                onChange={handleEditorChange}
                              />
                            </div>
                          </div>
                          <p className="ml-1.5 text-sm font-medium text-navy-700 dark:text-white">
                            Contact Info*
                          </p>
                          <div className="grid grid-cols-2 overflow-y-auto">
                            <div className="">
                              <div className=" md:mr-2 md:mb-0 md:w-full">
                                <div className="pl-4">
                                  <div>
                                    <label
                                      className="mb-1 block py-1 text-xs text-gray-700"
                                      htmlFor="contacts.webLink"
                                    >
                                      Website Link
                                    </label>

                                    <Field
                                      className="mb-1 mt-3 flex h-9 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                                      type="text"
                                      name="contacts.webLink"
                                      validate={(value) => {
                                        if (value) {
                                          if (!/^(https:\/\/).*$/.test(value)) {
                                            return "Please enter a valid HTTPS link or URL";
                                          }
                                          return undefined;
                                        }
                                      }}
                                    />
                                    <ErrorMessage
                                      className="text-xs font-thin text-red-600"
                                      name="contacts.webLink"
                                      component="div"
                                    />
                                  </div>
                                  <div>
                                    <label
                                      className="mb-1 block py-1 text-xs text-gray-700"
                                      htmlFor="contacts.contactno"
                                    >
                                      Contact No*
                                    </label>

                                    <Field
                                      className="mb-1 mt-3 flex h-9 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                                      type="text"
                                      name="contacts.contactno"
                                    />
                                    <ErrorMessage
                                      className="text-xs font-thin text-red-600"
                                      name="contacts.contactno"
                                      component="div"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="">
                              <div className=" md:mr-2 md:mb-0 md:w-full">
                                <div className="pl-4">
                                  <div>
                                    <label
                                      className="mb-1 block py-1 text-xs text-gray-700"
                                      htmlFor="contacts.email"
                                    >
                                      Email
                                    </label>

                                    <Field
                                      className="mb-1 mt-3 flex h-9 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                                      type="text"
                                      name="contacts.email"
                                      validate={(value) => {
                                        if (value) {
                                          if (
                                            !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
                                              value
                                            )
                                          ) {
                                            return "Please enter a valid email address";
                                          }
                                          return undefined;
                                        }
                                      }}
                                    />
                                    <ErrorMessage
                                      className="text-xs font-thin text-red-600"
                                      name="contacts.email"
                                      component="div"
                                    />
                                  </div>
                                  <div>
                                    <label
                                      className="mb-1 block py-1 text-xs text-gray-700"
                                      htmlFor="contacts.location"
                                    >
                                      location
                                    </label>

                                    <Field
                                      className="mb-1 mt-3 flex h-9 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                                      type="text"
                                      name="contacts.location.address"
                                    />
                                    <ErrorMessage
                                      className="text-xs font-thin text-red-600"
                                      name="contacts.location.address"
                                      component="div"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className=" mt-2 flex items-center justify-center gap-2 text-center">
                            <button
                              className="focus:shadow-outline w-36 rounded bg-[#E9C95D] px-4 py-2 font-semibold text-gray-600 hover:bg-[#E9D95D] focus:outline-none"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              {!isNewProduct ? "Update" : "Submit"}
                            </button>
                            <button
                              className={`focus:shadow-outline w-36 rounded bg-[#E9C95D] px-4 py-2 font-semibold text-gray-600 hover:bg-[#E9D95D] focus:outline-none ${
                                !isNewProduct ? "hidden" : ""
                              }`}
                              type="reset"
                            >
                              Reset
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </Card>
                </ModalBody>
              </ModalContent>
            </Modal>
          </Card>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-3">
            {softwares.map((software) => (
              <SoftwareCard
                softwareId={software._id}
                softwareLogo={baseURL + software.softwareLogo}
                softwareName={software.softwareName}
                softwareCategory={software.categoryId?.categoryName}
                softwareSubCategory={software.subcategory}
                websiteLink={software.contacts.webLink}
                websiteEmail={software.contacts.email}
                websiteContact={software.contacts.contactno}
                deleteSubCategory={softwareDelete}
                editSubCategory={editSoftware}
              />
            ))}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ColumnsTable;
