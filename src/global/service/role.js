import axios from "@/global/request/axios.js";
import api from "@/global/request/api.js";

const roleService = {
  index: function() {
    return axios.get(api.role);
  },
  store: function(params) {
    return axios.post(api.role, params);
  },
  update: function(id, params) {
    return axios.put(api.roleId(id), params);
  },
  destroy: function(id) {
    return axios.delete(api.roleId(id));
  }
};
export default roleService;
