import { FormData } from '@/components/dashboard/new-form-modal';
import { Form } from '@/schema/form-schema-type';
import axios from 'axios';
import { handleApiError } from './handle-api-error';

const NEW_FORM_URL = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/new-form`;

// passing accesstoken because the front end is running on server and cannot pass token from browser.
export const fetchFormDetails = async (formId: string, accessToken: string) => {
  try {
    const response = await axios.get(`${NEW_FORM_URL}/${formId}`, {
      withCredentials: true,
      headers: { 
        Cookie: `accessToken=${accessToken}`
       },
    })

    return response.data;
  } catch (error) {
    return handleApiError(error, "Failed to fetch forms");
  }
}

export const FetchAllForm = async () => {
  try {
    const response = await axios.get(NEW_FORM_URL, {
      withCredentials: true,
      params: ""
    });

    return response.data;
  } catch (error) {
    return handleApiError(error, "Failed to fetch forms");
  }
};

export const isNotCompletedForm = async () => {
  try {
    const response = await axios.get(NEW_FORM_URL, {
      withCredentials: true,
      params: { completed: false },
    });

    return response.data;
  } catch (error) {
    return handleApiError(error, "Failed to fetch incomplete forms");
  }
};

export const createNewForm = async (formData: FormData) => {
  try {
    const response = await axios.post(NEW_FORM_URL, formData, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return handleApiError(error, "Failed to create new form");
  }
};

export const updateForm = async (formId: string, data: Partial<Omit<Form, "id" | "userId" | "createdAt" | "updatedAt">>) => {
  try {
    const response = await axios.put(`${NEW_FORM_URL}/${formId}`, data, {
      withCredentials: true,
    }) 

    console.log('resonse', response)
    return response.data;
  } catch (error) {
    return handleApiError(error, "Failed to update form") 
  }
}