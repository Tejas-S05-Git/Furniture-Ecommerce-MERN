import toast from "react-hot-toast";
import { useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const defaultFormData = {
    title: "",
    category: "",
    brand: "",
    sku: "",

    shortDescription: "",
    description: "",

    price: "",
    oldPrice: "",
    discount: "",

    quantity: "",
    stock: true,

    color: "",
    material: "",

    seoTitle: "",
    seoDescription: "",

    featured: false,
    active: true,

    additionalInformation: {
        material: "",
        weight: "",
        dimensions: "",
        warranty: "",
        shipping: "",
        returnPolicy: "",
    },


};

const ProductForm = ({ initialData = null,
    isEdit = false, }) => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [galleryFiles, setGalleryFiles] = useState([]);
    const [socialLinks, setSocialLinks] = useState({ facebook: "", pinterest: "", instagram: "", twitter: "" });
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [galleryPreview, setGalleryPreview] = useState([]);
    const [features, setFeatures] = useState(initialData?.features || [""]);
    const [tags, setTags] = useState(initialData?.tags?.join(", ") || "");
    const [colors, setColors] = useState(initialData?.colors || ["#6B2E1A",]);
    const [formData, setFormData] = useState(initialData || defaultFormData);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories =
        async () => {
            try {
                const response =
                    await api.get(
                        "/categories"
                    );

                setCategories(
                    response.data.categories
                );
            } catch (error) {
                console.log(error);
            }
        };
  
    

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,

                category:
                    initialData.category?._id || "",
            });

            setFeatures(
                initialData.features || [""]
            );

            setTags(
                initialData.tags?.join(", ") || ""
            );

            setColors(
                initialData.colors || ["#6B2E1A"]
            );

            setThumbnailPreview(
                initialData.thumbnail
            );

            setGalleryPreview(
                initialData.images || []
            );
        }
    }, [initialData]);

    

    const addFeature = () => {
        setFeatures([
            ...features,
            "",
        ]);
    };

    const updateFeature = (
        index,
        value
    ) => {
        const updated = [...features];

        updated[index] = value;

        setFeatures(updated);
    };

    const removeFeature = (
        index
    ) => {
        setFeatures(
            features.filter(
                (_, i) => i !== index
            )
        );
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleThumbnail = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setThumbnailFile(file);

        setThumbnailPreview(
            URL.createObjectURL(file)
        );
    };

    const handleGallery = (e) => {
        const files = Array.from(
            e.target.files
        );

        setGalleryFiles(files);

        const previews = files.map(
            (file) =>
                URL.createObjectURL(file)
        );

        setGalleryPreview(previews);
    };
   const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();

    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("brand", formData.brand);
    data.append("sku", formData.sku);

    data.append(
      "shortDescription",
      formData.shortDescription
    );

    data.append(
      "description",
      formData.description
    );

    data.append("price", formData.price);
    data.append("oldPrice", formData.oldPrice);

    data.append(
      "discount",
      formData.discount
    );

    data.append(
      "quantity",
      formData.quantity
    );

    data.append("stock", formData.stock);

    data.append("color", formData.color);

    data.append(
      "material",
      formData.material
    );

    data.append(
      "seoTitle",
      formData.seoTitle
    );

    data.append(
      "seoDescription",
      formData.seoDescription
    );

    data.append(
      "featured",
      formData.featured
    );

    data.append(
      "active",
      formData.active
    );

    data.append(
      "features",
      JSON.stringify(features)
    );

    data.append(
      "tags",
      JSON.stringify(
        tags
          .split(",")
          .map((tag) =>
            tag.trim()
          )
      )
    );

    data.append(
      "colors",
      JSON.stringify(colors)
    );

    data.append(
  "additionalInformation",
  JSON.stringify(
    formData.additionalInformation || {}
  )
);

    if (thumbnailFile) {
      data.append(
        "thumbnail",
        thumbnailFile
      );
    }

    galleryFiles.forEach(
      (image) => {
        data.append(
          "images",
          image
        );
      }
    );

    let response;

    if (isEdit) {
      response = await api.put(
        `/products/${initialData._id}`,
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );
    } else {
      response = await api.post(
        "/products",
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );
    }

    toast.success(
      response.data.message
    );

    navigate(
      "/admin/products"
    );
  } catch (error) {
    console.log(error);

    toast.error(
      error.response?.data
        ?.message ||
        "Something went wrong"
    );
  }
}; 

const handleAdditionalInfo = (
        e
    ) => {
        const { name, value } =
            e.target;

        setFormData({
            ...formData,

            additionalInformation: {
                ...formData.additionalInformation,

                [name]: value,
            },
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl border border-zinc-100 p-6 lg:p-8 space-y-8"
        >
            <div>
                <h2 className="text-xl font-semibold mb-6">
                    Basic Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block mb-2 font-medium">
                            Product Name
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Rustic Wooden Bed"
                            className="w-full border rounded-2xl px-4 py-3 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            SKU
                        </label>

                        <input
                            type="text"
                            name="sku"
                            value={formData.sku}
                            onChange={handleChange}
                            placeholder="BD-WD-OK01"
                            className=" w-full border rounded-2xl px-4 py-3 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Category
                        </label>

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full border rounded-2xl px-4 py-3"
                        >
                            <option value="">
                                Select Category
                            </option>

                            {categories.map((category) => (
                                <option
                                    key={category._id}
                                    value={category._id}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Brand
                        </label>

                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            placeholder="TimberHome"
                            className=" w-full border rounded-2xl px-4 py-3 outline-none"
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <label className="block mb-2 font-medium">
                        Short Description
                    </label>

                    <textarea
                        rows={3}
                        name="shortDescription"
                        value={formData.shortDescription}
                        onChange={handleChange}
                        className=" w-full border rounded-2xl p-4"
                    />
                </div>

                <div className="mt-6">
                    <label className="block mb-2 font-medium">
                        Description
                    </label>

                    <textarea
                        rows={6}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className=" w-full border rounded-2xl p-4"
                    />
                </div>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-6">
                    Pricing
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div>
                        <label className="block mb-2 font-medium">
                            Price
                        </label>

                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="450"
                            className=" w-full border rounded-2xl px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Old Price
                        </label>

                        <input
                            type="number"
                            name="oldPrice"
                            value={formData.oldPrice}
                            onChange={handleChange}
                            placeholder="520"
                            className=" w-full border rounded-2xl px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Discount
                        </label>

                        <input
                            type="number"
                            name="discount"
                            value={formData.discount}
                            onChange={handleChange}
                            placeholder="70"
                            className=" w-full border rounded-2xl px-4 py-3"
                        />
                    </div>

                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-6">
                    Inventory
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                        <label className="block mb-2 font-medium">
                            Quantity
                        </label>

                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            placeholder="12"
                            className=" w-full border rounded-2xl px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Stock Status
                        </label>

                        <select
                            name="stock"
                            value={formData.stock}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    stock:
                                        e.target.value ===
                                        "true",
                                })
                            }
                            className=" w-full border rounded-2xl px-4 py-3"
                        >
                            <option value="true">
                                In Stock
                            </option>

                            <option value="false">
                                Out Of Stock
                            </option>
                        </select>
                    </div>

                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-6">
                    Product Attributes
                </h2>

                <div className="grid md:grid-cols-2 gap-6">

                    <div>
                        <label className="block mb-2 font-medium">
                            Material
                        </label>

                        <input
                            type="text"
                            name="material"
                            value={formData.material}
                            onChange={handleChange}
                            placeholder="Wood"
                            className=" w-full border rounded-2xl px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Color
                        </label>

                        <input
                            type="text"
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                            placeholder="Brown"
                            className=" w-full border rounded-2xl px-4 py-3"
                        />
                    </div>

                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-6">
                    Tags
                </h2>

                <input
                    type="text"
                    value={tags}
                    onChange={(e) =>
                        setTags(e.target.value)
                    }
                    placeholder=" Bed, Bedroom, Rustic, Wood Furniture"
                    className=" w-full border rounded-2xl px-4 py-3"
                />
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-6">
                    Available Colors
                </h2>

                <div className="flex gap-4 flex-wrap">
                    {colors.map(
                        (color, index) => (
                            <input
                                key={index}
                                type="color"
                                value={color}
                                onChange={(e) => {
                                    const updated = [
                                        ...colors,
                                    ];

                                    updated[index] =
                                        e.target.value;

                                    setColors(updated);
                                }}
                            />
                        )
                    )}

                    <button
                        type="button"
                        onClick={() =>
                            setColors([
                                ...colors,
                                "#000000",
                            ])
                        }
                        className=" border px-4 rounded-xl"
                    >
                        +
                    </button>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-6">
                    Media Gallery
                </h2>
                <div className="grid lg:grid-cols-2 gap-8">

                    {/* Thumbnail Upload */}
                    <div>
                        <h3 className="font-medium mb-3">
                            Product Thumbnail
                        </h3>

                        <label
                            className=" border-2 border-dashed border-zinc-300 rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-all"
                        >
                            <p className="font-semibold">
                                Upload Thumbnail
                            </p>

                            <p className="text-sm text-zinc-500 mt-2">
                                Click to upload image
                            </p>

                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleThumbnail}
                            />
                        </label>

                        {thumbnailPreview && (
                            <div className="relative w-40 mt-4">
                                <img
                                    src={thumbnailPreview}
                                    alt=""
                                    className=" w-40 h-40 object-cover rounded-2xl border"
                                />

                                <button
                                    type="button"
                                    onClick={() => {
                                        setThumbnailPreview(null);
                                        setThumbnailFile(null);
                                    }}
                                    className=" absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500 text-white "
                                >
                                    ✕
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Gallery Upload */}
                    <div>
                        <h3 className="font-medium mb-3">
                            Product Gallery
                        </h3>

                        <label
                            className="
      border-2
      border-dashed
      border-zinc-300
      rounded-3xl
      p-10
      flex
      flex-col
      items-center
      justify-center
      cursor-pointer
      hover:border-primary
      transition-all
      "
                        >
                            <p className="font-semibold">
                                Upload Gallery Images
                            </p>

                            <p className="text-sm text-zinc-500 mt-2">
                                Multiple images supported
                            </p>

                            <input
                                type="file"
                                hidden
                                multiple
                                accept="image/*"
                                onChange={handleGallery}
                            />
                        </label>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                            {galleryPreview.map(
                                (image, index) => (
                                    <div
                                        key={index}
                                        className="relative"
                                    >
                                        <img
                                            src={image}
                                            alt=""
                                            className="
              h-32
              w-full
              object-cover
              rounded-2xl
              border
              "
                                        />

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setGalleryPreview(
                                                    galleryPreview.filter(
                                                        (_, i) =>
                                                            i !== index
                                                    )
                                                );

                                                setGalleryFiles(
                                                    galleryFiles.filter(
                                                        (_, i) =>
                                                            i !== index
                                                    )
                                                );
                                            }}
                                            className="
              absolute
              -top-2
              -right-2
              w-8
              h-8
              rounded-full
              bg-red-500
              text-white
              "
                                        >
                                            ✕
                                        </button>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                </div>
            </div>

            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">
                        Features
                    </h2>

                    <button
                        type="button"
                        onClick={addFeature}
                        className="
      bg-primary
      text-white
      px-4
      py-2
      rounded-xl
    "
                    >
                        Add Feature
                    </button>
                </div>

                <div className="space-y-4">
                    {features.map(
                        (feature, index) => (
                            <div
                                key={index}
                                className="flex gap-3"
                            >
                                <input
                                    type="text"
                                    value={feature}
                                    onChange={(e) =>
                                        updateFeature(
                                            index,
                                            e.target.value
                                        )
                                    }
                                    placeholder="Feature"
                                    className="
            flex-1
            border
            rounded-2xl
            px-4
            py-3
          "
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        removeFeature(index)
                                    }
                                    className="
            px-4
            rounded-xl
            bg-red-500
            text-white
          "
                                >
                                    X
                                </button>
                            </div>
                        )
                    )}
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-6">
                    Additional Information
                </h2>

                <div className="grid md:grid-cols-2 gap-6">

                    <input
                        type="text"
                        name="material"
                        value={
                            formData.additionalInformation?.material || ""
                        }
                        onChange={
                            handleAdditionalInfo
                        }
                        placeholder="Solid Oak Wood"
                        className="
  border
  rounded-2xl
  px-4
  py-3
"
                    />

                    <input
                        type="text"
                        name="weight"
                        value={
                            formData.additionalInformation?.weight || ""
                        }
                        onChange={
                            handleAdditionalInfo
                        }
                        placeholder="45 KG"
                        className="
  border
  rounded-2xl
  px-4
  py-3
"
                    />

                    <input
                        type="text"
                        name="dimensions"
                        value={
                            formData.additionalInformation?.dimensions || ""
                        }
                        onChange={
                            handleAdditionalInfo
                        }
                        placeholder="210 × 160 × 110 cm"
                        className="
  border
  rounded-2xl
  px-4
  py-3
"
                    />

                    <input
                        type="text"
                        name="warranty"
                        value={
                            formData.additionalInformation?.warranty || ""
                        }
                        onChange={
                            handleAdditionalInfo
                        }
                        placeholder="5 Years"
                        className="
  border
  rounded-2xl
  px-4
  py-3
"
                    />
                    <input
                        type="text"
                        name="shipping"
                        value={
                            formData.additionalInformation?.shipping || ""
                        }
                        onChange={
                            handleAdditionalInfo
                        }
                        placeholder="Free Shipping"
                        className="
  border
  rounded-2xl
  px-4
  py-3
"
                    />

                    <input
                        type="text"
                        name="returnPolicy"
                        value={
                            formData.additionalInformation?.returnPolicy || ""
                        }
                        onChange={
                            handleAdditionalInfo
                        }
                        placeholder="30 Days Return"
                        className="
  border
  rounded-2xl
  px-4
  py-3
"
                    />

                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-6">
                    SEO Information
                </h2>

                <div className="space-y-6">

                    <input
                        type="text"
                        name="seoTitle"
                        value={formData.seoTitle}
                        onChange={handleChange}
                        placeholder="Meta Title"
                        className="
      w-full
      border
      rounded-2xl
      px-4
      py-3
    "
                    />

                    <textarea
                        rows={4}
                        name="seoDescription"
                        value={formData.seoDescription}
                        onChange={handleChange}
                        placeholder="Meta Description"
                        className="
      w-full
      border
      rounded-2xl
      p-4
    "
                    />

                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-6">
                    Settings
                </h2>

                <div className="space-y-4">

                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={formData.featured}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    featured:
                                        e.target.checked,
                                })
                            }
                        />

                        Featured Product
                    </label>

                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={formData.active}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    active:
                                        e.target.checked,
                                })
                            }
                        />

                        Active Product
                    </label>

                </div>
            </div>

            <div
                className="
  flex
  flex-col
  sm:flex-row
  justify-end
  gap-4
  pt-4
"
            >
                <button
                    type="button"
                    className="
    border
    px-6
    py-3
    rounded-2xl
  "
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="
    bg-primary
    text-white
    px-6
    py-3
    rounded-2xl
  "
                >
                    {isEdit
                        ? "Update Product"
                        : "Save Product"}
                </button>
            </div>
        </form>
    );
};

export default ProductForm;