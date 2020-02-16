import axios from "@/global/request/axios.js";
import api from "@/global/request/api.js";

const pathCourseService = {
  store: function(params) {
    return axios.post(api.pathCourseStore, params);
  },
  sort: function(params) {
    return axios.post(api.pathCourse, params);
  },
  destroy: function(data) {
    return axios.delete(api.pathCourse, data);
  }
};
export default pathCourseService;
