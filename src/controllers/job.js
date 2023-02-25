const jobService = require('../services/job');
const resHelper = require('../helpers/response');

const getDataJob = async (req, res) => {
  try {
    const { search, fulltime, location, page } = req.query;
    const response = await jobService.getDataJob(
      search,
      fulltime,
      location,
      page,
    );
    // console.log(response);
    return resHelper.response(res, 'Jobs.', 200, response);
  } catch (error) {
    console.log(error);
    return resHelper.response(res, error.message, 400);
  }
};

module.exports = {
  getDataJob,
};
