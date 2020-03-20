module.exports = {
  badRequest: () => ({
    statusCode: 400
  }),
  serverError: errorText => ({
    statusCode: 500,
    headers: {
      "Content-Type": "text/text"
    },
    body: errorText
  }),
  success: value => ({
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(value)
  })
};
