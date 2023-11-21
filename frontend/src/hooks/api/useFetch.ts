export const useFetch = (path: string, init?: RequestInit) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const endpoint = `${BASE_URL}${path}`;
  const fetchData = async (
    bearer?: string,
    params?: string
  ): Promise<Response> => {
    // if (bearer !== undefined) {
    //   init = {
    //     ...init,
    //     headers: { ...init?.headers, Authorization: `Bearer ${bearer}` },
    //   };
    // }

    try {
      const response = await fetch(`${endpoint}${params ?? ""}`, init);
      return await Promise.resolve(response);
    } catch (err) {
      return await Promise.reject(err);
    }
  };

  return fetchData;
};
