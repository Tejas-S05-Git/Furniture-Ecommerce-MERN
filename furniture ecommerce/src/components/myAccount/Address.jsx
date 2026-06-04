import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const initialForm = {
    firstName: "",
    lastName: "",
    company: "",
    country: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
};

const Address = () => {
    const [addresses, setAddresses] = useState(() => {
        const saved = localStorage.getItem("userAddresses");
        return saved
            ? JSON.parse(saved)
            : [
                {
                    id: 1,
                    firstName: "Bessie",
                    lastName: "Cooper",
                    street: "2464 Royal Ln. Mesa, New Jersey 45463",
                },
                {
                    id: 2,
                    firstName: "Bessie",
                    lastName: "Cooper",
                    street: "6391 Elgin St. Celina, Delaware 10299",
                },
            ];
    });

    const [formData, setFormData] =
        useState(initialForm);

    const [editingId, setEditingId] =
        useState(null);

    useEffect(() => {
        localStorage.setItem(
            "userAddresses",
            JSON.stringify(addresses)
        );
    }, [addresses]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !formData.firstName ||
            !formData.lastName ||
            !formData.street ||
            !formData.phone ||
            !formData.email
        ) {
            toast.error(
                "Please fill all required fields"
            );
            return;
        }

        const fullAddress = `${formData.street}, ${formData.city}, ${formData.state} ${formData.zipCode}`;

        if (editingId) {
            setAddresses((prev) =>
                prev.map((item) =>
                    item.id === editingId
                        ? {
                            ...item,
                            ...formData,
                            street: fullAddress,
                        }
                        : item
                )
            );

            toast.success(
                "Address updated successfully"
            );
            setEditingId(null);
        } else {
            const newAddress = {
                id: Date.now(),
                ...formData,
                street: fullAddress,
            };

            setAddresses((prev) => [
                ...prev,
                newAddress,
            ]);

            toast.success(
                "Address added successfully"
            );
        }

        setFormData(initialForm);
    };

    const handleDelete = (id) => {
        setAddresses((prev) =>
            prev.filter((item) => item.id !== id)
        );

        toast.success("Address deleted");
    };

    const handleEdit = (address) => {
        setEditingId(address.id);

        setFormData({
            firstName: address.firstName,
            lastName: address.lastName,
            company: address.company || "",
            country: address.country || "",
            street: address.street || "",
            city: address.city || "",
            state: address.state || "",
            zipCode: address.zipCode || "",
            phone: address.phone || "",
            email: address.email || "",
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="space-y-10">
            {/* SAVED ADDRESS */}
            <div className="border border-zinc-200 rounded-2xl overflow-hidden">
                {addresses.map((item) => (
                    <div
                        key={item.id}
                        className="p-5 flex justify-between items-start border-b last:border-0"
                    >
                        <div>
                            <h4 className="font-semibold text-zinc-900">
                                {item.firstName}{" "}
                                {item.lastName}
                            </h4>

                            <p className="text-zinc-500 mt-1 text-sm">
                                {item.street}
                            </p>
                        </div>

                        <div className="flex gap-5 text-sm font-medium">
                            <button
                                onClick={() =>
                                    handleEdit(item)
                                }
                                className="text-primary"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() =>
                                    handleDelete(item.id)
                                }
                                className="text-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* FORM */}
            <div>
                <h2 className="text-3xl font-semibold mb-8">
                    Add New Address
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <div className="grid md:grid-cols-2 gap-5">
                        <Input
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />

                        <Input
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>

                    <Input
                        label="Company Name (Optional)"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                    />

                    <Input
                        label="Country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                    />

                    <Input
                        label="Street Address"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                    />

                    <div className="grid md:grid-cols-2 gap-5">
                        <Input
                            label="City"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        />

                        <Input
                            label="State"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                        />
                    </div>

                    <Input
                        label="Zip Code"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                    />

                    <Input
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />

                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <button
                        type="submit"
                        className="bg-primary text-white px-8 h-14 rounded-full font-medium hover:opacity-90 transition"
                    >
                        {editingId
                            ? "Update Address"
                            : "Add Address"}
                    </button>
                </form>
            </div>
        </div>
    );
};

function Input({
    label,
    name,
    value,
    onChange,
    type = "text",
}) {
    return (
        <div>
            <label className="block mb-3 font-medium text-zinc-800">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full h-14 rounded-full border border-zinc-200 px-5 outline-none focus:border-primary transition"
            />
        </div>
    );
}

export default Address;