import config from '../../../config';
import { getHeaders } from '../../../helpers/utility';

export default (resource, paramsName, object) => {
  const url = `${config.apiUrl}/${resource}`;
  const body = {
    [paramsName]: {
      ...object
    }
  };

  return fetch (url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body)
  })
}