import VehicleModel from '../types/VehicleModel';

export const fetchVehicleModels = async (
  make: string,
  year: string
): Promise<VehicleModel[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}GetModelsForMakeIdYear/makeId/${make}/modelyear/${year}?format=json`
  );
  const data = await res.json();
  return data.Results;
};
