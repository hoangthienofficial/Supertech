import React from 'react';
import Carousel from './Component/Carousel';
import ProductSale from './Component/ProductSale';
import Catelory2 from './Component/Catelory2';
import banner1 from "../../../assets/banner7.png";
import banner3 from "../../../assets/banner3.png";
import banner4 from "../../../assets/banner4.png";
import banner5 from "../../../assets/banner5.png";
import banner6 from "../../../assets/banner6.png";
import Dis from './Component/Dis';
import LaptopComponent from './Component/Laptop';
import { Container } from '../../../components/Style/Container';
import ProductHome from './Component/ProductHome';

function Home() {
  return (
    <div className='md:mx-10'>
      <Carousel />
      <Container>
        <ProductSale />

        {/* Responsive Image Section */}
        <div className="mx-auto py-5">
          <div className="flex flex-col md:flex-row gap-4">
            <img
              src={banner3}
              alt="Banner 3"
              className="w-full md:w-[48%] rounded-3xl"
            />
            <img
              src={banner4}
              alt="Banner 4"
              className="w-full md:w-[48%] rounded-3xl"
            />
          </div>
        </div>

        <LaptopComponent />

        <Catelory2 />

        <ProductHome />

        {/* Full-width Banner */}
        <div className="mx-auto py-5">
          <img
            src={banner1}
            alt="Banner 1"
            className="w-full rounded-xl"
          />
        </div>

        {/* Second Responsive Image Section */}
        <div className="mx-auto py-5 ">
          <div className="flex flex-col justify-between md:flex-row gap-4">
            <img
              src={banner5}
              alt="Banner 3"
              className="w-full md:w-[48%] rounded-3xl"
            />
            <img
              src={banner6}
              alt="Banner 4"
              className="w-full md:w-[48%] rounded-3xl"
            />
          </div>
        </div>

        <Dis />
      </Container>
    </div>
  );
}

export default Home;
