const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const planSchema = require("./schemas/plan.json");

const ajv = (exports.ajv = new Ajv({ allErrors: true }));
addFormats(ajv);

//Initialize all schemas
ajv.addSchema(planSchema, "plan");
