export default async (init, options = null) => {
  const response = await fetch(init, options);
  if (!response.ok) {
    throw new Error(`Response not ok ${response.statusText}`);
  }
  return response.json();
};
