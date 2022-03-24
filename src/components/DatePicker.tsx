import 'react-datepicker/dist/react-datepicker.css';
import { forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import { id } from 'date-fns/locale';
import { timestampDayMonthYear } from '../lib/utils';

type CustomDateInputProps = {
  placeholder: string;
  value: string | undefined;
  onClick: (e: React.FormEvent<HTMLButtonElement>) => void;
};

const CustomDateInput = forwardRef<HTMLButtonElement, CustomDateInputProps>(
  ({ placeholder, value, onClick }, ref) => (
    <button
      className="w-72 cursor-pointer rounded-sm border border-stone-200 bg-stone-50 px-3 py-1.5 text-left"
      ref={ref}
      onClick={onClick}
    >
      {value || placeholder}
    </button>
  )
);
CustomDateInput.displayName = 'CustomDateInput';

type DatePickerProps = {
  title: string;
  placeholder: string;
  date: Date | null;
  onChange: (
    date: Date | null,
    event: React.SyntheticEvent<any, Event> | undefined
  ) => void;
};

function DatePicker({ title, placeholder, date, onChange }: DatePickerProps) {
  return (
    <div className="space-y-2.5">
      <h3 className="text-lg font-semibold">{title}</h3>
      <ReactDatePicker
        selected={date}
        dateFormat={timestampDayMonthYear}
        locale={id}
        onChange={onChange}
        // @ts-ignore
        customInput={<CustomDateInput />}
        placeholderText={placeholder}
      />
    </div>
  );
}

export default DatePicker;
