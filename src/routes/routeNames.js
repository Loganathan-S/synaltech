const base = "/";

export const routeNames = {
  home: base,
  auth: {
    login: base + "login",
    register: base + "register",
    logout: base,
  },
  dashboard: base + "dashboard",
  synaltech: base + "synaltech",
  device: base + "device",
  settings: base + "settings",
  mapping: base + "mapping",
  switchbox: base + "switchbox",
};
