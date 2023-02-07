import axios from "axios";
import { baseUrl } from "../constants/routePath";

export class Apiservice {
  static login = async (apiname, email, password) => {
    return await axios
      .post(baseUrl + apiname + email + "/" + password)
      .then((response) => {
        return response.data;
      });
  };

  static getLists = async (apiname) => {
    return await axios.get(baseUrl + apiname).then((response) => {
      return response.data;
    });
  };

  // static getListsZoneSection = async (apiname) => {
  //   return await axios.get(bsaeUrlGetList + apiname).then((response) => {
  //     return response.data;
  //   });
  // };

  static updateDeviceRoomName = async (apiname, id, roomid, devicename) => {
    return await axios
      .post(baseUrl + apiname + id, {
        deviceName: devicename,
        sectionId: roomid,
      })
      .then((response) => {
        return response.data;
      });
  };

  static addZoneList = async (apiname, addZone) => {
    return await axios
      .post(baseUrl + apiname, { zoneName: addZone })
      .then((response) => {
        return response.data;
      });
  };

  static addSectionList = async (apiname, addSection) => {
    return await axios
      .post(baseUrl + apiname, { section: addSection })
      .then((response) => {
        return response.data;
      });
  };

  static updateSectionName = async (apiname, id, sectionname) => {
    return await axios
      .post(baseUrl + apiname + id, {
        section: sectionname,
      })
      .then((response) => {
        return response.data;
      });
  };

  static updateZoneName = async (apiname, id, zoneName) => {
    return await axios
      .post(baseUrl + apiname + id, {
        zoneName: zoneName,
      })
      .then((response) => {
        return response.data;
      });
  };

  static deleteZone = async (apiname, id) => {
    return await axios.post(baseUrl + apiname + id).then((response) => {
      return response.data;
    });
  };

  static deleteSection = async (apiname, id) => {
    return await axios.post(baseUrl + apiname + id).then((response) => {
      return response.data;
    });
  };

  static addLines = async (apiname, descObj) => {
    return await axios.post(baseUrl + apiname, descObj).then((response) => {
      return response;
    });
  };
}
