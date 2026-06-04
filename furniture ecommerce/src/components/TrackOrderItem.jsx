import React from "react";

const TrackOrderItem = ({ item }) => {
    return (
        <div
            data-aos="fade-up"
            className="flex items-center gap-4 md:gap-5 py-5 border-b border-zinc-200 last:border-none"
        >
            {/* Image */}
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-secondary overflow-hidden flex-shrink-0">
                <img
                    src={item.images?.[0]}
                    alt={item.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content */}
            <div>
                <h3 className="text-base md:text-lg font-semibold text-zinc-900">
                    {item.title}
                </h3>

                <p className="text-sm md:text-base text-zinc-500 mt-1">
                    Color : {item.color} | {item.quantity} Qty.
                </p>
            </div>
        </div>
    );
};

export default TrackOrderItem;