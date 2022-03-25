import { CSVLink } from 'react-csv';

type Props = {
  data: object[];
  filename: string;
};

function ExportButton({ data, filename }: Props) {
  return (
    <CSVLink
      className="inline-block rounded bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-800 active:bg-blue-700"
      data={data}
      filename={filename}
    >
      Export to CSV
    </CSVLink>
  );
}

export default ExportButton;
