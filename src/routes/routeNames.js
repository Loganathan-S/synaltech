const base = "/";
export const baseUrl = "http://localhost:3004/";

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
};

export const apiNames = {
  mapping: "mapping",
  switchbox: "switchbox",
  device: "devices",
};
