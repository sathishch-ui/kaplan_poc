"use client";
import { useCallback, useMemo, useState } from "react";
import { NestedSelections, FormNode } from "@/types";
import { getNextNode } from "@/utils/formUtils";

export default function useDynamicForm(node: FormNode) {
  const [rootSelection, setRootSelection] = useState<string>("");
  const [allSelections, setAllSelections] = useState<NestedSelections>({});

  const selected = useMemo(
    () => allSelections[rootSelection] || {},
    [allSelections, rootSelection]
  );

  const handleRootChange = useCallback((value: string) => {
    setRootSelection(value);
    setAllSelections((prev) => ({
      ...prev,
      [value]: prev[value] || {},
    }));
  }, []);

  const handleChange = useCallback(
    (depth: number, value: string) => {
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
    },
    [rootSelection]
  );

  const { options: rootOptions, children: rootChildren = [] } = node;

  const rootNode = useMemo(() => {
    return (
      rootSelection &&
      rootChildren.find(
        (child) => child.ID.toLowerCase() === rootSelection.toLowerCase()
      )
    );
  }, [rootSelection, rootChildren]);

  const nextLevels = useMemo(() => {
    if (!rootSelection || !rootNode) return [];
    return [rootNode, ...getNextNode(rootNode, selected)];
  }, [rootSelection, rootNode, selected]);

  const handleNestedChange = useCallback(
    (idx: number) => (val: string) => handleChange(idx, val),
    [handleChange]
  );

  return {
    rootSelection,
    selected,
    rootOptions,
    nextLevels,
    handleRootChange,
    handleNestedChange,
  };
}
