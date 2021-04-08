const HANDLE_ERRORS = {
  CastError: res =>
    res.status(400).send({
      error: 'id used is malformed'
    }),
  JsonWenTokenError: res =>
    res.status(401).json({
      error: 'token missing or invalid'
    }),
  ValidationError: (res, { message }) =>
    res.status(409).send({
      error: message
    }),
  TokenExpiredError: res =>
    res.status(401).json({
      error: 'token expired'
    }),
  defaultError: res =>
    res.status(500).end()
}

module.exports = (error, request, response, next) => {
  const handler =
    HANDLE_ERRORS[error.name] || HANDLE_ERRORS.defaultError

  handler(response, error)
}
