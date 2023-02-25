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
    return resHelper.response(res, 'Jobs List.', 200, response);
  } catch (error) {
    console.log(error);
    return resHelper.response(res, error.message, 400, [], [], 'failed');
  }
};

const getJobDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await jobService.getJobDetail(id);
    return resHelper.response(res, 'Jobs Details.', 200, response);
  } catch (error) {
    console.log(error);
    return resHelper.response(res, error.message, 400, [], [], 'failed');
  }
};

module.exports = {
  getDataJob,
  getJobDetail,
};
