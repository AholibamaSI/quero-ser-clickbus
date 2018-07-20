import config from '../../../config';
import { getHeaders } from '../../../helpers/utility';

export default (resource, page, optionalParams) => {
  if (page) {} else { page = 1 }
  let url = `${config.apiUrl}/${resource}?page=${page}`;
  for (let key in optionalParams) {
    url += `&${key}=${optionalParams[key]}`;
  }

  return fetch(url, {
    method: 'GET',
    headers: getHeaders()
  })
};
