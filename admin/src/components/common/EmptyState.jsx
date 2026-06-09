import { PackageOpen } from "lucide-react";

const EmptyState = ({
  title,
  description,
}) => {
  return (
    <div
      className="
      bg-white
      rounded-3xl
      border
      border-zinc-100
      p-10
      text-center
      "
    >
      <PackageOpen
        size={60}
        className="
        mx-auto
        text-zinc-300
        mb-4
        "
      />

      <h2
        className="
        text-xl
        font-semibold
        text-zinc-800
        "
      >
        {title}
      </h2>

      <p
        className="
        text-zinc-500
        mt-2
        "
      >
        {description}
      </p>
    </div>
  );
};

export default EmptyState;