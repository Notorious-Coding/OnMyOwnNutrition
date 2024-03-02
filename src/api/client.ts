const API_URL = "https://localhost:32768";

function formatUrl(endpoint: string) {
  return API_URL + "/" + endpoint;
}
export function getHeader() {
  return {
    "Content-Type": "application/json",
  };
}
export async function request(endpoint: string, init: RequestInit) {
  await fetch(formatUrl(endpoint), init);
}
export async function requestBody<T>(endpoint: string, init: RequestInit): Promise<T> {
  const response = await fetch(formatUrl(endpoint), init);
  return (await response.json()) as T;
}

export default interface AsynchronousAction<T> {
  perform: T;
  isPerforming: boolean;
}
