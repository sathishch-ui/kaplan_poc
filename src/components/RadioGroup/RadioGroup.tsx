import { RadioGroupProps } from "@/types";
import RadioOption from "./RadioOption";

export default function RadioGroup({
  label,
  options,
  value,
  onChange,
  displayVertical = false,
}: RadioGroupProps) {
  return (
    <div className="mb-4">
      <fieldset>
        <legend className="block text-lg font-semibold mb-2">{label}</legend>
        <div
          className={
            displayVertical ? "flex flex-col gap-2" : "flex gap-4 flex-wrap"
          }
        >
          {options.map((option) => (
            <RadioOption
              key={option}
              name={label}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
}
