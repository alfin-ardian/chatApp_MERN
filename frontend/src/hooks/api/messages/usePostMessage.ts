import { useFetch } from "..";

export const usePostMessage = async (val: any) => {
  let cookie: string | undefined = "";
  let token: string;
  token = "";
  const addData = useFetch(`/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    body: JSON.stringify(val),
  });

  try {
    const response = await addData(token);
    const jsonData = await response.json();
    return await Promise.resolve(jsonData);
  } catch (err) {
    return await Promise.reject(err);
  }
};
