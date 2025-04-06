import { FormNode } from "@/types";

export const normalize = (value: string): string =>
  value?.toLowerCase().replace(/\s+/g, "");

export const findMatchingChild = (
  children: FormNode[] = [],
  selectedValue: string
): FormNode | undefined => {
  const normVal = normalize(selectedValue);

  return children.find((child) => {
    const idMatch = normalize(child?.ID).includes(normVal);
    const labelMatch = normalize(child?.label_val).includes(normVal);
    return idMatch || labelMatch;
  });
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
