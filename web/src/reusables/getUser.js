export const getUser = () => {
  let storedUser = sessionStorage.getItem("user");
  return storedUser;
};
