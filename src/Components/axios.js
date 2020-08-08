import axios from "axios";
import LocalStorageService from "./token";

// import router from "./router/router";

// LocalstorageService
const localStorageService = LocalStorageService.getService();

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorageService.getAccessToken();

    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//Add a response interceptor

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url === "http://127.0.0.1:8000/debugger/api/refresh/"
    ) {
      // router.push("/login");
      window.location.href = "http://127.0.0.1:3000/debugger/login/";
      // return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = localStorageService.getRefreshToken();

      return axios
        .post("http://127.0.0.1:8000/debugger/api/refresh/", {
          refresh: refresh,
        })
        .then((resp) => {
          if (resp.status === 200) {
            //localStorageService.setToken(resp.data);
            localStorage.setItem("access_token", resp.data.access);

            axios.defaults.headers.common["Authorization"] =
              "Bearer " + localStorageService.getAccessToken();

            return axios(originalRequest);
          }
        })
        .catch((err) => console.log(err));
    }
    return Promise.reject(error);
  }
);
