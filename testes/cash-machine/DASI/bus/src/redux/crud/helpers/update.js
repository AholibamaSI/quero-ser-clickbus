import config from '../../../config';
import { getHeaders } from '../../../helpers/utility';

export default (resource, paramsName, object, endpoint) => {
  let url = `${config.apiUrl}/${resource}/${object.id}`;
  if (endpoint) url += `/${endpoint}`;
  const body = {
    [paramsName]: {
      ...object
    }
  }

  return fetch (url, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(body)
  })
};