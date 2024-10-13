import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { AsyncHandeller } from "../utils/AsyncHandeller.utils.js";

const uploadattenndance = AsyncHandeller(async (req, res) => {
  try {
    const { present } = req.body;
    console.log(present);
    return res
      .status(200)
      .json(new ApiResponse(200, "attendance get successful"));
  } catch (error) {
    console.log(`error := ${error}`);
    return res.status(500).send(new ApiResponse(500, "something went wrong"));
  }
});


export{
    uploadattenndance
}