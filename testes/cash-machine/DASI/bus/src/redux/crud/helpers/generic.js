import config from '../../../config';
import { getHeaders } from '../../../helpers/utility';

/**
 * Generic request to an endpoint
 */
export default ({ endpoint, optionalParams, method, page }) => {  
  let url = `${config.apiUrl}/${endpoint}`;
  if (page) {
    url += `?page=${page}`;
  }
  let body = null;
  if (optionalParams) body = JSON.stringify(optionalParams);

  return fetch(url, {
    method,
    headers: getHeaders(),
    body
  });
}
