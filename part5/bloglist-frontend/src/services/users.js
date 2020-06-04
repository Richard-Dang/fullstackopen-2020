import blogApi from "../services/blogApi";

const getAll = async () => {
  try {
    const response = await blogApi.get("/users");
    return response.data;
  } catch (err) {
    console.log("err.response.data", err.response.data);
  }
};

export default { getAll };
