import { useFetch } from "..";

export const usePostUser = async (val: any) => {
  let cookie: string | undefined = "";
  let token: string;
  token = "";
  const addData = useFetch(`/join`, {
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
    console.log(jsonData, "jsonData");
    if (jsonData.error) return await Promise.reject(jsonData);
    return await Promise.resolve(jsonData);
  } catch (err) {
    return await Promise.reject(err);
  }
};
