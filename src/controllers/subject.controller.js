import { Subject } from "../models/subject.models.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { AsyncHandeller } from "../utils/AsyncHandeller.utils.js";

const subjectAdd = AsyncHandeller(async (req, res) => {
  try {
    const standard = req.params.STD;
    const { subjects } = req.body;
    const sub = await Subject.findOne({ standard: standard });
    // console.log(sub);
    let payload;
    if (sub == null) {
      payload = await Subject.create({
        standard,
        subjects,
      });
    } else {
      payload = await Subject.findOneAndUpdate(
        { standard: standard },
        { subjects: subjects }
      );
    }

    return res
      .status(200)
      .json(new ApiResponse(200, payload, "subjectsadded successfully"));
  } catch (error) {
    return res
      .status(error.statuscode)
      .json(new ApiResponse(error.statuscode, error.message));
  }
});

const listsubjet = AsyncHandeller(async (req, res) => {
  try {
    const standard = req.params.STD;
    const payload = await Subject.findOne({ standard: standard });
    return res
      .status(200)
      .json(new ApiResponse(200, payload, "subjectsadded successfully"));
  } catch (error) {
    return res
      .status(error.statuscode)
      .json(new ApiResponse(error.statuscode, error.message));
  }
});

export { subjectAdd, listsubjet };
