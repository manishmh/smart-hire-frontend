"use client";

import { updateForm } from "@/lib/api/forms";
import { Form } from "@/schema/form-schema-type";
import {
  falseFormSaveStatus,
  trueFormSaveStatus,
} from "@/store/dashboard/form-save-status";
import { setFormData, useFormData } from "@/store/dashboard/new-form-slice";
import isEqual from "lodash.isequal";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

type Props = {
  form: Form;
};

const FormSections = ({ form }: Props) => {
  const dispatch = useDispatch();
  dispatch(setFormData(form));
  const formData = useFormData();
  const pathname = usePathname();
  const formId = pathname.split("/").pop() || "";

  const [activeSection, setActiveSection] = useState(1);
  const [newFormData, setNewFormData] = useState({
    name: formData?.name || "",
    description: formData?.description || "",
  });

  if (!formData) return;

  const sectionLength = formData.sections.length;
  const handleSection = (order: number) => {
    setActiveSection(order);
  };

  const handleNewFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormChange = async (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>,
    updatedFormData: Partial<
      Omit<Form, "id" | "userId" | "createdAt" | "updatedAt">
    >
  ) => {
    if ("key" in e) {
      if (e.key !== "Enter") return;
      (e.target as HTMLInputElement).blur();
      return;
    }

    const isDataUnchanged = Object.entries(updatedFormData).every(
      ([key, value]) => isEqual(value, formData[key as keyof typeof formData])
    );
    if (isDataUnchanged) return;

    dispatch(trueFormSaveStatus());

    const data = await updateForm(formId, updatedFormData);
    if (data.success) {
      dispatch(falseFormSaveStatus());
    }
  };

  return (
    <>
      <div className="text-xl font-medium text-gray-700 bg-gray-100 p-2 rounded-sm">
        <input
          type="text"
          name="name"
          value={newFormData.name}
          onBlur={(e) => handleFormChange(e, newFormData)}
          onKeyDown={(e) => handleFormChange(e, newFormData)}
          className="outline-none px-2 focus:border-b-2 focus:border-b-purple-700 w-full hover:bg-gray-200"
          onChange={handleNewFormData}
        />
        <input
          type="text"
          name="description"
          value={newFormData.description}
          onBlur={(e) => handleFormChange(e, newFormData)}
          onKeyDown={(e) => handleFormChange(e, newFormData)}
          className="outline-none px-2 text-gray-600 font-normal text-sm focus:border-b-2 focus:border-b-purple-700 w-full hover:bg-gray-200"
          onChange={handleNewFormData}
        />
      </div>
      <div className="flex gap-2 justify-between items-center w-[80%] mx-auto">
        {formData?.sections.map((section, index) => (
          <>
            {formData.pageOption === "multiple" && (
              <div
                key={section.id}
                className="flex flex-1 items-center gap-2 w-full justify-center hover:dark:bg-[#151617] hover:bg-gray-200 transition-colors duration-300 group p-2 rounded-xs cursor-pointer"
                onClick={() => handleSection(section.order)}
              >
                <div
                  className={` w-6 text-white aspect-square grid place-items-center  rounded-full shrink-0 transition-colors duration-300
                        ${
                          activeSection === section.order
                            ? "bg-purple-600 group-hover:bg-purple-700"
                            : "bg-gray-500 group-hover:bg-gray-700"
                        }
                    `}
                >
                  {section.order}
                </div>
                <div className="">
                  <div
                    className={`transition-colors duration-300 ${
                      activeSection === section.order
                        ? "font-medium"
                        : "text-gray-600 dark:text-gray-500 dark:group-hover:text-white group-hover:text-black"
                    }`}
                  >
                    {section.title}
                  </div>
                  <div></div>
                </div>
              </div>
            )}
            {index !== sectionLength - 1 && (
              <div
                className={`border-b border-gray-300 max-w-22 flex-1 `}
              ></div>
            )}
          </>
        ))}
      </div>
    </>
  );
};

export default FormSections;
