const { ajv } = require("./initializeValidator");
const betterAjvErrors = require("better-ajv-errors").default;

module.exports = async function schemaValidator(schema, JSON) {
  const validate = ajv.getSchema(schema);
  const valid = validate(JSON);
  if (!valid) {
    const errors = betterAjvErrors(validate.schema, JSON, validate.errors);
    return { result: "Invalid", errors: errors };
  }
  return { result: "Valid" };
};
