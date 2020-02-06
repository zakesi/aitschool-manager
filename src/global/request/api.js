const PREFIX = "/admin";
const API = {
  carousel: `${PREFIX}/carousel`,
  carouselId: id => `${PREFIX}/carousel/${id}`,
  qiniuToken: `${PREFIX}/qiniu/token`,
  qiniu_api: "https://upload-z2.qiniup.com",
  role: `${PREFIX}/role`,
  roleId: id => `${PREFIX}/role/${id}`,
  permissions: `${PREFIX}/permissions`,
  permissionsId: id => `${PREFIX}/role/${id}/permissions`
};
export default API;
