const httpStatusMap = {
  SUCCESSFUL: 200,
  BAD_REQUEST: 400,
  CREATED: 201,
  CONFLICT: 409,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  NO_CONTENT: 204,
};

const mapStatusHttp = (status) => httpStatusMap[status] || 500;

module.exports = mapStatusHttp;
