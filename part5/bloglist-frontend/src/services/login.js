import blogApi from "../services/blogApi";

const login = async (credentials) => {
  try {
    const response = await blogApi.post("/login", credentials);
    return response.data;
  } catch (err) {
    console.log("err.response.data", err.response.data);
  }
};

export default { login };
