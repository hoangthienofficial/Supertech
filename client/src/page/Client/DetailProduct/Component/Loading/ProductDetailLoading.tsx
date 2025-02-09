import React from "react";
import { Skeleton } from "antd";
import { Container } from "../../../../../components/Style/Container";

function LoadingDetailProduct() {
  return (
    <Container>
      <div className="py-6 text-[1.5rem] leading-10">
        {/* Breadcrumb */}
        <div className="my-[1.5rem]">
          <Skeleton paragraph={{ rows: 0}} active />
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-8 bg-white rounded-lg p-[1rem]">
          {/* Left Column */}
          <div className="w-full md:w-[55%] p-6">
            {/* Main Product Image Placeholder */}
            <div className="w-[80%] mx-auto my-8">
              <Skeleton.Input active size="large" style={{ width: 650, height: 300 }} />
            </div>

            {/* Thumbnail Images */}
            <div className="flex items-center justify-center my-8 space-x-4">
              {[...Array(4)].map((_, index) => (
                <Skeleton.Button key={index} active style={{ width: 60, height: 60 }} />
              ))}
            </div>

            {/* Product Info */}
            <div>
              <Skeleton.Input active size="large" style={{ width: 200, height: 25, marginBottom: 16 }} />
              <Skeleton paragraph={{ rows: 4 }} active />
              <Skeleton.Button active size="small" style={{ width: 150, marginTop: 16 }} />
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-[45%] mx-auto text-xl">
            {/* Product Title */}
            <Skeleton.Input active size="large" style={{ width: "70%", height: 35, marginBottom: 16 }} />

            {/* Price Section */}
            <Skeleton paragraph={{ rows: 2 }} active />

            {/* Storage Variant Buttons */}
            <div className="flex gap-4 mb-6">
              {[...Array(3)].map((_, index) => (
                <Skeleton.Button key={index} active style={{ width: 100, height: 40 }} />
              ))}
            </div>

            {/* Color Selection */}
            <Skeleton.Input active size="small" style={{ width: "50%", marginBottom: 16 }} />
            <div className="flex flex-wrap gap-4 mt-4">
              {[...Array(3)].map((_, index) => (
                <Skeleton.Button key={index} active style={{ width: 100, height: 40 }} />
              ))}
            </div>

            {/* Delivery & Warranty Info */}
            <Skeleton paragraph={{ rows: 3 }} active />

            {/* Promotions Section */}
            <Skeleton paragraph={{ rows: 3 }} active />

            {/* Technical Specifications */}
            <div className="w-[100%] mt-10">
              <Skeleton.Input active size="large" style={{ width: 250, marginBottom: 16 }} />
              <Skeleton paragraph={{ rows: 4 }} active />
            </div>

            {/* Cart and Buy Now Buttons */}
            <div className="flex gap-4 mt-4">
              <Skeleton.Button active style={{ width: "45%", height: 60 }} />
              <Skeleton.Button active style={{ width: "45%", height: 60 }} />
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-10">
          <Skeleton.Input active size="large" style={{ width: 300, marginBottom: 16 }} />
          <Skeleton paragraph={{ rows: 3 }} active />
        </div>
      </div>
    </Container>
  );
}

export default LoadingDetailProduct;