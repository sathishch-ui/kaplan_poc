import { FormNode } from "@/types";

export const normalize = (value: string): string =>
  value?.toLowerCase().replace(/\s+/g, "");

export const findMatchingChild = (
  children: FormNode[] = [],
  selectedValue: string
): FormNode | undefined => {
  const normVal = normalize(selectedValue);
  return children.find(
    (child) =>
      child.ID?.toLowerCase().includes(normVal) ||
      child.label_val?.toLowerCase().includes(selectedValue?.toLowerCase())
  );
};

export const getNextNode = (
  node: FormNode,
  selected: Record<number, string>,
  depth = 0
): FormNode[] => {
  const selectedValue = selected[depth];
  const match = findMatchingChild(node?.children ?? [], selectedValue);
  return match ? [match, ...getNextNode(match, selected, depth + 1)] : [];
};
