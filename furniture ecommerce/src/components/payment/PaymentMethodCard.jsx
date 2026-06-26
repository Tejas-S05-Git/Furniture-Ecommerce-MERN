import { CheckCircle2 } from "lucide-react";

const PaymentMethodCard = ({
  selected,
  onSelect,
  value,
  title,
  description,
  icon,
  badges = [],
}) => {
  return (
    <label
      onClick={() => onSelect(value)}
      className={`
        relative
        block
        cursor-pointer
        rounded-3xl
        border-2
        p-6
        transition-all
        duration-300
        hover:shadow-lg

        ${
          selected
            ? "border-primary bg-primary/5"
            : "border-zinc-200 bg-white"
        }
      `}
    >
      <input
        type="radio"
        checked={selected}
        onChange={() => onSelect(value)}
        className="hidden"
      />

      <div className="flex items-start gap-5">

        {/* Icon */}

        <div
          className="
          w-16
          h-16
          rounded-2xl
          bg-primary/10
          flex
          items-center
          justify-center
          shrink-0
          "
        >
          {icon}
        </div>

        {/* Content */}

        <div className="flex-1">

          <div className="flex items-center justify-between">

            <h3
              className="
              text-xl
              font-semibold
              "
            >
              {title}
            </h3>

            {selected && (
              <CheckCircle2
                className="text-primary"
                size={24}
              />
            )}

          </div>

          <p
            className="
            mt-2
            text-zinc-500
            leading-7
            "
          >
            {description}
          </p>

          {badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">

              {badges.map((badge) => (
                <span
                  key={badge}
                  className="
                  px-3
                  py-1
                  rounded-full
                  bg-secondary
                  text-sm
                  "
                >
                  {badge}
                </span>
              ))}

            </div>
          )}

        </div>

      </div>
    </label>
  );
};

export default PaymentMethodCard;