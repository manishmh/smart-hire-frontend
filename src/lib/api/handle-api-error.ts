import axios from 'axios'

export type ApiErrorResponse = {
  success: false;
  message: string;
};

export const handleApiError = (error: unknown, defaultMessage = "Unexpected error"): ApiErrorResponse => {
  console.error("API Error:", error);

  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message ?? "Unknown error";
    return {
      success: false,
      message,
    };
  }

  return {
    success: false,
    message: defaultMessage,
  };
};