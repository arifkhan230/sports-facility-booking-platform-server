import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";

const createFacilityIntoDB = async (payload: TFacility) => {
  const result = await Facility.create(payload);
  return result;
};

const getAllFacilityFromDB = async () => {
  const result = await Facility.find({ isDeleted: false });
  return result;
};

const updateFacilityIntoDB = async (
  id: string,
  payload: Partial<TFacility>
) => {
  const isFacilityExists = await Facility.findById(id);

  if (!isFacilityExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Facility not found");
  }

  if (isFacilityExists?.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "This facility has been deleted");
  }

  const result = await Facility.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteFacilityFromDB = async (id: string) => {
  const facility = await Facility.findById(id);

  if (!facility) {
    throw new AppError(httpStatus.NOT_FOUND, "Facility not found");
  }

  const result = await Facility.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true }
  );
  return result;
};

export const FacilityServices = {
  createFacilityIntoDB,
  getAllFacilityFromDB,
  updateFacilityIntoDB,
  deleteFacilityFromDB,
};
