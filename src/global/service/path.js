import axios from "@/global/request/axios.js";
import api from "@/global/request/api.js";

const pathService = {
  index: function(params) {
    return axios.get(api.path, params);
  },
  show: function(id) {
    return axios.get(api.pathId(id));
  },
  store: function(params) {
    return axios.post(api.path, params);
  },
  update: function(id, params) {
    return axios.put(api.pathId(id), params);
  },
  destroy: function(id) {
    return axios.delete(api.pathId(id));
  }
};
export default pathService;
