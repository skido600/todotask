const HandleError = (err, _req, res, _next) => {
  console.log(err.stack);
  res.status(500).json({
    status: 500,
    message: "somethinh went wrong",
    error: err.message,
  });
};

export default HandleError;
