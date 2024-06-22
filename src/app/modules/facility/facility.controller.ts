import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FacilityServices } from "./facility.service";

// creating new facility
const createFacility = catchAsync(async (req, res) => {
  const result = await FacilityServices.createFacilityIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Facility added successfully",
    data: result,
  });
});

// getting all facility
const getAllFacility = catchAsync(async (req, res) => {
  const result = await FacilityServices.getAllFacilityFromDB();

  sendResponse(res, {
    success: result?.length ? true : false,
    statusCode: result?.length ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: result?.length
      ? "Facilities retrieved successfully"
      : "No Data Found",
    data: result?.length ? result : [],
  });
});

// updating facility
const updateFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacilityServices.updateFacilityIntoDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Facility updated successfully",
    data: result,
  });
});

// deleting facility
const deleteFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacilityServices.deleteFacilityFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Facility deleted successfully",
    data: result,
  });
});

export const FacilityController = {
  createFacility,
  getAllFacility,
  updateFacility,
  deleteFacility,
};
