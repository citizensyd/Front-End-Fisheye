// get id of photographer
export const getIdFromUrl = () => {
  return parseInt(new URLSearchParams(window.location.search).get("id"));
};
