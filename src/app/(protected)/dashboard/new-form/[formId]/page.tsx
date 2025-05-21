import { fetchFormDetails } from "@/lib/api/forms";
import { cookies } from "next/headers";

const NewForm = async ({ params }: { params: Promise<{ formId: string }> }) => {
  const { formId } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return;

  const data = await fetchFormDetails(formId, accessToken);

  return <div>id: {JSON.stringify(data)} </div>;
};

export default NewForm;
