const PREFIX = "/admin";
const API = {
  carousel: `${PREFIX}/carousel`,
  carouselId: id => `${PREFIX}/carousel/${id}`,
  qiniuToken: `${PREFIX}/qiniu/token`,
  qiniu_api: "https://upload-z2.qiniup.com",
  role: `${PREFIX}/role`,
  roleId: id => `${PREFIX}/role/${id}`,
  permissions: `${PREFIX}/permissions`,
  permissionsId: id => `${PREFIX}/role/${id}/permissions`,
  manager: `${PREFIX}/manager`,
  managerId: id => `${PREFIX}/manager/${id}`,
  login: `${PREFIX}/manager/login`,
  getPermission: `${PREFIX}/getPermission`,
  path: `${PREFIX}/path`,
  pathId: id => `${PREFIX}/path/${id}`,
  plan: `${PREFIX}/plan`,
  planId: id => `${PREFIX}/plan/${id}`,
  courses: `${PREFIX}/course`,
  coursesId: id => `${PREFIX}/course/${id}`,
  chapters: `${PREFIX}/chapters`,
  chaptersId: id => `${PREFIX}/chapters/${id}`,
  sections: `${PREFIX}/sections`,
  sectionsId: id => `${PREFIX}/sections/${id}`,
  pathCourse: `${PREFIX}/path/course/sort`,
  pathCourseStore: `${PREFIX}/path/course/store`
};
export default API;
