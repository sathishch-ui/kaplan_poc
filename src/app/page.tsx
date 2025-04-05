"use client";
import formData from "@/data/data.json";
import FormRenderer from "@/components/FormRenderer/FormRenderer";

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Dynamic Radio Form</h1>
      {formData.map((node) => (
        <FormRenderer key={node.ID} node={node} />
      ))}
    </main>
  );
}
