"use client";

import { use, useEffect, useState } from "react";
import FormFields from "@/components/dashboard/new-form/form-fields";
import FormHeader from "@/components/dashboard/new-form/form-header";
import FormSections from "@/components/dashboard/new-form/form-sections";
import { fetchFormDetails } from "@/lib/api/forms";
import { Form } from "@/schema/form-schema-type";

const NewForm = ({ params }: { params: Promise<{ formId: string }> }) => {
  const { formId } = use(params);

  const [form, setForm] = useState<Form | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchFormDetails(formId);
      setForm(result.form);
    };

    fetchData();
  }, [formId]);

  if (!form) return null;

  return (
    <div>
      <FormHeader />
      <div className="max-w-10/12 bg-white border mx-auto p-6 rounded-lg">
        <FormSections form={form} />
        <pre>{JSON.stringify(form, null, 2)}</pre>
      </div>
    </div>
  );
};

export default NewForm;
