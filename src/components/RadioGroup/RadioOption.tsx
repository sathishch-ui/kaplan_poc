import { RadioOptionProps } from "@/types";

export default function RadioOption({
  name,
  value,
  checked,
  onChange,
}: RadioOptionProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="accent-blue-600"
      />
      <span>{value}</span>
    </label>
  );
}
