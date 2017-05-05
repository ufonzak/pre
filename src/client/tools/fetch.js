const myFetch = async (init, options = null) => {
  const response = await fetch(init, options);
  if (!response.ok) {
    throw new Error(`Response not ok ${response.statusText}`);
  }
  return response.json();
};

const myPost = async (init, data) => {
  const response = await fetch(init, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });
  if (!response.ok) {
    throw new Error(`Response not ok ${response.statusText}`);
  }
  return response.text();
};

module.exports = { fetch: myFetch, post: myPost };
