"use client"
import React, { useEffect, useState } from 'react';
import VehicleMake from '@/types/VehicleMake';
import Link from 'next/link';

const VehicleSelector = () => {
  const [makes, setMakes] = useState<VehicleMake[]>([]); 
  const [selectedMake, setSelectedMake] = useState(''); 
  const [selectedYear, setSelectedYear] = useState('');
  
  const currentYear = new Date().getFullYear(); 
  const modelYears = Array.from({ length: currentYear - 2015 + 1 }, (_, i) => 2015 + i);


  useEffect(() => {
    const fetchVehicleMakes = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}GetMakesForVehicleType/car?format=json`
        );
        const data = await response.json();
        setMakes(data.Results);
      } catch (error) {
        console.error('Error fetching vehicle makes:', error);
      }
    };

    fetchVehicleMakes();
  }, []);

  const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement> ) => {
    setSelectedMake(e.target.value);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };


  return (
    <div className='text-xl'>
    
      <div className="flex flex-col text-gray-200">
        <label htmlFor="makes">Select Vehicle Make:</label>
        <select className="text-gray-800 bg-gray-200 m-4 h-10" id="makes" value={selectedMake} onChange={handleMakeChange}>
          <option value="">Select Make</option>
          {makes.map((make) => (
            <option key={make.MakeId}  value={make.MakeId}>
              {make.MakeName}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col text-gray-200">
        <label htmlFor="years">Select Model Year:</label>
        <select className="text-gray-800 bg-gray-200 m-4 h-10" id="years" value={selectedYear} onChange={handleYearChange}>
          <option  value="">Select Year</option>
          {modelYears.map((year) => (
            <option  key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
 

    <div className='mt-10'>
        <Link 
          href={`/result/${selectedMake}/${selectedYear}`} 
        >
          <button 
            className={`px-4 py-2 text-white rounded-md ${selectedMake && selectedYear ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`} 
            disabled={!selectedMake || !selectedYear} 
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VehicleSelector;
