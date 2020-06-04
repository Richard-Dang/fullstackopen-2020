import blogApi from "../services/blogApi";

const getAll = async () => {
  try {
    const response = await blogApi.get("/blogs");
    return response.data;
  } catch (err) {
    console.log("err.response.data", err.response.data);
  }
};

const createBlog = async (blog) => {
  try {
    const response = await blogApi.post("/blogs", blog);
    return response.data;
  } catch (err) {
    console.log("err.response.data", err.response.data);
  }
};

const updateBlog = async (blog) => {
  try {
    const response = await blogApi.put(`/blogs/${blog.id}`, blog);
    return response.data;
  } catch (err) {
    console.log("err.response.data", err.response.data);
  }
};

const deleteBlog = async (blog) => {
  try {
    const response = await blogApi.delete(`/blogs/${blog.id}`);
    return response.data;
  } catch (err) {
    console.log("err.response.data", err.response.data);
  }
};

  const createComment = async ({ blog, comment }) => {
  try {
    const response = await blogApi.post(`/blogs/${blog.id}/comments/`, comment);
    return response.data;
  } catch (err) {
    console.log("err.response.data", err.response.data);
  }
  };

export default { getAll, createBlog, updateBlog, deleteBlog, createComment };
