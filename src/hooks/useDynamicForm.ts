"use client";
import { NestedSelections } from "@/types";
import { useState } from "react";

export default function useDynamicForm() {
  const [rootSelection, setRootSelection] = useState<string>("");
  const [allSelections, setAllSelections] = useState<NestedSelections>({});

  const selected = allSelections[rootSelection] || {};

  const handleRootChange = (value: string) => {
    setRootSelection(value);
    setAllSelections((prev) => ({
      ...prev,
      [value]: prev[value] || {},
    }));
  };

  const handleChange = (depth: number, value: string) => {
    setAllSelections((prev) => {
      const current = { ...(prev[rootSelection] || {}) };
      current[depth] = value;
      Object.keys(current)
        .map(Number)
        .filter((key) => key > depth)
        .forEach((key) => delete current[key]);
      return {
        ...prev,
        [rootSelection]: current,
      };
    });
  };

  return { rootSelection, selected, handleRootChange, handleChange };
}
