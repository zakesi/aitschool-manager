import axios from "@/global/request/axios.js";
import api from "@/global/request/api.js";

const managerService = {
  index: function() {
    return axios.get(api.manager);
  },
  details: function(id) {
    return axios.get(api.managerId(id));
  },
  store: function(params) {
    return axios.post(api.manager, params);
  },
  update: function(id, params) {
    return axios.put(api.managerId(id), params);
  },
  destroy: function(id) {
    return axios.delete(api.managerId(id));
  },
  login: function(params) {
    return axios.post(api.login, params);
  },
  getPermission: function(token) {
    return axios.post(api.getPermission, token);
  }
};
export default managerService;
