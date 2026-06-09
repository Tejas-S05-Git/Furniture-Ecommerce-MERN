const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flexflex-wrapjustify-centersm:justify-endgap-2mt-6">
      <button
        disabled={currentPage === 1}
        onClick={() =>
          setCurrentPage((prev) =>
            prev - 1
          )
        }
        className={`
          px-4 py-2 rounded-xl border
          ${currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : ""
          }
        `}
      >
        Prev
      </button>

      {Array.from(
        { length: totalPages },
        (_, i) => (
          <button
            key={i}
            onClick={() =>
              setCurrentPage(i + 1)
            }
            className={`
              px-4 py-2 rounded-xl
              ${currentPage === i + 1
                ? "bg-primary text-white"
                : "border"
              }
            `}
          >
            {i + 1}
          </button>
        )
      )}

      <button
        disabled={
          currentPage === totalPages
        }
        onClick={() =>
          setCurrentPage((prev) =>
            prev + 1
          )
        }
        className={`
          px-4 py-2 rounded-xl border
          ${currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : ""
          }
        `}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;