import BasicLayout from "@/components/BasicLayout.vue";
import Dashboard from "../views/Dashboard.vue";
import Carousel from "../views/Carousel.vue";
import Plan from "../views/Plan.vue";
import PlanEdit from "../views/PlanEdit.vue";
import PlanCreate from "../views/PlanCreate.vue";
import PlanItem from "../views/PlanItem.vue";
import PathCreate from "../views/PathCreate.vue";
import PathEdit from "../views/PathEdit.vue";
import Courses from "../views/Courses.vue";
import CoursesCreate from "../views/CoursesCreate.vue";
import CoursesEdit from "../views/CoursesEdit.vue";
import CourseItem from "../views/CourseItem.vue";
import Section from "../views/Section.vue";
import Project from "../views/Project.vue";
import SettingRoles from "../views/SettingRoles.vue";
import SettingRolesItem from "../views/SettingRolesItem.vue";
import login from "../views/login.vue";
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
        permission: "carousel-manager",
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
        name: "PlanRoot",
        component: { render: h => h("router-view") },
        meta: {
          nav: {
            icon: "el-icon-position",
            title: "职业计划"
          },
          breadcrumb: {
            title: "职业计划"
          }
        },
        children: [
          {
            path: "/plan",
            name: "Plan",
            component: Plan
          },
          {
            path: "/plan/create",
            name: "planCreate",
            component: PlanCreate,
            meta: {
              breadcrumb: {
                title: "创建"
              }
            }
          },
          {
            path: "/plan/edit/:id",
            name: "PlanEdit",
            component: PlanEdit,
            meta: {
              breadcrumb: {
                title: "创建"
              }
            }
          },
          {
            path: "/plan/:id",
            name: "PlanItemRoot",
            component: { render: h => h("router-view") },
            meta: {
              breadcrumb: {
                title: "路径列表"
              }
            },
            children: [
              {
                path: "/plan/:id",
                name: "PlanItem",
                component: PlanItem
              },
              {
                path: "/path/:id/create",
                name: "PathCreate",
                component: PathCreate,
                meta: {
                  breadcrumb: {
                    title: "路径添加"
                  }
                }
              },
              {
                path: "/path/:id/edit",
                name: "PathEdit",
                component: PathEdit,
                meta: {
                  breadcrumb: {
                    title: "路径编辑"
                  }
                }
              }
            ]
          }
        ]
      },
      {
        path: "/courses",
        name: "CoursesRoot",
        component: { render: h => h("router-view") },
        meta: {
          nav: {
            icon: "el-icon-collection",
            title: "专业课程"
          },
          breadcrumb: {
            title: "专业课程"
          }
        },
        children: [
          {
            path: "/courses",
            name: "Courses",
            component: Courses
          },
          {
            path: "/courses/create",
            name: "CourseCreate",
            component: CoursesCreate,
            meta: {
              breadcrumb: {
                title: "创建"
              }
            }
          },
          {
            path: "/course/:id/edit",
            name: "CourseEdit",
            component: CoursesEdit,
            meta: {
              breadcrumb: {
                title: "编辑"
              }
            }
          },
          {
            path: "/course/:id",
            name: "CourseItemRoot",
            component: { render: h => h("router-view") },
            meta: {
              breadcrumb: {
                title: "章节详情"
              }
            },
            children: [
              {
                path: "/course/:id",
                name: "CourseItem",
                component: CourseItem
              },
              {
                path: "/course/section/:id",
                name: "Section",
                component: Section,
                meta: {
                  breadcrumb: {
                    title: "节详情"
                  }
                }
              }
            ]
          }
        ]
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
            // permission: "setting-manager",
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
            path: "/setting/roles",
            name: "SettingRolesRoot",
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
                path: "/setting/roles",
                name: "SettingRoles",
                component: SettingRoles
              },
              {
                path: "/setting/roles/:id",
                name: "SettingRolesItem",
                component: SettingRolesItem,
                meta: {
                  breadcrumb: {
                    title: "详情"
                  }
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: login,
    meta: {
      breadcrumb: {
        title: "登陆页面"
      }
    }
  }
];

export default routes;
