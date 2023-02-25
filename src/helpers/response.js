const response = async (
  res,
  message,
  code = 200,
  data = [],
  metadata = undefined,
  status = 'success',
  errors = undefined,
) => {
  const response = {
    code,
    status,
    message,
    metadata,
    data,
    errors,
  };
  return res.json(response);
};

const resHelper = {
  response,
};

module.exports = resHelper;
