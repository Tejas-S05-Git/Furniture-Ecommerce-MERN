import React from 'react'
import chairImg from '../assets/images/chair_1-removebg-preview.png'
import sofaImg from '../assets/images/sofa-removebg-preview.png'
import lightingImg from '../assets/images/sealing lightt.png'
import { useNavigate } from 'react-router-dom'


const CategorySection = () => {
    const navigate = useNavigate();
    return (
        <section className="bg-white py-14 md:py-20 relative overflow-hidden">
            {/* BLUR SHAPES */}

          

            <div className="max-w-[1200px] mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_.9fr] gap-6">
                    {/* LEFT BIG CARD */}

                    <div
                        data-aos="fade-right"
                        data-aos-duration="1200"
                        className="group bg-gradient-to-br from-[#ECECEC] to-[#DCDCDC] rounded-[30px] p-5 md:p-8 overflow-hidden relative min-h-[520px] md:min-h-[650px]"
                    >
                        {/* BADGE */}

                        <div className="inline-flex items-center bg-white/70 backdrop-blur-md rounded-full px-5 py-2">
                            <span className="text-accent font-bold text-xl">1500+</span>

                            <span className="text-zinc-700 text-lg ml-2">Items</span>
                        </div>

                        {/* CONTENT */}

                        <div className="relative z-10 max-w-[280px] mt-6">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900">
                                Chairs
                            </h2>

                            <p className="text-zinc-600 text-base md:text-lg leading-relaxed mt-4">
                                Premium modern chair collection for luxury interiors.
                            </p>

                            <ul className="space-y-3 mt-8 text-zinc-700 text-base md:text-lg">
                                <li>Gaming Chair</li>
                                <li>Lounge Chair</li>
                                <li>Folding Chair</li>
                                <li>Dining Chair</li>
                                <li>Office Chair</li>
                                <li>Armchair</li>
                                <li>Bar Stool</li>
                                <li>Club Chair</li>
                            </ul>

                            <button onClick={()=> navigate('/shop')} className="mt-8 md:mt-10 w-14 h-14 rounded-full bg-primary text-white text-2xl flex items-center justify-center">
                                <i className="ri-arrow-right-up-line"></i>
                            </button>
                        </div>

                        {/* IMAGE */}

                        <img
                            src={chairImg}
                            alt="Chair"
                            loading="lazy"
                            className="absolute bottom-0 right-[-30px] md:right-[-80px] lg:right-[-140px] w-[280px] sm:w-[380px] md:w-[520px] lg:w-[650px] object-contain"
                        />
                    </div>

                    {/* RIGHT SIDE */}

                    <div className="flex flex-col gap-6">
                        {/* SOFA */}

                        <div
                            data-aos="fade-up"
                            data-aos-delay="100"
                            className="bg-gradient-to-br from-[#ECECEC] to-[#DCDCDC] rounded-[30px] p-5 md:p-6 overflow-hidden relative min-h-[300px]"
                        >
                            <div className="relative z-10 max-w-[220px]">
                                <div className="inline-flex items-center bg-white/70 backdrop-blur-md rounded-full px-5 py-2">
                                    <span className="text-accent font-bold text-xl">750+</span>

                                    <span className="text-zinc-700 text-lg ml-2">Items</span>
                                </div>

                                <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mt-5">
                                    Sofa
                                </h2>

                                <ul className="space-y-3 mt-6 text-zinc-700 text-base md:text-lg">
                                    <li>Reception Sofa</li>
                                    <li>Sectional Sofa</li>
                                    <li>Armless Sofa</li>
                                    <li>Curved Sofa</li>
                                </ul>

                                <button onClick={()=> navigate('/shop')} className="mt-8 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl">
                                    <i className="ri-arrow-right-up-line"></i>
                                </button>
                            </div>

                            <img
                                src={sofaImg}
                                alt="Sofa"
                                loading="lazy"
                                className="absolute bottom-0 right-0 w-[200px] sm:w-[250px] md:w-[300px] object-contain"
                            />
                        </div>

                        {/* LIGHTING */}

                        <div
                            data-aos="fade-left"
                            data-aos-delay="200"
                            className="bg-gradient-to-br from-[#ECECEC] to-[#DCDCDC] rounded-[30px] p-5 md:p-6 overflow-hidden relative min-h-[300px]"
                        >
                            <div className="relative z-10 max-w-[220px]">
                                <div className="inline-flex items-center bg-white/70 backdrop-blur-md rounded-full px-5 py-2">
                                    <span className="text-accent font-bold text-xl">450+</span>

                                    <span className="text-zinc-700 text-lg ml-2">Items</span>
                                </div>

                                <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mt-5">
                                    Lighting
                                </h2>

                                <ul className="space-y-3 mt-6 text-zinc-700 text-base md:text-lg">
                                    <li>Table Lights</li>
                                    <li>Floor Lights</li>
                                    <li>Ceiling Lights</li>
                                    <li>Wall Lights</li>
                                </ul>

                                <button onClick={()=> navigate('/shop')} className="mt-8 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl">
                                    <i className="ri-arrow-right-up-line"></i>
                                </button>
                            </div>

                            <img
                                src={lightingImg}
                                alt="Lighting"
                                loading="lazy"
                                className="absolute bottom-0 right-0 w-[180px] sm:w-[230px] md:w-[280px] object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CategorySection