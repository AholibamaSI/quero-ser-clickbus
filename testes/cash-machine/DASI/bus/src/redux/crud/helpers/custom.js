import config from '../../../config';
import { getHeaders } from '../../../helpers/utility';
import axios from 'axios';

/**
 * Custom request to an endpoint
 */
export default ({ endpoint, method, paramsName, object }) => {
  // Verificar los objectos undefined
  
  if(method === 'POST'){

    let url = '';
    if(typeof(object.page) !== "undefined"){
      url = `${config.apiUrl}/${endpoint}?page=${object.page}`
    }else{
      url = `${config.apiUrl}/${endpoint}`
    }
    
    const body = {
      [paramsName]: {
        ...object
      }
    }
    return fetch (url, {
      method: method,
      headers: getHeaders(),
      body: JSON.stringify(body)
    });

  }else{

    let url = '';
    url = `${config.apiUrl}/${endpoint}?${Object.keys(object)[0]}=${Object.values(object)[0]}`;
    if (Object.entries(object).length > 1) {
        Object.entries(object).forEach(([key, value], index) => {
          if (index > 0) {
            url += `&${Object.keys(object)[index]}=${Object.values(object)[index]}`
          }
        });
      }
    return fetch(url, {
      method,
      headers: getHeaders(),
    });

  }

}
