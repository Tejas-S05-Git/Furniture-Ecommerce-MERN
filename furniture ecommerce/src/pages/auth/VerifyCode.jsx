import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const VerifyCode = () => {
  const navigate = useNavigate();
  const inputsRef = useRef([]);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();

    const enteredOtp = otp.join("");

    // dummy OTP
    if (enteredOtp === "123456") {
      navigate("/reset-password");
    } else {
      alert("Invalid code. Try 123456");
    }
  };

  return (
    <section className="min-h-screen bg-secondary px-4 lg:px-10 py-6">
      <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-10 items-center min-h-screen">

        {/* LEFT */}
        <div className="max-w-[680px] w-full mx-auto">

         <Link
                                to="/"
                                className="flex items-center gap-3 mb-10"
                              >
                                <div className="w-[45px] h-[45px] rounded-full bg-primary flex items-center justify-center">
                                  <span className="text-accent text-2xl font-bold">F</span>
                                </div>
                  
                                <h1 className="text-2xl md:text-4xl font-bold text-zinc-800">
                                  Furniture<span className="text-accent">.</span>
                                </h1>
                              </Link>

          <h1 className="text-5xl font-semibold mb-4">
            Verify Code
          </h1>

          <p className="text-zinc-500 text-lg mb-10 max-w-md">
            Please enter the code we just sent to your email.
          </p>

          <form onSubmit={handleVerify}>

            <label className="text-xl font-medium block mb-5">
              Code *
            </label>

            <div className="flex gap-3 mb-10 flex-wrap">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) =>
                    handleChange(e.target.value, index)
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(e, index)
                  }
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-zinc-200 bg-white text-center text-2xl outline-none"
                />
              ))}
            </div>

            <button className="w-full h-16 rounded-full bg-primary text-white text-xl font-medium hover:opacity-90 transition">
              Verify
            </button>

            <p className="text-center mt-8 text-lg text-zinc-600">
              Didn’t receive code?{" "}
              <button
                type="button"
                className="text-primary underline font-medium"
              >
                Resend Code
              </button>
            </p>
          </form>
        </div>

        {/* RIGHT */}
        <div className="hidden lg:block h-[92vh] rounded-[32px] overflow-hidden">
          <img
            src="/public/images/verify.jpg"
            alt="verify"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default VerifyCode;