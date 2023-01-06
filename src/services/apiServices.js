import axios from "axios";

const baseUrl = "http://localhost:3004/";

export class Apiservice {
  static getLists = async (apiname) => {
    return await axios.get(baseUrl + apiname).then((response) => {
      return response.data;
    });
  };
}
