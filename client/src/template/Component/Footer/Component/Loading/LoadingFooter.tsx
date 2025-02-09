import React from 'react';
import { Container } from '../../../../../components/Style/Container';
import { Skeleton } from 'antd';

function LoadingFooter() {
  const listFooter = Array(3).fill({}); // Tạo một mảng placeholder cho các mục footer

  return (
    <div className="w-[100%] m-auto mt-[1.5rem] bg-white">
      {/* Header Section */}
      <div className="bg-[#7500CF] sm:rounded-t-[2rem] md:rounded-none w-[100%] md:h-[6rem] sm:pt-[2rem] md:pt-[0] flex justify-center items-center">
        <Container className="relative md:flex items-center justify-between">
          {/* Logo Skeleton */}
          <Skeleton.Input
            active
            style={{ width: '120px', height: '40px', marginBottom: '1rem' }}
          />
          {/* Subscribe Section Skeleton */}
          <div className="flex sm:text-[1.8rem] md:text-[2rem] text-white sm:gap-[1rem] md:gap-[2rem] items-center sm:justify-center sm:my-[1.5rem] md:my-[0rem]">
            <Skeleton.Avatar active size={40} />
            <Skeleton.Input
              active
              style={{ width: '200px', height: '20px' }}
            />
          </div>
          {/* Input and Button Skeleton */}
          <div className="flex items-center relative sm:top-5 md:top-0 sm:shadow-xl md:shadow-none">
            <Skeleton.Input
              active
              style={{ width: '300px', height: '40px', marginRight: '1rem' }}
            />
            <Skeleton.Button active size="large" style={{ width: '100px' }} />
          </div>
        </Container>
      </div>
      {/* Footer Section */}
      <div className="xl:w-[80%] xmd:w-[90%] sm:w-[95%] m-auto py-[3rem] flex flex-wrap justify-between">
        <div className="lg:w-[25%] xmd:w-[50%] sm:w-[100%]">
          <Skeleton.Input
            active
            style={{ width: '150px', height: '30px', marginBottom: '1.5rem' }}
          />
          <div className="flex gap-[2rem] mt-[1.5rem] mb-[2rem]">
            <Skeleton.Avatar active size={80} />
            <div>
              <Skeleton.Input
                active
                style={{ width: '100px', height: '20px', marginBottom: '0.5rem' }}
              />
              <Skeleton.Input active style={{ width: '100px', height: '20px' }} />
            </div>
          </div>
          <Skeleton.Input
            active
            style={{ width: '150px', height: '20px', marginBottom: '1rem' }}
          />
          <Skeleton.Input
            active
            style={{ width: '300px', height: '40px', marginBottom: '1rem' }}
          />
        </div>
        {/* Map Footer Items */}
        {listFooter.map((_, index) => (
          <div
            className="mt-[1rem] xmd:w-[50%] lg:w-[15%]"
            key={`footer-skeleton-${index}`}
          >
            <Skeleton.Input
              active
              style={{ width: '150px', height: '30px', marginBottom: '1rem' }}
            />
            <div className="mt-[1.9rem]">
              {Array(4)
                .fill({})
                .map((_, idx) => (
                  <Skeleton.Input
                    active
                    key={`desc-skeleton-${index}-${idx}`}
                    style={{ width: '120px', height: '20px', marginBottom: '1rem' }}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
      {/* Footer Bottom Section */}
      <div className="w-[100%] bg-[#E5E5E5] sm:h-[100%] p-[1rem] h-[4rem] flex flex-col justify-center items-center">
        <div className="xl:w-[80%] xmd:w-[90%] sm:w-[95%] m-auto md:flex justify-between items-center">
          <Skeleton.Input active style={{ width: '250px', height: '20px' }} />
          <Skeleton.Input active style={{ width: '200px', height: '20px' }} />
        </div>
      </div>
    </div>
  );
}

export default LoadingFooter;