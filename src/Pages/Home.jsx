import React from "react";
import Carousel from "../Components/Banner";
import Categories from "../Components/Categories";
import StatsSection from "../Components/StatsSection";
import PartnersSection from "../Components/PartnersSection";
import Bills from "../Components/Bills";
import RecentBills from "../Components/RecentBills";

const Home = () => {
  return (
    <div>
      <Carousel></Carousel>
      <Categories></Categories>
      <RecentBills></RecentBills>
      <StatsSection></StatsSection>
      <Bills></Bills>
      <PartnersSection></PartnersSection>
    </div>
  );
};

export default Home;
