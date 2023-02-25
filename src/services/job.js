const axios = require('axios');
const CustomErrors = require('../exceptions/exceptions');
require('dotenv').config();

const getDataJob = async (
  search = '',
  fulltime = 'false',
  location = '',
  page = '1',
) => {
  try {
    const url = process.env.URL_DATA + '.json';
    const totalData = 18;
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
      location,
      full_time: fulltime === 'true',
    };
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

const getJobDetail = async (id) => {
  try {
    let url = process.env.URL_DATA + `/${id}`;
    let data;
    await axios
      .get(url)
      .then((response) => {
        const tmpData = response.data;
        if (JSON.stringify(tmpData) === '{}')
          throw new CustomErrors('Invalid Id.');
        data = tmpData;
      })
      .catch((error) => {
        throw new Error(error);
      });
    return data;
  } catch (err) {
    console.log(err);
    throw new CustomErrors(err.message);
  }
};

module.exports = { getDataJob, getJobDetail };
