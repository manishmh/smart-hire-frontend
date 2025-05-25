import { fetchFormDetails } from "@/lib/api/forms";
import { cookies } from "next/headers";
import { form } from '@/constants/create-new-file'
import FormSections from "@/components/dashboard/new-form/form-sections";
import FormFields from "@/components/dashboard/new-form/form-fields";

const NewForm = async ({ params }: { params: Promise<{ formId: string }> }) => {
  const { formId } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return;

  const data = await fetchFormDetails(formId, accessToken);

  return (
    <div>
      {/* <FormSections form={form.form} />
      <FormFields />  */}
      
    </div>
  );
};

export default NewForm;
