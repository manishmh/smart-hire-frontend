"use client";

import Loader from "@/components/global/loader";
import { FieldIcon } from "@/schema/field-type";
import { Form } from "@/schema/form-schema-type";
import { useFormData } from "@/store/dashboard/new-form-slice";
import FormInputs from "./form-inputs";
import { formatLastUpdated } from "./updated-date-format";

const FormFields = () => {
  const formData = useFormData();

  if (!formData) {
    return (
      <div className="w-full h-screen grid place-items-center">
        <Loader />
      </div>
    );
  }

  const form: Form = formData;
  const sections = form.sections;
  const fields = sections.flatMap((section) => section.fields);
  const formUpdatedDate = formatLastUpdated(form.updatedAt);

  return (
    <div className="space-y-6 max-w-9/12 mx-auto">
      <div className="text-center text-gray-600 dark:text-gray-400 my-12">
        <div></div>
        <h1>Job Title</h1>
      </div>
      <div className="flex justify-between">
        <div></div>
        <div className="text-gray-600 dark:text-gray-400">
          {formUpdatedDate}
        </div>
      </div>
      {fields.map((field) => (
        // Mapping all the fields of section. like all the input of personal section or role information section
        <div key={field.id} className="border p-4 rounded-md shadow-sm">
          <div className="">
            <div className="flex items-center gap-4">
              <FieldIcon type={field.fieldType} />
              <div className="text-base">{field.label}</div>
            </div>
            {field.subField.length === 0 && (
              // if the subField is empty then map the field only as it has only one input field.
              <div className="my-6">
                <FormInputs type={field.fieldType} label={field.label} />
              </div>
            )}
          </div>
          {field.subField.length !== 0 && (
            <div className="grid grid-cols-2 gap-8 my-6">
              {field.subField.length !== 0 &&
                field.subField.map((sField) => (
                  // if the field has subfield then map all the sub fields instead and not field as sub fields contains all the fields. excluding the field itself.
                  <div key={sField.id} className="col-span-1">
                    <FormInputs type={sField.type} label={sField.label} />
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FormFields;
