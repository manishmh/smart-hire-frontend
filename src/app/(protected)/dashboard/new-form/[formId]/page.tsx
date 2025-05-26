import FormFields from "@/components/dashboard/new-form/form-fields";
import FormHeader from "@/components/dashboard/new-form/form-header";
import FormSections from "@/components/dashboard/new-form/form-sections";
import { form } from "@/constants/create-new-file";
import { fetchFormDetails } from "@/lib/api/forms";
import { cookies } from "next/headers";

const NewForm = async ({ params }: { params: Promise<{ formId: string }> }) => {
  const { formId } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return;

  const data = await fetchFormDetails(formId, accessToken);
  const form = data.form;

  if (!data) return;

  return (
    <div>
      {/* <FormSections form={form.form} />
      <FormFields />  */}
        <FormHeader />
      <div className="max-w-10/12 bg-white border mx-auto p-6 rounded-lg">
        <FormSections form={form} />

        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default NewForm;
