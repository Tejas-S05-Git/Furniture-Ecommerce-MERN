import CountUp from "react-countup";
import { motion } from "framer-motion";

const StatCard = ({
    title,
    value,
    icon: Icon,
}) => {
    return (
        <motion.div
            whileHover={{
                y: -5,
            }}
            className="
      bg-white
      rounded-3xl
      p-6
      shadow-sm
      border
      border-zinc-100
      "
        >
            <div className="flex justify-between">
                <div>
                    <p className="text-zinc-500">
                        {title}
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                        {value.toLocaleString()}
                    </h2>
                </div>

                <div
                    className="
          w-14
          h-14
          rounded-2xl
          bg-primary/10
          flex
          items-center
          justify-center
          "
                >
                    <Icon className="text-primary" />
                </div>
            </div>
        </motion.div>
    );
};

export default StatCard;