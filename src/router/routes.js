import BasicLayout from "@/components/BasicLayout.vue";
import Dashboard from "../views/Dashboard.vue";
import Carousel from "../views/Carousel.vue";
import Plan from "../views/Plan.vue";
import Course from "../views/Course.vue";
import Project from "../views/Project.vue";
import Roles from "../views/Roles.vue";
import RolesIndex from "../views/RolesIndex.vue";

const SettingManager = () =>
  import(/* webpackChunkName: "setting" */ "@/views/SettingManager.vue");
const SettingManagerCreate = () =>
  import(/* webpackChunkName: "setting" */ "@/views/SettingManagerCreate.vue");
const SettingManagerEdit = () =>
  import(/* webpackChunkName: "setting" */ "@/views/SettingManagerEdit.vue");

const routes = [
  {
    path: "/",
    name: "Root",
    component: BasicLayout,
    redirect: { name: "Dashboard" },
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: {
          nav: {
            icon: "el-icon-pie-chart",
            title: "概况"
          },
          breadcrumb: {
            title: "概况"
          }
        }
      },
      {
        path: "/carousel",
        name: "Carousel",
        component: Carousel,
        meta: {
          nav: {
            icon: "el-icon-picture-outline",
            title: "轮播图"
          },
          breadcrumb: {
            title: "轮播图"
          }
        }
      },
      {
        path: "/plan",
        name: "Plan",
        component: Plan,
        meta: {
          nav: {
            icon: "el-icon-position",
            title: "职业计划"
          },
          breadcrumb: {
            title: "职业计划"
          }
        }
      },
      {
        path: "/course",
        name: "Course",
        component: Course,
        meta: {
          nav: {
            icon: "el-icon-collection",
            title: "专业课程"
          },
          breadcrumb: {
            title: "专业课程"
          }
        }
      },
      {
        path: "/project",
        name: "Project",
        component: Project,
        meta: {
          nav: {
            icon: "el-icon-folder-opened",
            title: "企业项目"
          },
          breadcrumb: {
            title: "企业项目"
          }
        }
      },
      {
        path: "/setting",
        name: "settingRoot",
        component: { render: h => h("router-view") },
        meta: {
          nav: {
            icon: "el-icon-setting",
            title: "设置"
          },
          breadcrumb: {
            title: "设置"
          }
        },
        children: [
          {
            path: "/setting/manager",
            name: "SettingManagerRoot",
            permission: "setting-manager",
            component: { render: h => h("router-view") },
            redirect: { name: "SettingManager" },
            meta: {
              nav: {
                icon: "el-icon-user",
                title: "管理员设置"
              },
              breadcrumb: {
                title: "管理员",
                replace: true
              }
            },
            children: [
              {
                path: "/setting/manager",
                name: "SettingManager",
                component: SettingManager
              },
              {
                path: "/setting/manager/create",
                name: "SettingManagerCreate",
                component: SettingManagerCreate,
                meta: {
                  breadcrumb: {
                    title: "创建"
                  }
                }
              },
              {
                path: "/setting/manager/:id/edit",
                name: "SettingManagerEdit",
                component: SettingManagerEdit,
                meta: {
                  breadcrumb: {
                    title: "编辑"
                  }
                }
              }
            ]
          },
          {
            path: "/roles",
            name: "RolesRoot",
            component: { render: h => h("router-view") },
            redirect: { name: "Roles" },
            meta: {
              nav: {
                icon: "el-icon-user-solid",
                title: "角色管理"
              },
              breadcrumb: {
                title: "角色管理"
              }
            },
            children: [
              {
                path: "/roles",
                name: "Roles",
                component: Roles
              },
              {
                path: "/roles/index/:id",
                name: "RolesIndex",
                component: RolesIndex,
                meta: {
                  breadcrumb: {
                    title: "详情页"
                  }
                }
              }
            ]
          }
        ]
      }
    ]
  }
];

export default routes;
