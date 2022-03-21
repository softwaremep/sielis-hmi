type Props = {
  title: string;
  primary: string;
  secondary: string;
};

function Stat({ title, primary, secondary }: Props) {
  return (
    <div className="space-y-2.5">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div>
        <p className="text-xl font-medium">{primary}</p>
        <p className="font-medium text-blue-900">{secondary}</p>
      </div>
    </div>
  );
}

export default Stat;
