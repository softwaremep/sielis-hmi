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
      titleClass += 'text-xl';
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
    <div className="space-y-2.5">
      <h3 className={titleClass}>{title}</h3>
      <div>
        <p className="text-xl font-medium">
          {primary} {unitElement}
        </p>
        <p className="font-medium text-blue-900">
          {secondary} {unitElement}
        </p>
      </div>
    </div>
  );
}

export default Stat;
