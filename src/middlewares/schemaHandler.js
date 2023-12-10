import httpStatus from "http-status";

export function validateSchemaMiddleware(schema) {
  return (req, res, next) => {
    const validation = schema.validate(req.body);
    if (validation.error) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ error: validation.error.message });
    }

    next();
  };
}