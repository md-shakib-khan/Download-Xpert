const serverRunning = (req, res, next) => {
  try {
    return res
      .status(200)
      .json({ success: true, message: "Server is running" });
  } catch (err) {
    next(err);
  }
};

const healthCheck = (req, res, next) => {
  try {
    return res
      .status(200)
      .json({ success: true, message: "Server is healthy" });
  } catch (err) {
    next(err);
  }
};

module.exports = { serverRunning, healthCheck };
