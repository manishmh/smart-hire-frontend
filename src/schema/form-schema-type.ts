import { FieldType } from "./field-type";

export interface SubField {
  id: string;
  label: string;
  type: FieldType;
  order: number;
  required: boolean;
  placeholder: string | null;
  defaultValue: string | null;
  hint: string | null;
  options: { choices: string[] } | null;
  fieldId: string;
}


export interface FormField {
  id: string;
  label: string;
  fieldType: FieldType;
  order: number;
  required: boolean;
  placeholder?: string | null;
  sectionId: string;
  subField: SubField[];
}

export interface FormSection {
  id: string;
  title: string;
  order: number;
  formId: string;
  fields: FormField[];
}

export interface Form {
  id: string;
  name: string;
  description?: string | null;
  completed: boolean;
  pageOption: "single" | "multiple"
  userId: string;
  createdAt: string;
  updatedAt: string;
  sections: FormSection[];
}

export interface FormApiResponse {
  success: boolean;
  message: string;
  form: Form;
}
