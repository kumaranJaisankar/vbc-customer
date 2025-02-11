import Cookies from "js-cookie";
export const getSession = () => {
  const jwt = Cookies.get("__session");
  let session;
  try {
    if (jwt) {
      const base64Url = jwt.split(".")[1];
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      // what is window.atob ?
      // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/atob
      session = JSON.parse(window.atob(base64));
    }
  } catch (error) {
    console.log(error);
  }
  console.log(session);
  return session;
};

export const getCurrentUserSession = () => {
  const jwt = JSON.parse(localStorage.getItem("token"));
  let session;
  try {
    if (jwt) {
      const base64Url = jwt.access.split(".")[1];
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      session = window.atob(base64);
    }
  } catch (error) {
    console.log(error);
  }
  console.log(session);
  return session;
  // return true;
};

export const logOut = () => {
  Cookies.remove("__session");
  localStorage.removeItem("token");
};
