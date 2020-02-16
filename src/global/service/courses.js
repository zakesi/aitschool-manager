import axios from "@/global/request/axios.js";
import api from "@/global/request/api.js";

const coursesService = {
  index: function() {
    return axios.get(api.courses);
  },
  show: function(id) {
    return axios.get(api.coursesId(id));
  },
  store: function(params) {
    return axios.post(api.courses, params);
  },
  update: function(id, params) {
    return axios.put(api.coursesId(id), params);
  },
  destroy: function(id) {
    return axios.delete(api.coursesId(id));
  }
};
export default coursesService;
