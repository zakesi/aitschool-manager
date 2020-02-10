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
  planId: id => `${PREFIX}/plan/${id}`
};
export default API;
