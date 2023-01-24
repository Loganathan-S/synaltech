const base = "/";
//export const baseUrl = "http://localhost:3004/";
export const baseUrl = "http://192.168.1.46:4000/";

export const routeNames = {
  auth: {
    login: base,
    register: base + "register",
  },
  dashboard: base + "dashboard",
  synaltech: base + "synaltech",
  device: base + "device",
  settings: base + "settings",
  mapping: base + "mapping",
  switchbox: base + "switchbox",
  zone: base + "zone",
  section: base + "section",
  location: base + "location",
};

export const apiNames = {
  mapping: "mapping",
  switchBoxLists: "switchBoxList",
  newSwitchBox: "newSwitchBox",
  newDeviceLists: "newDeviceList",
  deviceLists: "deviceList",
  zoneLists: "zoneList",
  newZone: "newZone",
  sectionLists: "sectionList",
  newSection: "newSection",
  locationLists: "locationList",
  newLocation: "newLocation",
  lines: "device/line/",
};
