export default async function fetchApi(url, query = {}, method = "POST") {
  try {
    let options = {
      method,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `${
          process.env.NEXT_PUBLIC_APP_URL || "*"
        }`,
      },
    };

    if (method !== "GET") {
      options["body"] = JSON.stringify(query);
    }

    let response = await fetch(url, options);

    const answer = {
      status: response.status,
    };
    const parsedData = await response.json();
    answer.data = parsedData;
    return answer;
  } catch (err) {
    console.warn("A ferchAPI Error", err.message);
    throw new Error(err);
  }
}
