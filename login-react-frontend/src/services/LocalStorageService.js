export const storeToken = (value) => {
  localStorage.setItem("token", JSON.stringify(value));
};

export const getToken = () => {
  let token = localStorage.getItem("token");
  return token;
};

export const removeToken = (value) => {
  localStorage.removeItem(value);
};
