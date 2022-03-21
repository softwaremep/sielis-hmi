import { Icon } from '@iconify/react';

type Props = {
  type: 'positive' | 'negative';
  className?: string;
};

function Message({ type, className }: Props) {
  return (
    <div
      className={`${className} flex gap-2.5 rounded-sm border border-stone-200 bg-stone-50 p-4 font-medium`}
    >
      <Icon
        icon={type === 'positive' ? 'bx:line-chart' : 'bx:line-chart-down'}
        className={`${
          type === 'positive' ? 'text-green-500' : 'text-red-500'
        } h-12 w-12 shrink-0`}
      />
      Rata-rata per jam hari ini lebih {type === 'positive' ? 'hemat' : 'boros'}
      <br />
      dibandingkan rata-rata per jam bulan lalu
    </div>
  );
}

export default Message;
