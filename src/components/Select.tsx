type Props = {
  title: string;
  options: { value: number; label: string }[];
};

function Select({ title, options }: Props) {
  return (
    <div className="space-y-2.5">
      <h3 className="text-lg font-semibold">{title}</h3>
      <select className="w-72 rounded-sm border border-stone-200 bg-stone-50 px-3 py-1.5">
        {options.map(option => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
