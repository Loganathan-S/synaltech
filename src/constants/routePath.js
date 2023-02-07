const base = "/";
//export const baseUrl = "http://localhost:3004/";
export const baseUrl = "http://192.168.1.46:4000/";
// export const bsaeUrlGetList = "http://192.168.1.46:3000/";

export const routeNames = {
  auth: {
    home: base,
    register: base + "register",
  },
  dashboard: base + "dashboard",
  synaltech: base + "synaltech",
  device: base + "device",
  home: base + "home",
  automation: base + "automation",
  settings: base + "settings",
  mapping: base + "mapping",
  switchbox: base + "switchbox",
  zone: base + "zone",
  section: base + "section",
  location: base + "location",
  addnewdevice: base + "addnewdevice",
  sortroom: base + "sortroom",
<<<<<<< HEAD
  addroomzone:base + "addroomzone",
  roomzonelist:base+"roomzonelist"
=======
  addroomzone: base + "addroomzone",
  roomzonelist: base + "roomzonelist",
>>>>>>> 8577b7ca12c386ba098acd8419344f7abb331479
};

export const apiNames = {
  login: "login/",
  mapping: "mapping",
  switchBoxLists: "switchBoxList",
  newSwitchBox: "newSwitchBox",
  newDeviceLists: "newDeviceList",
  deviceLists: "deviceList",
  updateDevice: "updateDevice/",
  newZone: "newZone",
  newSection: "newSection",
  locationLists: "locationList",
  newLocation: "newLocation",
  lines: "device/line/",
<<<<<<< HEAD

  sectionlists: "sectionList",
  zonelists: "zoneList",
  updatesection:"updateSection/",
  deletesection:"deleteSection/",
  updatezone:"updateZone/",
  deletezone:"deleteZone/",
=======
  sectionlists: "sectionList",
  zonelists: "zoneList",
  updatesection: "updateSection/",
  deletesection: "deleteSection/",
  updatezone: "updateZone/",
  deletezone: "deleteZone/",
>>>>>>> 8577b7ca12c386ba098acd8419344f7abb331479
};
