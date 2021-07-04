const request = async (path, config, queryString = "") => {
  const url = `${process.env.REACT_APP_API_DOMAIN}${path}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}${queryString}`;
  const res = await fetch(url, config);

  if (res.status >= 500) {
    throw new Error("Server Error!");
  }

  const resolvedData = await res.json();

  if (!res.ok) {
    throw new Error(resolvedData.message);
  }

  return resolvedData.data ? resolvedData.data : resolvedData;
};

export default request;
