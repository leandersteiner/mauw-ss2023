import axios from 'axios';

function getHeaders() {
  return {
    accept: 'application/json'
    // authorization: `Bearer ${getStoredAuthToken()}`
  };
}

function postHeaders() {
  return {
    'content-type': 'application/json'
    // authorization: `Bearer ${getStoredAuthToken()}`
  };
}

export async function getRequest<T>(url: string): Promise<T> {
  try {
    const response = await axios.get(url, { headers: getHeaders() });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Unexpected error');
    }
  }
}

export async function postRequest<T>(url: string, data: JSON): Promise<T> {
  try {
    const response = await axios.post(url, data, { headers: postHeaders() });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Unexpected error');
    }
  }
}
