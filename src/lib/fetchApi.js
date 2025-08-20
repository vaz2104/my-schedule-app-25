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

    if (response.status !== 200) {
      console.log(await response.json());
      return null;
    }

    return await response.json();
  } catch (err) {
    console.warn("A ferchAPI Error", err.message);
    throw new Error(err);
  }
}
