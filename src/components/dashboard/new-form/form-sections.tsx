"use client";

import { useFormSaveStatus } from "@/store/dashboard/form-save-status";
import { updateForm } from "@/lib/api/forms";
import { createSection, updateSection } from "@/lib/api/section";
import { Form } from "@/schema/form-schema-type";
import {
  falseFormSaveStatus,
  trueFormSaveStatus,
} from "@/store/dashboard/form-save-status";
import { setFormData, useFormData } from "@/store/dashboard/new-form-slice";
import isEqual from "lodash.isequal";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { GoTriangleDown } from "react-icons/go";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

type Props = {
  form: Form;
};

type FormFieldKey = "name" | "description";
type SectionFieldKey = "title";

type EditState =
  | {
      type: "form";
      key: FormFieldKey;
      value: string;
    }
  | {
      type: "section";
      key: SectionFieldKey;
      value: string;
      sectionIndex: number;
      sectionId: string;
    }
  | null;

const FormSections = ({ form }: Props) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const formId = pathname.split("/").pop() || "";
  const saving = useFormSaveStatus();

  const newSectionInitialValue = {
    state: false,
    value: "",
  };
  const [newSection, setNewSection] = useState(newSectionInitialValue);
  console.log("newsection", newSection);

  useEffect(() => {
    dispatch(setFormData(form));
  }, [dispatch, form]);

  const formData = useFormData();
  console.log("formdata", formData);
  const [activeSection, setActiveSection] = useState(1);
  const [editState, setEditState] = useState<EditState>(null);

  if (!formData) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: FormFieldKey | SectionFieldKey,
    type: "form" | "section",
    sectionIndex?: number,
    sectionId?: string
  ) => {
    if (type === "form") {
      setEditState({
        type: "form",
        key: key as FormFieldKey,
        value: e.target.value,
      });
    } else if (type === "section" && sectionIndex !== undefined && sectionId) {
      setEditState({
        type: "section",
        key: key as SectionFieldKey,
        value: e.target.value,
        sectionIndex,
        sectionId,
      });
    }
  };

  const handleSave = async (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>,
    key: FormFieldKey | SectionFieldKey,
    type: "form" | "section",
    sectionIndex?: number,
    sectionId?: string
  ) => {
    if ("key" in e && e.key !== "Enter") return;
    if ("key" in e && e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
      return;
    }
    if (!editState) return;

    if (
      type === "section" &&
      editState.type === "section" &&
      sectionIndex !== undefined &&
      sectionId
    ) {
      const currentValue =
        formData.sections[sectionIndex][key as SectionFieldKey];
      if (isEqual(editState.value, currentValue)) {
        setEditState(null);
        return;
      }
      dispatch(trueFormSaveStatus());
      const data = await updateSection(formData.id, sectionId, {
        [key]: editState.value,
      });

      if (data.success) {
        const newSections = formData.sections.map((section) =>
          section.id === sectionId
            ? { ...section, [key]: editState.value }
            : section
        );
        dispatch(setFormData({ ...formData, sections: newSections }));
        dispatch(falseFormSaveStatus());
      }
      setEditState(null);
    } else if (type === "form" && editState.type === "form") {
      const currentValue = formData[key as FormFieldKey];
      if (isEqual(editState.value, currentValue)) {
        setEditState(null);
        return;
      }
      dispatch(trueFormSaveStatus());
      const data = await updateForm(formId, { [key]: editState.value });
      if (data.success) {
        dispatch(setFormData({ ...formData, [key]: editState.value }));
        dispatch(falseFormSaveStatus());
      }
      setEditState(null);
    }
  };

  const handleNewSection = async (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>
  ) => {
    if ("key" in e && e.key !== "Enter") return;
    if ("key" in e && e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
      return;
    }

    dispatch(trueFormSaveStatus());
    const data = await createSection(formData.id, newSection.value);

    if (data.success) {
      dispatch(
        setFormData({
          ...formData,
          sections: [...formData.sections, data.section],
        })
      );

      setNewSection(newSectionInitialValue);
      dispatch(falseFormSaveStatus());
      toast.success(data.message);
    } else {
      toast.error(data.messagge);
    }
  };

  return (
    <>
      <div className="text-xl font-medium text-gray-700 bg-gray-100 p-2 rounded-sm">
        {(["name", "description"] as FormFieldKey[]).map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            value={
              editState && editState.type === "form" && editState.key === field
                ? editState.value
                : formData[field] || ""
            }
            onFocus={() =>
              setEditState({
                type: "form",
                key: field,
                value: formData[field] || "",
              })
            }
            onBlur={(e) => handleSave(e, field, "form")}
            onKeyDown={(e) => handleSave(e, field, "form")}
            onChange={(e) => handleInputChange(e, field, "form")}
            className={`outline-none px-2 ${
              field === "name" ? "" : "text-gray-600 font-normal text-sm"
            } focus:border-b-2 focus:border-b-purple-700 w-full hover:bg-gray-200`}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          />
        ))}
      </div>
      <div className="flex gap-2 justifybetween items-center mx-auto my-4 ">
        {formData.sections.map((section, index) => (
          <div
            key={section.id}
            className="group relative hover:bg-gray-200 transition-colors duration-300"
          >
            <div
              className="flex flex-1 items-center gap-2 w-full justifycenter group p-2 rounded-xs"
              onClick={() => setActiveSection(section.order)}
            >
              <div
                className={`w-6 text-white aspect-square grid place-items-center rounded-full shrink-0 transition-colors duration-300
                  ${
                    activeSection === section.order
                      ? "bg-purple-600 group-hover:bg-purple-700"
                      : "bg-gray-500 group-hover:bg-gray-700"
                  }`}
              >
                {section.order}
              </div>
              <div className="">
                <input
                  type="text"
                  name="title"
                  value={
                    editState &&
                    editState.type === "section" &&
                    editState.key === "title" &&
                    editState.sectionId === section.id
                      ? editState.value
                      : section.title
                  }
                  onFocus={() =>
                    setEditState({
                      type: "section",
                      key: "title",
                      value: section.title,
                      sectionIndex: index,
                      sectionId: section.id,
                    })
                  }
                  onChange={(e) =>
                    handleInputChange(e, "title", "section", index, section.id)
                  }
                  onBlur={(e) =>
                    handleSave(e, "title", "section", index, section.id)
                  }
                  onKeyDown={(e) =>
                    handleSave(e, "title", "section", index, section.id)
                  }
                  className="outline-none px-2 text-gray-600 font-normal text-sm border-b-2 border-b-transparent focus:border-b-2 focus:border-b-purple-700 w-full hover:bg-gray-200 py-1"
                  placeholder="Section Title"
                />
              </div>
            </div>

            {/* absolutely positioned add new section button  */}
            {!newSection.state && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 group-hover:translate-x-1/2 p-2 cursor-pointer transition-all duration-500">
                <div
                  className="w-6 aspect-square bg-purple-500 rounded-full text-white grid place-items-center hover:scale-105 peer opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  onClick={() =>
                    setNewSection((prev) => ({ ...prev, state: !prev.state }))
                  }
                >
                  <FaPlus />
                </div>
                <div className="absolute opacity-0 text-black/80 text-xs duration-500 peer-hover:opacity-100 -top-2 peer-hover:-translate-y-4 transition-all bg-purple-200 border border-purple-300 w-max left-1/2 -translate-x-1/2 px-2 rounded-xs">
                  <div>Add section</div>
                  <GoTriangleDown className="absolute left-1/2 -translate-x-1/2 -bottom-[10px] text-purple-600" />
                </div>
              </div>
            )}
          </div>
        ))}

        {/* input for new section  */}
        {newSection.state && (
          <div className="h-full">
            <input
              type="text"
              autoFocus
              disabled={saving}
              placeholder="Name your new Section"
              value={newSection.value}
              onChange={(e) =>
                setNewSection((prev) => ({ ...prev, value: e.target.value }))
              }
              onKeyDown={handleNewSection}
              onBlur={handleNewSection}
              className="h-full px-2 py-1 outline-none border-b-2 border-b-purple-700"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default FormSections;
