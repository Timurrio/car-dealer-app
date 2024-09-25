import React, { Suspense } from 'react';
import VehicleModel from '../../../types/VehicleModel';
import { fetchVehicleModels } from '@/utils/fetchVehicleModels';

const VehicleModelsComponent = async ({
  make,
  year,
}: {
  make: string;
  year: string;
}) => {
  const models: VehicleModel[] = await fetchVehicleModels(make, year);

  if (!models || models.length === 0) {
    return (
      <div className="flex flex-col items-center bg-gray-800 text-gray-200 rounded-md w-screen md:w-1/2 my-8 mx-1 p-7 ">
        No models found for this make and year.
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center bg-gray-800 text-gray-200 rounded-md w-screen md:w-1/2 my-8 mx-1 p-7 ">
        <h2 className="text-2xl mb-4">
          Vehicle Make:{' '}
          <span className="text-blue-600 font-bold">{models[0].Make_Name}</span>
        </h2>
        <h2 className="text-2xl mb-4">
          Model Year: <span className="text-blue-600 font-bold">{year}</span>
        </h2>

        <ul className="text-center text-xl ">
          {models.map((model) => (
            <li
              key={model.Model_ID}
              className="m-5 py-3 px-10 bg-gray-200 text-gray-800 rounded-md text-xl hover:text-blue-600 hover:scale-125 hover:cursor-pointer transition-all"
            >
              {model.Model_Name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

// Main result page
const ResultPage = ({ params }: { params: { slug: [string, string] } }) => {
  const make = params.slug[0];
  const year = params.slug[1];

  return (
    <div className="flex items-center justify-center">
      <Suspense
        fallback={
          <div className="text-gray-200">Loading vehicle models...</div>
        }
      >
        <VehicleModelsComponent make={make} year={year} />
      </Suspense>
    </div>
  );
};

export async function generateStaticParams() {
  const makesResponse = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + 'getallmakes?format=json'
  );
  const makesData = await makesResponse.json();

  const yearRange = Array.from(
    { length: new Date().getFullYear() - 2015 + 1 },
    (_, i) => 2015 + i
  );

  const paths = [];
  for (const make of makesData.Results) {
    for (const year of yearRange) {
      paths.push({
        make: make.Make_ID,
        year: year.toString(),
      });
    }
  }

  return paths.map((path) => ({
    slug: [path.make.toString(), path.year.toString()],
  }));
}

export default ResultPage;
