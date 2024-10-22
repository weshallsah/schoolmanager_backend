import { School } from "../models/School.models.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { AsyncHandeller } from "../utils/AsyncHandeller.utils.js";

const Addschool = AsyncHandeller(async (req, res) => {
  try {
    const {
      school,
      address,
      Affiliated,
      state,
      contact,
      AffiliationNo,
      UDiseCode,
      SchoolCode,
      establish,
    } = req.body;
    const isexist = await School.findOne({ school: school });
    if (isexist != null) {
      throw new ApiError(404, "school exist alredy");
    }
    const payload = await School.create({
      school,
      address,
      Affiliated,
      state,
      contact,
      AffiliationNo,
      UDiseCode,
      SchoolCode,
      establish,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, payload, "School added sucessfully"));
  } catch (error) {
    console.log("Error := ", error);
    return res
      .status(error.statusCode )
      .json(new ApiResponse(error.statusCode , error.message));
  }
});

export { Addschool };
