/*
 ** DataStore 变量缓存器
 ** 方便我们在不同的类中访问和修改变量
 ** 相当于全局变量使用
 **
 ** map 使用方法
 ** import DataStore  from '@/global/storage/index.js';
 ** const userInfoInDataStore = DataStore.map.get('userInfo');
 ** DataStore.map.set('userInfo',storageUserInfo);
 **
 ** 同时封装使用 strorage、session、cookie
 ** storage
 ** session
 ** cookie
 */

import MyStorage from "./storage.js";

class DataStore {
  constructor() {
    this.init();
  }

  init() {
    this.map = new Map();
    this.storage = new MyStorage();
  }

  static getInstance() {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }
  setToken(token) {
    this.storage.set("token", token);
  }
  getToken() {
    return this.storage.get("token");
  }
  setManagerId(ManagerId) {
    this.storage.set("ManagerId", ManagerId);
  }
  getManagerId() {
    return this.storage.get("ManagerId");
  }
  setPermission(Permission) {
    this.storage.set("Permission", Permission);
  }
  getPermission() {
    return this.storage.get("Permission");
  }
  setManagerRoles_id(ManagerRoles_id) {
    this.storage.set("ManagerRoles_id", ManagerRoles_id);
  }
  getManagerRoles_id() {
    return this.storage.get("ManagerRoles_id");
  }
  setManagerName(ManagerName) {
    this.storage.set("ManagerName", ManagerName);
  }
  getManagerName() {
    return this.storage.get("ManagerName");
  }
  clear() {
    console.log(123);
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  }
}

export default DataStore.getInstance();
