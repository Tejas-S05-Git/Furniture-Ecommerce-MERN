const DeleteModal = ({
  open,
  onClose,
  onDelete,
  title,
}) => {
  if (!open) return null;

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      z-50
    "
    >
      <div
        className="
        bg-white
        rounded-3xl
        p-6
        w-[90%]
        max-w-md
      "
      >
        <h2 className="text-xl font-semibold">
          {title}
        </h2>

        <p className="text-zinc-500 mt-2">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="
            px-5
            py-2
            border
            rounded-xl
          "
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="
            px-5
            py-2
            bg-red-500
            text-white
            rounded-xl
          "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
