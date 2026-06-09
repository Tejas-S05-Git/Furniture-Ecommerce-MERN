const CategoryDetailsCard = ({
  category,
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 border">

      <img
        src={category.image}
        alt={category.name}
        className="
        w-full
        h-72
        object-cover
        rounded-2xl
        "
      />

      <h2 className="text-2xl font-bold mt-6">
        {category.name}
      </h2>

      <p className="text-zinc-500 mt-3">
        {category.description}
      </p>

      <div className="mt-6 space-y-3">

        <div>
          Products :
          <strong> {category.products}</strong>
        </div>

        <div>
          Status :
          <strong> {category.status}</strong>
        </div>

      </div>

    </div>
  );
};

export default CategoryDetailsCard;
