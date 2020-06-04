import axios from "axios";

const blogApi = axios.create({ baseURL: "http://localhost:3001/api" });

blogApi.interceptors.request.use(
  (config) => {
    const loggedInUserJSON = window.localStorage.getItem("loggedInBlogUser");
    if (loggedInUserJSON) {
      const token = JSON.parse(loggedInUserJSON).token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default blogApi;
