"use client";

import { useFormSaveStatus } from "@/store/dashboard/form-save-status";
import { IoCloudDoneOutline, IoCloudUploadOutline } from "react-icons/io5";

const FormHeader = () => {
  const saving = useFormSaveStatus();

  return (
    <div className="py-6 px-8 flex items-center justify-between">
      <div></div>
      <div className="flex items-center gap-2">
        {saving ? (
          <>
            <IoCloudUploadOutline />
            saving...
          </>
        ) : (
          <>
            <IoCloudDoneOutline />
            draft saved
          </>
        )}
      </div>
    </div>
  );
};

export default FormHeader;
