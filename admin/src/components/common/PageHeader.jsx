import { Plus } from "lucide-react";

const PageHeader = ({
 title,
  subtitle,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

      <div>
        <h1 className="text-3xl font-bold text-zinc-800">
          {title}
        </h1>

        <p className="text-zinc-500 mt-1">
          {subtitle}
        </p>
      </div>

      {buttonText && (
        <button
          onClick={onButtonClick}
          className="
          bg-primary
          text-white
          px-5
          py-3
          rounded-2xl
          flex
          items-center
          gap-2
          hover:opacity-90
          transition
        "
        >
          <Plus size={18} />
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default PageHeader;