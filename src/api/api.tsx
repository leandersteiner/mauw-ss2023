import axios from 'axios';

function headers() {
  return {
    'content-type': 'application/json'
    // authorization: `Bearer ${getStoredAuthToken()}`
  };
}

function handleError(error: Error | unknown): Error {
  if (error instanceof Error) {
    return new Error(error.message);
  }
  return new Error('Unexpected error');
}

export async function getRequest<ResponseType>(url: string): Promise<ResponseType> {
  try {
    return (await axios.get(url, { headers: headers() })).data;
  } catch (error) {
    throw handleError(error);
  }
}

export async function deleteRequest<ResponseType>(url: string): Promise<ResponseType> {
  try {
    return (await axios.delete(url, { headers: headers() })).data;
  } catch (error) {
    throw handleError(error);
  }
}

export async function postRequest<ResponseType, RequestType>(
  url: string,
  data: RequestType
): Promise<ResponseType> {
  try {
    return (await axios.post(url, JSON.stringify(data), { headers: headers() })).data;
  } catch (error) {
    throw handleError(error);
  }
}

export async function putRequest<ResponseType, RequestType>(
  url: string,
  data: RequestType
): Promise<ResponseType> {
  try {
    return (await axios.put(url, JSON.stringify(data), { headers: headers() })).data;
  } catch (error) {
    throw handleError(error);
  }
}

export async function patchRequest<ResponseType, RequestType>(
  url: string,
  data: RequestType
): Promise<ResponseType> {
  try {
    return (await axios.patch(url, JSON.stringify(data), { headers: headers() })).data;
  } catch (error) {
    throw handleError(error);
  }
}
