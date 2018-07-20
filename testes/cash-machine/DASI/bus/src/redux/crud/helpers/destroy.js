import config from '../../../config';
import { getHeaders } from '../../../helpers/utility';

export default (resource, object) => {
  const url = `${config.apiUrl}/${resource}/${object.id}`;

  return fetch (url, {
    method: 'DELETE',
    headers: getHeaders()
  })
};