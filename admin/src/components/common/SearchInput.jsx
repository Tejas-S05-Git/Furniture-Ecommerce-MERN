import { Search } from "lucide-react";

const SearchInput = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div
      className="
      bg-white
      border
      rounded-2xl
      px-4
      py-3
      flex
      items-center
      gap-3
    "
    >
      <Search size={18} />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
        w-full
        outline-none
        bg-transparent
      "
      />
    </div>
  );
};

export default SearchInput;