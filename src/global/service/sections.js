import axios from "@/global/request/axios.js";
import api from "@/global/request/api.js";

const sectionsService = {
  show: function(id) {
    return axios.get(api.sectionsId(id));
  },
  sort: function(params) {
    return axios.post(api.sectionsId("sort"), params);
  },
  store: function(params) {
    return axios.post(api.sections, params);
  },
  update: function(id, params) {
    return axios.put(api.sectionsId(id), params);
  },
  destroy: function(id) {
    return axios.delete(api.sectionsId(id));
  }
};
export default sectionsService;
