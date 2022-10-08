const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

if (process.env.NODE_ENV) {
  dotenv.config({
    path: path.join(__dirname, "../../.env." + process.env.NODE_ENV),
  });
} else {
  dotenv.config({ path: path.join(__dirname, "../../.env") });
}

const envVarsSchema = Joi.object()
  .keys({
    //Environment
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),

    //Server Port
    PORT: Joi.number().default(3000),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
};
