import { Icon } from '@iconify/react';

type Props = {
  type: 'positive' | 'negative';
  variant: 'now' | 'daily';
  className?: string;
};

function Message({ type, variant, className }: Props) {
  const verdict = type === 'positive' ? 'hemat' : 'boros';
  const message =
    variant === 'now'
      ? `Rata-rata per jam hari ini lebih ${verdict} dibandingkan rata-rata per jam bulan lalu`
      : `Konsumsi harian lebih ${verdict} dibandingkan rata-rata per hari bulan lalu`;
  return (
    <div
      className={`${className} flex items-center gap-2.5 rounded-sm border border-stone-200 bg-stone-50 p-4 font-medium`}
    >
      <Icon
        icon={type === 'positive' ? 'bx:line-chart' : 'bx:line-chart-down'}
        className={`${
          type === 'positive' ? 'text-green-500' : 'text-red-500'
        } h-12 w-12 shrink-0`}
      />
      {message}
    </div>
  );
}

export default Message;
