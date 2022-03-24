type Props = {
  title: string;
  primary: string;
  secondary: string;
  variant: 'main' | 'aside';
  unit?: string;
};

function Stat({ title, primary, secondary, variant, unit }: Props) {
  let titleClass = 'font-semibold ';
  switch (variant) {
    case 'main':
      titleClass += 'text-lg';
      break;
    case 'aside':
      titleClass += 'uppercase';
      break;
  }

  // Render per unit
  const unitElement = unit ? (
    <span className="text-sm font-medium text-gray-700">/{unit}</span>
  ) : null;

  return (
    <div className="mt-2 space-y-1">
      <h3 className={titleClass}>{title}</h3>
      <div>
        <p className="text-lg font-medium lg:text-xl">
          {primary} {unitElement}
        </p>
        <p className="text-sm font-medium text-blue-900 lg:text-base">
          {secondary} {unitElement}
        </p>
      </div>
    </div>
  );
}

export default Stat;
