type Props = {
  title: string;
  placeholder: string;
  options?: { value: number; label: string }[];
  value: number;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

function Select({ title, placeholder, options, value, onChange }: Props) {
  return (
    <div className="space-y-2.5">
      <h3 className="text-lg font-semibold">{title}</h3>
      <select
        className="w-72 cursor-pointer rounded-sm border border-stone-200 bg-stone-50 px-3 py-1.5 shadow focus:border-blue-900 focus:ring-blue-900"
        value={value}
        onChange={onChange}
      >
        <option disabled value={-1}>
          {placeholder}
        </option>
        {options &&
          options.map(option => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </div>
  );
}

export default Select;
