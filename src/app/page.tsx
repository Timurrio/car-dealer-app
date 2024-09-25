import React, { Suspense } from 'react';
import VehicleSelector from '../components/VehicleSelector/VehicleSelector';

export default function Filter() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col bg-gray-800 text-gray-200 rounded-md w-screen md:w-1/2 my-8 mx-1 p-7 ">
        <h1 className="text-center text-4xl py-10">SELECT YOUR VEHICLE!</h1>
        <Suspense fallback={<div className="text-gray-200">Loading...</div>}>
          <VehicleSelector />
        </Suspense>
      </div>
    </div>
  );
}
