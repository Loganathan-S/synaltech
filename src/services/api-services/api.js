import axios from "axios";

const API_URL = "http://localhost:3000/";

export const Posts = async () => {
  return await axios.get(API_URL).then((response) => {
    return response.data;
  });
};
