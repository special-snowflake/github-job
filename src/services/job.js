const axios = require('axios');
const CustomErrors = require('../exceptions/exceptions');

const getDataJob = async (
  search = '',
  fulltime = 'false',
  location = '',
  page = '1',
) => {
  try {
    const totalData = 18;
    const url = 'http://dev3.dansmultipro.co.id/api/recruitment/positions.json';
    const full_time = fulltime === 'true' ? true : undefined;
    const queryParams = {
      description: search,
      location,
      page,
      full_time,
    };

    const params = {
      description: search,
      page,
      full_time: fulltime === 'true',
    };
    console.log(url);
    let data;
    await axios
      .get(url, { params })
      .then((response) => {
        const tmpData = response.data;
        const filteredArr = tmpData.filter(Boolean);
        data = filteredArr;
      })
      .catch((error) => {
        data = [];
        // throw new Error(error);
      });
    return data;
  } catch (err) {
    console.log(err);
    throw new CustomErrors(err.message);
  }
};

module.exports = { getDataJob };
