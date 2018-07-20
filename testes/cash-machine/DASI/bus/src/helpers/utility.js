import { Map } from 'immutable';


export function getToken() {
  try {
    const idToken = localStorage.getItem('id_token');
    return new Map({ idToken });
  } catch (err) {
    clearToken();
    return new Map();
  }
}

export function clearStorage() {
  localStorage.removeItem('username');
}

export function clearToken() {
  localStorage.removeItem('id_token');
}

export function clearHeaders() {
  localStorage.removeItem('client');
  localStorage.removeItem('token-type');
  localStorage.removeItem('uid');
  localStorage.removeItem('expiry');
}

export function getGenericHeaders(){
  try {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
    return headers;
  } catch (err) {
    clearHeaders();
    return new Map();
  }
}

export function getHeaders() {  
  try {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': `${localStorage.getItem('id_token')}`,
      'client': `${localStorage.getItem('client')}`,
      'token-type': `${localStorage.getItem('token-type')}`,
      'uid': `${localStorage.getItem('uid')}`,
      'expiry': `${localStorage.getItem('expiry')}`,
    }
    return headers;
  } catch (err) {
    clearHeaders();
    return new Map();
  }
}

export function setHeaders(headers) {
  localStorage.setItem('id_token', headers.get('access-token'));
  localStorage.setItem('client', headers.get('client'));
  localStorage.setItem('expiry', headers.get('expiry'));
  localStorage.setItem('token-type', headers.get('token-type'));
  localStorage.setItem('uid', headers.get('uid'));
}

export function timeDifference(givenTime) {
  givenTime = new Date(givenTime);
  const milliseconds = new Date().getTime() - givenTime.getTime();
  const numberEnding = number => {
    return number > 1 ? 's' : '';
  };
  const number = num => num > 9 ? '' + num : '0' + num;
  const getTime = () => {
    let temp = Math.floor(milliseconds / 1000);
    const years = Math.floor(temp / 31536000);
    if (years) {
      const month = number(givenTime.getUTCMonth() + 1);
      const day = number(givenTime.getUTCDate());
      const year = givenTime.getUTCFullYear() % 100;
      return `${day}-${month}-${year}`;
    }
    const days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
      if (days < 28) {
        return days + ' day' + numberEnding(days);
      } else {
        const months = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];
        const month = months[givenTime.getUTCMonth()];
        const day = number(givenTime.getUTCDate());
        return `${day} ${month}`;
      }
    }
    const hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
      return `${hours} hour${numberEnding(hours)} ago`;
    }
    const minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
      return `${minutes} minute${numberEnding(minutes)} ago`;
    }
    return 'a few seconds ago';
  };
  return getTime();
}
