export const api = async (
  endpoint: string,
  options?: RequestInit
): Promise<Response> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    throw new Error("Base URL is not defined in the environment variables.");
  }

  // Ensure the base URL ends with a slash and the endpoint doesn't start with one
  const url = `${baseUrl.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response;
};
