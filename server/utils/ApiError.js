class ApiError extends Error {
    constructor(
        statusCode,
        message,
        errors = [],
        stack = ""
    ) {
        super(message)
        this.statusCode = statusCode,
            this.message = message
        this.data = null,
            this.success = true,
            this.errors = errors

        if (stack) {
            this.stack = stack
        }
        else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

module.exports = { ApiError };