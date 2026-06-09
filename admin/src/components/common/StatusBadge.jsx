const StatusBadge = ({ status }) => {
  const statusStyles = {
    active:
      "bg-green-100 text-green-700",

    inactive:
      "bg-red-100 text-red-700",

    Pending:
      "bg-yellow-100 text-yellow-700",

    Processing:
      "bg-blue-100 text-blue-700",

    Shipped:
      "bg-indigo-100 text-indigo-700",

    Delivered:
      "bg-green-100 text-green-700",

    Cancelled:
      "bg-red-100 text-red-700",

    Returned:
      "bg-orange-100 text-orange-700",
  };

  return (
    <span
      className={`
        px-3
        py-1
        rounded-full
        text-sm
        font-medium
        ${
          statusStyles[
            status
          ] ||
          "bg-zinc-100 text-zinc-700"
        }
      `}
    >
      {status}
    </span>
  );
};

export default StatusBadge;