import React from "react";
import wasa from "../assets/dhakaWasa.png";
import desco from "../assets/desco.png";
import north from "../assets/northDhaka.png";
import western from "../assets/western.png";

const partners = [
  {
    name: "Titas Gas",
    logo: "https://www.bssnews.net/assets/news_photos/2023/07/16/image-136668-1689513672.jpg",
    service: "Gas",
    country: "Bangladesh",
  },
  {
    name: "Dhaka Water Supply",
    logo: wasa,
    service: "Water",
    country: "Bangladesh",
  },
  { name: "DESCO", logo: desco, service: "Electricity", country: "Bangladesh" },
  {
    name: "Banglalink Internet",
    logo: "https://tds-images.thedailystar.net/sites/default/files/styles/very_big_201/public/images/2023/12/03/banglalink.jpg",
    service: "Internet",
    country: "Bangladesh",
  },
  {
    name: "Grameenphone",
    logo: "https://recharge-prd.asset.akeneo.cloud/product_assets/media/recharge_com_grameenphone_product_card.png",
    service: "Internet",
    country: "Bangladesh",
  },
  {
    name: "Robi Internet",
    logo: "https://www.tbsnews.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2021/05/25/robi_logo.jpg",
    service: "Internet",
    country: "Bangladesh",
  },
  {
    name: "Teletalk",
    logo: "https://recharge-prd.asset.akeneo.cloud/product_assets/media/recharge_com_teletalk_product_card.png",
    service: "Internet",
    country: "Bangladesh",
  },
  {
    name: "Southeast Gas",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZzmelBezOMtbssBA_yq1PrnKM7xeWllYuBg&s",
    service: "Gas",
    country: "Bangladesh",
  },
  {
    name: "North Dhaka Water",
    logo: north,
    service: "Water",
    country: "Bangladesh",
  },
  {
    name: "Western Electric",
    logo: western,
    service: "Electricity",
    country: "Bangladesh",
  },
  {
    name: "Bangladesh Power",
    logo: "https://www.bssnews.net/assets/news_photos/2025/08/10/image-300354-1754805722.jpg",
    service: "Electricity",
    country: "Bangladesh",
  },
  {
    name: "Airtel Bangladesh",
    logo: "https://www.tbsnews.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2020/10/04/airtel-logo.jpg",
    service: "Internet",
    country: "Bangladesh",
  },
];

const PartnersSection = () => {
  return (
    <section className="py-16 md:py-24 mt-12 md:mt-2 bg-gradient-to-r from-blue-950 via-indigo-900 to-purple-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold py-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-teal-400 drop-shadow-lg">
          Our Trusted Partners in Bangladesh
        </h2>
        <p className="text-center text-gray-300 py-4 sm:py-12 text-sm sm:text-base">
          Collaborating with leading utility and internet providers to serve
          millions across Bangladesh.
        </p>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8 items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg border border-white/20 p-4 sm:p-6 rounded-3xl flex flex-col items-center text-center shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain py-3 sm:py-4 rounded-full bg-white/30 p-2"
              />
              <h3 className="font-semibold text-base sm:text-lg text-white py-1">
                {partner.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-200">
                {partner.service}
              </p>
              <p className="text-xs sm:text-sm text-gray-200">
                {partner.country}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
