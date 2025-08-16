import React from "react";
import medicalStore from '../assests/pic_2.png'
import entranceMedicalStore from '../assests/pic_1.png'

export default function AboutUs() {
  return (
    <section id="about" className="mt-32 bg-gradient-to-br from-green-50 to-blue-50 py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">

        {/* Left Images */}
        <div className="flex-1 flex flex-col gap-6">
          <img
            src={medicalStore}
            alt="Medical Store"
            className="rounded-2xl w-full h-64 object-cotain shadow-xl 
             hover:scale-105 hover:brightness-110 transition-all duration-500"
          />
          <img
            src={entranceMedicalStore}
            alt="Doctor"
            className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500 
             w-full md:w-3/4 lg:w-2/3 mx-auto"
          />
        </div>

        {/* Right Text */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl font-bold text-green-600 mb-4">
            About Mashallah Medical Store
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            At <span className="font-semibold text-green-500">Mashallah Medical Store</span>,
            we are dedicated to providing high-quality medicines and healthcare products
            at affordable prices. Our mission is to ensure that every customer has access to
            the best medical care and trusted products.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            We pride ourselves on excellent customer service, genuine medicines, and a
            wide range of health solutions. From prescription drugs to over-the-counter
            products, we’ve got you covered.
          </p>
          {/* <button className="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-all duration-300">
            Learn More
          </button> */}
        </div>
      </div>
    </section>
  );
}
