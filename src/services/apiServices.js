import axios from "axios";
import { baseUrl } from "../routes/routeNames";

export class Apiservice {
  static getLists = async (apiname) => {
    return await axios.get(baseUrl + apiname).then((response) => {
      return response.data;
    });
  };
}
