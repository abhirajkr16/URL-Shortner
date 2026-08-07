const errorMiddleware = (err, req, res, next) => {
  console.error("========== ERROR ==========");
  console.error("Message:", err.message);
  console.error("Stack:");
  console.error(err.stack);
  console.error("Full Error:");
  console.error(err);
  console.error("===========================");

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorMiddleware;