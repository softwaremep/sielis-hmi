import 'react-datepicker/dist/react-datepicker.css';
import { forwardRef, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { id } from 'date-fns/locale';
import { timestampDayMonthYear } from '../lib/utils';

type CustomDateInputProps = {
  active: boolean;
  placeholder: string;
  value: string | undefined;
  onClick: (e: React.FormEvent<HTMLButtonElement>) => void;
};

const CustomDateInput = forwardRef<HTMLButtonElement, CustomDateInputProps>(
  ({ active, placeholder, value, onClick }, ref) => (
    <button
      className={`${
        active ? 'border-blue-900 ring-1 ring-blue-900' : ''
      } w-72 cursor-pointer rounded-sm border border-stone-200 bg-stone-50 px-3 py-1.5 text-left shadow`}
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
  const [active, setActive] = useState(false);
  return (
    <div className="space-y-2.5">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div>
        <ReactDatePicker
          selected={date}
          dateFormat={timestampDayMonthYear}
          locale={id}
          onChange={onChange}
          onCalendarOpen={() => setActive(true)}
          onCalendarClose={() => setActive(false)}
          // @ts-ignore
          customInput={<CustomDateInput active={active} />}
          placeholderText={placeholder}
        />
      </div>
    </div>
  );
}

export default DatePicker;
