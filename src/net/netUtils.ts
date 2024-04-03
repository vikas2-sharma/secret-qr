import { ApiResponse } from "../../apiutils/definitions";

export function fetchJson(url: string, body: Object) {
  return new Promise<any>((resolve, reject) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(body),
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("from utils R: ", result);
        resolve(result);
      })
      .catch((error) => {
        console.error("from utils E: ", error);
        reject(error);
      });
  });
}
