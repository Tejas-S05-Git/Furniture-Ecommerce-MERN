const DataTable = ({
  columns,
  data,
  renderRow,
}) => {
  return (
    <div
      className="
      bg-white
      rounded-3xl
      border
      border-zinc-100
      shadow-sm
      overflow-hidden
      "
    >
      <div
        className="
        overflow-x-auto
        scrollbar-thin
        "
      >
        <table
          className="
          w-full
          min-w-[1000px]
          "
        >
          <thead>
            <tr
              className="
              border-b
              border-zinc-100
              bg-secondary
              "
            >
              {columns.map((column) => (
                <th
                  key={column}
                  className="
                  px-6
                  py-4
                  text-left
                  text-xs
                  uppercase
                  tracking-wider
                  font-semibold
                  text-zinc-600
                  whitespace-nowrap
                  "
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((item) =>
              renderRow(item)
            )}
          </tbody>
        </table>
      </div>

      {data.length > 0 && (
        <div
          className="
          px-6
          py-3
          border-t
          border-zinc-100
          text-sm
          text-zinc-500
          "
        >
          Total Records: {data.length}
        </div>
      )}
    </div>
  );
};

export default DataTable;