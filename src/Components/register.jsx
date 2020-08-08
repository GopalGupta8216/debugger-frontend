import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";
import LocalStorageService from "./token";
//import router from "./router/router";

const localStorageService = LocalStorageService.getService();

// axios.interceptors.request.use(
//   (config) => {
//     const token = localStorageService.getAccessToken();
//     if (token) {
//       config.headers["Authorization"] = "Bearer " + token;
//     }
//     // config.headers['Content-Type'] = 'application/json';
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );

// //Add a response interceptor

// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   function (error) {
//     const originalRequest = error.config;

//     if (
//       error.response.status === 401 &&
//       originalRequest.url === "http://127.0.0.1:8000/debugger/api/refresh/"
//     ) {
//       window.location.href = "http://localhost:3000/login/";
//       //router.push("/login");
//       return Promise.reject(error);
//     }

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = localStorageService.getRefreshToken();
//       return axios
//         .post("http://127.0.0.1:8000/debugger/api/refresh/", {
//           refresh_token: refreshToken,
//         })
//         .then((res) => {
//           if (res.status === 201) {
//             localStorageService.setToken(res.data);
//             axios.defaults.headers.common["Authorization"] =
//               "Bearer " + localStorageService.getAccessToken();
//             return axios(originalRequest);
//           }
//         });
//     }
//     return Promise.reject(error);
//   }
// );

class Register extends Component {
  componentDidMount() {
    let code = queryString.parse(this.props.location.search).code;
    axios
      .post(`http://127.0.0.1:8000/debugger/oauth/`, { code })
      .then((res) => {
        console.log(res.data);
        localStorageService.setToken(res.data);
        window.location.href = "http://localhost:3000/home/";
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return <h1>Hello</h1>;
  }
}

export default Register;
