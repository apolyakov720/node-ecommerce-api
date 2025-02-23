const errorLogger = (error, _, response, next) => {
  console.error(error);

  response.status(500);

  next();
};

export { errorLogger };
