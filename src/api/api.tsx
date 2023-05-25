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

export async function getRequest<ResponseType>(url: string): Promise<ResponseType> {
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

export async function postRequest<ResponseType, RequestType>(
  url: string,
  data: RequestType
): Promise<ResponseType> {
  try {
    const bodyData = JSON.stringify(data);
    const response = await axios.post(url, bodyData, { headers: postHeaders() });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Unexpected error');
    }
  }
}
