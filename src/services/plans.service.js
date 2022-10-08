const Plan = require("../models/plan");
const schemaValidator = require("../utils/schemaValidator/schemaValidator");

const insert = async (data) => {
  const planJson = JSON.parse(data.plan);

  const validationResult = await schemaValidator("plan", planJson);

  if (!(validationResult.result === "Valid")) {
    return {
      status: "Failed",
      statusCode: 400,
      data: validationResult.errors,
    };
  }

  var plan = new Plan({ _id: planJson.objectId, plan: planJson });

  const rec = await Plan.findOne({ _id: planJson.objectId });
  if (!rec) {
    const res = await plan.save();
    if (res) {
      return {
        status: "Success",
        statusCode: 201,
        data: "Plan with ID: " + res._id + " was created",
      };
    } else {
      return {
        status: "Failed",
        statusCode: 500,
        data: "Record cannot be saved",
      };
    }
  } else {
    return {
      status: "Failed",
      statusCode: 409,
      data: "Record already exists",
    };
  }
};

const find = async (data) => {
  const rec = await Plan.findOne({ _id: data.id });
  if (rec) {
    return {
      status: "Success",
      statusCode: 200,
      data: rec,
    };
  } else {
    return {
      status: "Failed",
      statusCode: 404,
      data: "Record cannot be found",
    };
  }
};

const remove = async (data) => {
  const rec = await Plan.findOneAndDelete({ _id: data.id });
  if (rec) {
    return {
      status: "Success",
      statusCode: 204,
      data: "Plan with ID: " + rec._id + " was deleted",
    };
  } else {
    return {
      status: "Failed",
      statusCode: 404,
      data: "Record cannot be found",
    };
  }
};

module.exports = { insert, find, remove };
