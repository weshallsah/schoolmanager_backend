const AsyncHandeller = (reqHandler) => {
  return async (req, res, next) => {
    await Promise.resolve(reqHandler(req, res, next)).catch(err => next(err));
  };
};

export{
    AsyncHandeller
};