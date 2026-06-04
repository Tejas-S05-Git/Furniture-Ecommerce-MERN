import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Payment = () => {
    const [saveCard, setSaveCard] = useState(true);

    const [cards, setCards] = useState(() => {
        const saved = localStorage.getItem("paymentCards");

        return saved
            ? JSON.parse(saved)
            : [
                {
                    id: 1,
                    number: "**** **** **** 8047",
                },
            ];
    });

    const [formData, setFormData] = useState({
        cardName: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
    });

    useEffect(() => {
        localStorage.setItem(
            "paymentCards",
            JSON.stringify(cards)
        );
    }, [cards]);

    const handleChange = (e) => {
        let { name, value } = e.target;

        if (name === "cardNumber") {
            value = value
                .replace(/\D/g, "")
                .replace(/(.{4})/g, "$1 ")
                .trim()
                .slice(0, 19);
        }

        if (name === "cvv") {
            value = value
                .replace(/\D/g, "")
                .slice(0, 3);
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !formData.cardName ||
            !formData.cardNumber ||
            !formData.expiry ||
            !formData.cvv
        ) {
            toast.error("Please fill all fields");
            return;
        }

        const last4 =
            formData.cardNumber.slice(-4);

        const newCard = {
            id: Date.now(),
            number: `**** **** **** ${last4}`,
        };

        setCards((prev) => [
            ...prev,
            newCard,
        ]);

        setFormData({
            cardName: "",
            cardNumber: "",
            expiry: "",
            cvv: "",
        });

        toast.success(
            "Card added successfully"
        );
    };

    const deleteCard = (id) => {
        setCards((prev) =>
            prev.filter((card) => card.id !== id)
        );

        toast.success("Card removed");
    };

    return (
        <div className="space-y-6">
            {/* Paypal */}
            <div className="border rounded-2xl p-5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">💙</span>
                    <span className="font-medium">
                        Paypal
                    </span>
                </div>

                <button className="text-primary font-medium">
                    Link Account
                </button>
            </div>

            {/* Visa */}
            {cards.map((card) => (
                <div
                    key={card.id}
                    className="border rounded-2xl p-5 flex justify-between items-center"
                >
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-xl text-blue-900">
                            VISA
                        </span>

                        <span>{card.number}</span>
                    </div>

                    <button
                        onClick={() =>
                            deleteCard(card.id)
                        }
                        className="text-red-500 font-medium"
                    >
                        Delete
                    </button>
                </div>
            ))}

            {/* Google Pay */}
            <div className="border rounded-2xl p-5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">🌈</span>

                    <span className="font-medium">
                        Google Pay
                    </span>
                </div>

                <button className="text-primary font-medium">
                    Link Account
                </button>
            </div>

            {/* Form */}
            <div className="border rounded-2xl p-6 md:p-8">
                <h3 className="text-xl font-semibold mb-8">
                    Add New Credit/Debit Card
                </h3>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <Input
                        label="Card Holder Name"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        placeholder="Ex. John Doe"
                    />

                    <Input
                        label="Card Number"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="4716 9627 1635 8047"
                    />

                    <div className="grid md:grid-cols-2 gap-5">
                        <Input
                            label="Expiry Date"
                            name="expiry"
                            value={formData.expiry}
                            onChange={handleChange}
                            placeholder="02/30"
                        />

                        <Input
                            label="CVV"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            placeholder="000"
                        />
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={saveCard}
                            onChange={() =>
                                setSaveCard(!saveCard)
                            }
                            className="accent-primary w-4 h-4"
                        />

                        <span className="text-zinc-600">
                            Save card for future payments
                        </span>
                    </label>

                    <button
                        type="submit"
                        className="bg-primary text-white px-8 h-14 rounded-full font-medium hover:opacity-90 transition"
                    >
                        Add Card
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
    placeholder,
}) {
    return (
        <div>
            <label className="block mb-3 font-medium">
                {label} *
            </label>

            <input
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full h-14 rounded-full border border-zinc-200 px-5 outline-none focus:border-primary transition"
            />
        </div>
    );
}

export default Payment;