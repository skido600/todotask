const HandleResponse = (res, success, statuscode, message, data = null) => {
  res.status(statuscode).json({
    success,
    statuscode,
    message,
    data,
  });
};

export { HandleResponse };
