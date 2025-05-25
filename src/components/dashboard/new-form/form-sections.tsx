"use client";

import { Form } from "@/schema/form-schema-type";
import { setFormData, useFormData } from "@/store/dashboard/new-form-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";

type Props = {
  form: Form;
};

const FormSections = ({ form }: Props) => {
  const [activeSection, setActiveSection] = useState(1);
  const dispatch = useDispatch();
  dispatch(setFormData(form));

  const formData = useFormData();
  if (!formData) return;

  const sectionLength = formData.sections.length;

  const handleSection = (order: number) => {
    setActiveSection(order)
  }

  return (
    <div className="flex gap-2 justify-between items-center w-[80%] mx-auto">
      {formData?.sections.map((section, index) => (
        <>
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
          {index !== sectionLength - 1 && (
            <div className={`border-b border-gray-300 max-w-22 flex-1 `}></div>
          )}
        </>
      ))}
    </div>
  );
};

export default FormSections;
