const errorMiddleware = (err, req, res, _next) => {
  console.error(err);

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ');

    return res.status(400).json({
      success: false,
      message
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid resource identifier.'
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'A resource with the same unique value already exists.'
    });
  }

  const statusCode = err.statusCode || 500;
  const message = statusCode >= 500 ? 'Internal server error.' : err.message;

  return res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && statusCode >= 500
      ? { debug: err.message }
      : {})
  });
};

export default errorMiddleware;
