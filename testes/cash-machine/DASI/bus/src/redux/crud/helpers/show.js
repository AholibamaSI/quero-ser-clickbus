import config from '../../../config';
import { getHeaders } from '../../../helpers/utility';

export default (resource, object, optionalParams) => {  
  let url = `${config.apiUrl}/${resource}/${object.id}`;
  let firstParam = true;
  for (let key in optionalParams) {
    if (firstParam) {
      url += '?';
      firstParam = false;
    }
    url += `&${key}=${optionalParams[key]}`;
  }

  return fetch (url, {
    method: 'GET',
    headers: getHeaders()
  });
}