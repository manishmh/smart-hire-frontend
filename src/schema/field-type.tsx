import {
  FiUser,
  FiHash,
  FiMail,
  FiList,
  FiCheckSquare,
  FiCircle,
  FiUpload,
  FiCalendar,
  FiLayers,
  FiSend,
  FiEye,
} from "react-icons/fi";
import { IconType } from "react-icons";

export const FieldTypes = [
  "text",
  "number",
  "email",
  "select",
  "checkbox",
  "radio",
  "file",
  "date",
  "group",
  "submit",
  "review",
] as const;

export type FieldType = typeof FieldTypes[number];

export const FieldTypeIcons: Record<FieldType, IconType> = {
  text: FiUser,
  number: FiHash,
  email: FiMail,
  select: FiList,
  checkbox: FiCheckSquare,
  radio: FiCircle,
  file: FiUpload,
  date: FiCalendar,
  group: FiLayers,
  submit: FiSend,
  review: FiEye,
};

export const FieldIcon = ({ type }: { type: FieldType }) => {
  const Icon = FieldTypeIcons[type];
  return <div className="bg-purple-100 p-2 rounded-full text-purple-700"><Icon className="text-xl" /></div>
};


