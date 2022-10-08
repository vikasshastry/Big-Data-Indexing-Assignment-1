const database = require("../services");

function formattedRespose(result) {
  return {
    body: {
      status: result.status,
      data: result.data,
      statusCode: result.statusCode,
    },
  };
}

const insert = async (httpRequest) => {
  const result = await database.plans.insert(httpRequest.body);
  return formattedRespose(result);
};

const find = async (httpRequest) => {
  const result = await database.plans.find(httpRequest.params);
  return formattedRespose(result);
};

const remove = async (httpRequest) => {
  const result = await database.plans.remove(httpRequest.params);
  return formattedRespose(result);
};

module.exports = { insert, find, remove };
