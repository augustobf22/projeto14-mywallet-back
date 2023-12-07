import httpStatus from "http-status";

export default function errorHandler(error, req, res, next) {
    switch (error.type) {
        case "joiError":
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);
        case "notFound":
            return res.status(httpStatus.NOT_FOUND).send(error.message);
        case "conflict": 
            return res.status(httpStatus.CONFLICT).send(error.message);
        case "unprocessable": 
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);
        case "badRequest": 
            return res.status(httpStatus.BAD_REQUEST).send(error.message);
        default:
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Unknown error.");
    }
}