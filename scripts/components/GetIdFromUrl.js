// get id of photographer
const getIdFromUrl = () => {
  return parseInt(new URLSearchParams(window.location.search).get("id"));
};

export { getIdFromUrl };
