import axios from "@/global/request/axios.js";
import api from "@/global/request/api.js";

const permissionsService = {
  index: function() {
    return axios.get(api.permissions);
  },
  getPermissions: function(id) {
    return axios.get(api.permissionsId(id));
  },
  updatePermissions: function(id, params) {
    return axios.put(api.permissionsId(id), params);
  }
};
export default permissionsService;
