const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(handleInternalError(error));
    }
  };

  return func;
};

function handleInternalError(error) {
  console.error(error.message);
  return new Error("Internal server error");
}

module.exports = ctrlWrapper;
