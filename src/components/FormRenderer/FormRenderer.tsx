"use client";
import RadioGroup from "@/components/RadioGroup/RadioGroup";
import useDynamicForm from "@/hooks/useDynamicForm";
import { FormRendererProps } from "@/types";

export default function FormRenderer({ node }: FormRendererProps) {
  const {
    rootSelection,
    rootOptions,
    nextLevels,
    selected,
    handleRootChange,
    handleNestedChange,
  } = useDynamicForm(node);

  return (
    <div className="mb-6">
      {/* Root Level */}
      <RadioGroup
        label={node?.label_val}
        options={rootOptions}
        value={rootSelection}
        onChange={handleRootChange}
        displayVertical={node.displayVertical}
      />

      {/* Nested Levels */}
      {nextLevels.map((n, idx) => (
        <div key={n.ID} className="ml-4 mt-4 border-l border-gray-300 pl-4">
          <RadioGroup
            label={n.label_val}
            options={n.options}
            value={selected[idx] || ""}
            onChange={handleNestedChange(idx)}
            displayVertical={n.displayVertical}
          />
        </div>
      ))}
    </div>
  );
}
