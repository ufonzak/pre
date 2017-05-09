function ApiError(message, meta) {
  this.name = 'ApiError';
  this.message = message;
  this.stack = (new Error()).stack;
  this.meta = meta;
}
ApiError.prototype = new Error; // eslint-disable-line new-parens

const checkResponse = (response) => {
  if (!response.ok) {
    throw new ApiError(`Response not ok ${response.statusText}`, { code: response.status });
  }
};

const myFetch = async (init, options = null) => {
  const response = await fetch(init, options);
  checkResponse(response);
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
  checkResponse(response);
  return response.text();
};

module.exports = { fetch: myFetch, post: myPost, ApiError };


