import axios from "axios";
import { baseUrl } from "../routes/routeNames";

export class Apiservice {
  static getLists = async (apiname) => {
    return await axios.get(baseUrl + apiname).then((response) => {
      return response.data;
    });
  };

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

  static addZone = async (apiname, addZone) => {
    return await axios
      .post(baseUrl + apiname, { zoneName: addZone })
      .then((response) => {
        return response.data;
      });
  };

  static addSection = async (apiname, addSection) => {
    return await axios
      .post(baseUrl + apiname, { section: addSection })
      .then((response) => {
        return response.data;
      });
  };

  static addLocation = async (apiname, addLocation) => {
    return await axios
      .post(baseUrl + apiname, { location: addLocation })
      .then((response) => {
        return response.data;
      });
  };

  static addSwitchBox = async (
    apiname,
    zoneid,
    sectionid,
    locationid,
    lights,
    fans,
    sockets,
    usbs
  ) => {
    return await axios
      .post(baseUrl + apiname, {
        zoneId: zoneid,
        sectionId: sectionid,
        locationId: locationid,
        noOfLights: lights,
        noOfFans: fans,
        noOfSockets: sockets,
        noOfUSBS: usbs,
      })
      .then((response) => {
        return response.data;
      });
  };

  static addLines = async (apiname, descObj) => {
    return await axios.post(baseUrl + apiname, descObj).then((response) => {
      return response;
    });
  };
}
