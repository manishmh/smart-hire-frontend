"use client";

import { createNewForm } from "@/lib/api/forms";
import {
  handleIncompletedForm,
  useIncompletedForms,
} from "@/store/dashboard/incompleted-forms-slice";
import {
  closeNewFormModal,
  useNewFormModal,
} from "@/store/dashboard/new-form-modal-slice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export interface FormData {
  name: string;
  pageOption: "single" | "multiple";
  multiPageChoice: "template" | "scratch";
  template: string;
}

const NewFormModal = () => {
  const { isNewFormModal } = useNewFormModal();
  const incompletedForms = useIncompletedForms();
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    pageOption: "single",
    multiPageChoice: "template",
    template: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePageOptionChange = (option: "single" | "multiple") => {
    setFormData((prevData) => ({
      ...prevData,
      pageOption: option,
      ...(option === "single" && {
        multiPageChoice: undefined,
        template: undefined,
      }),
    }));
  };

  const handleMultiPageChoiceChange = (pageOption: "template" | "scratch") => {
    setFormData((prevData) => ({
      ...prevData,
      multiPageChoice: pageOption,
      ...(pageOption === "scratch" && { template: undefined }),
    }));
  };

  const handleTemplateSelect = (templateName: string) => {
    setFormData((prevData) => ({
      ...prevData,
      template: templateName,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form data submitted", formData);

    const data = await createNewForm(formData);
    console.log("newform data", data);

    if (data?.success) {
      dispatch(closeNewFormModal());

      const newIncompletedForms = [data.form, ...incompletedForms];
      console.log("new completed", newIncompletedForms);
      dispatch(handleIncompletedForm(newIncompletedForms));

      router.push(`/dashboard/new-form/${data.form.id}`);
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  const templates = [
    { name: "Application Form", value: "application", icon: "📄" },
  ];

  if (!isNewFormModal) return;

  return (
    <div className="w-screen h-screen absolute bg-black/20 dark:bg-black/70 z-50 flex items-center justify-center">
      <div
        className="absolute h-full w-full"
        onClick={() => dispatch(closeNewFormModal())}
      ></div>

      <div className="bg-white dark:bg-gray-900 w-3xl max-h-10/12 p-1.5 rounded-3xl shadow-lg">
        <div className="w-full h-full border border-gray-200 dark:border-gray-700 rounded-2xl bg-gradient-to-b from-gray-200 to-white dark:from-gray-700 dark:to-black/10 relative">
          <button
            className="text-xl text-gray-400 hover:bg-gray-300 dark:text-gray-300 dark:hover:bg-gray-700 rounded-full p-1 cursor-pointer hover:text-gray-800 dark:hover:text-white absolute right-2 top-2"
            onClick={() => dispatch(closeNewFormModal())}
          >
            <IoClose />
          </button>

          {/* main form content box starts here  */}
          <div className="p-6 text-base">
            <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 mb-8 text-center tracking-tight">
              Create Your Form
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-gray-700 dark:text-gray-200 font-semibold mb-2"
                >
                  Form Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your form name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 ease-in-out text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-200 text-base font-semibold mb-3">
                  Choose Page Option:
                </label>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                  {/* Single Page Option Box */}
                  <div
                    className={`relative flex-1 p-5 rounded-xl border-2 cursor-pointer
                  transition-all duration-300 ease-in-out
                  ${
                    formData.pageOption === "single"
                      ? "border-purple-500 bg-gradient-to-br from-purple-100 to-fuchsia-100 dark:from-purple-900 dark:to-fuchsia-900 shadow-lg"
                      : "border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-purple-300 dark:hover:border-purple-400 hover:shadow-md"
                  }`}
                    onClick={() => handlePageOptionChange("single")}
                  >
                    <input
                      type="radio"
                      name="pageOption"
                      value="single"
                      checked={formData.pageOption === "single"}
                      onChange={() => handlePageOptionChange("single")}
                      className="absolute top-3 right-3 h-5 w-5 text-purple-600 border-gray-300 dark:border-gray-700 focus:ring-purple-500 opacity-0 cursor-pointer"
                    />
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">📄</span>
                      <span className="text-gray-800 dark:text-gray-100 text-lg font-medium">
                        Single Page
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      A simple, one-page form.
                    </p>
                  </div>

                  {/* Multiple Page Option Box */}
                  <div
                    className={`relative flex-1 p-5 rounded-xl border-2 cursor-pointer
                  transition-all duration-300 ease-in-out
                  ${
                    formData.pageOption === "multiple"
                      ? "border-purple-500 bg-gradient-to-br from-purple-100 to-fuchsia-100 dark:from-purple-900 dark:to-fuchsia-900 shadow-lg"
                      : "border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-purple-300 dark:hover:border-purple-400 hover:shadow-md"
                  }`}
                    onClick={() => handlePageOptionChange("multiple")}
                  >
                    <input
                      type="radio"
                      name="pageOption"
                      value="multiple"
                      checked={formData.pageOption === "multiple"}
                      onChange={() => handlePageOptionChange("multiple")}
                      className="absolute top-3 right-3 h-5 w-5 text-purple-600 border-gray-300 dark:border-gray-700 focus:ring-purple-500 opacity-0 cursor-pointer"
                    />
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">📚</span>
                      <span className="text-gray-800 dark:text-gray-100 text-lg font-medium leading-5">
                        Multiple Page
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      Break your form into sections.
                    </p>
                  </div>
                </div>
              </div>

              {formData.pageOption === "multiple" && (
                <div className="h-[250px] my-2 overflow-y-scroll">
                  <div className="p-6 bg-purple-50 dark:bg-black/5 rounded-xl border border-purple-200 dark:border-purple-700 transition-all duration-300 ease-in-out">
                    <label className="block text-purple-800 dark:text-purple-200 text-base font-semibold mb-4">
                      Multiple Page Options:
                    </label>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                      {/* Choose a Template Option Box */}
                      <div
                        className={`relative flex-1 p-4 rounded-xl border-2 cursor-pointer text-center
                      transition-all duration-300 ease-in-out
                      ${
                        formData.multiPageChoice === "template"
                          ? "border-fuchsia-500 bg-gradient-to-br from-fuchsia-100 to-violet-100 dark:from-fuchsia-900 dark:to-violet-900 shadow-lg"
                          : "border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-fuchsia-300 dark:hover:border-fuchsia-400 hover:shadow-md"
                      }`}
                        onClick={() => handleMultiPageChoiceChange("template")}
                      >
                        <input
                          type="radio"
                          name="multiPageChoice"
                          value="template"
                          checked={formData.multiPageChoice === "template"}
                          onChange={() =>
                            handleMultiPageChoiceChange("template")
                          }
                          className="absolute top-3 right-3 h-5 w-5 text-fuchsia-600 border-gray-300 dark:border-gray-700 focus:ring-fuchsia-500 opacity-0 cursor-pointer"
                        />
                        <span className="text-2xl block mb-1">✨</span>
                        <span className="text-gray-800 dark:text-gray-100 text-lg font-medium">
                          Choose a Template
                        </span>
                      </div>

                      {/* Create New Form from Scratch Option Box */}
                      <div
                        className={`relative flex-1 p-4 rounded-xl border-2 cursor-pointer text-center
                      transition-all duration-300 ease-in-out
                      ${
                        formData.multiPageChoice === "scratch"
                          ? "border-fuchsia-500 bg-gradient-to-br from-fuchsia-100 to-violet-100 dark:from-fuchsia-900 dark:to-violet-900 shadow-lg"
                          : "border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-fuchsia-300 dark:hover:border-fuchsia-400 hover:shadow-md"
                      }`}
                        onClick={() => handleMultiPageChoiceChange("scratch")}
                      >
                        <input
                          type="radio"
                          name="multiPageChoice"
                          value="scratch"
                          checked={formData.multiPageChoice === "scratch"}
                          onChange={() =>
                            handleMultiPageChoiceChange("scratch")
                          }
                          className="absolute top-3 right-3 h-5 w-5 text-fuchsia-600 border-gray-300 dark:border-gray-700 focus:ring-fuchsia-500 opacity-0 cursor-pointer"
                        />
                        <span className="text-2xl block mb-1">🚀</span>
                        <span className="text-gray-800 dark:text-gray-100 text-lg font-medium">
                          Start from Scratch
                        </span>
                      </div>
                    </div>

                    {/* Template Selection Section (Horizontally Scrollable) */}
                    {formData.multiPageChoice === "template" && (
                      <div className="mt-6 h-full">
                        <label className="block text-purple-800 dark:text-purple-200 text-base font-semibold mb-3">
                          Select a Template:
                        </label>
                        <div className="flex overflow-x-auto pb-4 -mx-2 custom-scrollbar">
                          {templates.map((template) => (
                            <div
                              key={template.value}
                              className={`flex-none w-48 h-40 p-4 mx-2 rounded-xl border-2 cursor-pointer flex flex-col items-center justify-center text-center
                            transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg
                            ${
                              formData.template === template.value
                                ? "border-green-500 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900 dark:to-teal-900 shadow-xl"
                                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-green-300 dark:hover:border-green-400"
                            }`}
                              onClick={() =>
                                handleTemplateSelect(template.value)
                              }
                            >
                              <span className="text-4xl mb-2">
                                {template.icon}
                              </span>
                              <span className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                                {template.name}
                              </span>
                              <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                                Ready-to-use layout
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full cursor-pointer bg-gradient-to-r from-purple-600 to-fuchsia-700 dark:from-purple-800 dark:to-fuchsia-900 text-white font-extrabold py-3 px-6 rounded-xl
              shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-700 focus:ring-opacity-75
              transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-102 text-xl"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewFormModal;
