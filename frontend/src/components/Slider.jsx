import { useEffect, useRef } from "react";
import gsap from "gsap";
import React from 'react'

const Slider = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;

    gsap.to(slider, {
      x: "-50%",
      duration: 50,
      ease: "linear",
      repeat: -1,
    });

  }, []);

  const images = [
    "https://files.globalgiving.org/pfil/51176/pict_featured_jumbo.jpg?t=1760627301000",
    "https://media.cnn.com/api/v1/images/stellar/prod/210727124423-restricted-03-india-dogs-adoption-united-states-hnk-dst-intl.jpg?q=w_1110,c_fill",
    "https://www.vosd.in/wp-content/uploads/2025/03/VOSD-PUNE-RESCUE-TEAM-1200.webp",
    "https://images.seattletimes.com/wp-content/uploads/2017/09/b4d053b2-a3e2-11e7-91ef-547564321be5.jpg?d=780x519",
    "https://www.humaneworld.org/sites/default/files/styles/responsive_3_2_500w/public/2023-09/india-street-dog-vaccination-580953_0.jpg.webp?itok=VG8sXM-y",
  ];

  return (
    <div className="overflow-hidden w-full py-6">
      <div ref={sliderRef} className="flex gap-6 w-max">
        {[...images, ...images].map((img, index) => (
          <img
            key={index}
            src={img}
            alt=""
            className="w-72 h-96 object-cover rounded-xl shadow-xl shadow-gray-500 hover:scale-110 m-5"
          />
        ))}
      </div>
    </div>
  );
}

export default Slider