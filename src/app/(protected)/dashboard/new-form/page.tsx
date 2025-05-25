'use client'

import { openNewFormModal } from "@/store/dashboard/new-form-modal-slice";
import { FaPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";

const CreateNewForm = () => {
  const dispatch = useDispatch();
  const handleNewFormModal = () => {
    dispatch(openNewFormModal());
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-medium">Smart Hire - Forms Dashboard</h1>
      <h2 className="text">Manage your hiring forms efficiently</h2>

      <div className="mt-8">
        <div className="border p-4 w-64 aspect-square rounded-md border-dashed flex gap-4 flex-col items-center justify-center bg-purple-100 border-purple-500 text-purple-800 hover:bg-purple-200 transition-colors duration-300 cursor-pointer"
          onClick={handleNewFormModal}        
        >
          <div className="border-purple-800 border-2 p-2 rounded-full">
            <FaPlus />
          </div>
          <div className="text-base font-medium">Create New Form</div>
        </div>
      </div>
    </div>
  )
}

export default CreateNewForm