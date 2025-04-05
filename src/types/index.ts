export type FormNode = {
  ID: string;
  id?: string;
  type: string;
  depth: number;
  index: number;
  isLast: boolean;
  parent: null | string;
  options: string[];
  children: FormNode[];
  parentId?: string | null;
  label_val: string;
  displayVertical?: boolean;
  isRequired?: boolean;
}

export type FormRendererProps = {
  node: FormNode;
};

export type NestedSelections = Record<string, Record<number, string>>;

export type RadioGroupProps = {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  displayVertical?: boolean;
};

export type RadioOptionProps = {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
};

