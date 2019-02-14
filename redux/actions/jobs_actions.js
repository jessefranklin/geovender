import axois from 'axios';
import { Location } from 'expo';
import qs from 'qs';
 
const JOB_ROOT_URL = 'https://authenticjobs.com/api/?';
const JOB_QUERY_PARAMS = {
  api_key:'bd30dde2e8c818a9792851aef058eeae',
  method: 'aj.jobs.search',
  perpage: '10',
  format: 'json',
};
 
const buildJobsUrl = (zip) => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS})
  return `${JOB_ROOT_URL}${query}`;
};
 
export const fetchJobs = (region) => async (dispatch) => {
  try {
    let zip = await Location.reverseGeocodeAsync(region);
    const url = buildJobsUrl(zip);
    let data = await fetch(url);
    // dispatch({ type: 'FETCH_JOBS', payload: data });
  } catch(e) {
    console.error(e);
  }
};