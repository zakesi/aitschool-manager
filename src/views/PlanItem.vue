<template>
  <div class="page-content">
    <router-link :to="`/path/${this.$route.params.id}/create`">
      <el-button type="primary" size="mini">
        创建
        <i class="el-icon-upload el-icon--right"></i>
      </el-button>
    </router-link>
    <div class="path-container">
      <div class="path-list" v-for="(item, index) in pathArr" :key="item.id">
        <div class="path-item">
          <div class="item-text">
            <p class="item-title">{{ item.name }}</p>
            <p class="item-desc">{{ item.description }}</p>
          </div>
          <div class="item-button">
            <el-button
              type="text"
              @click="
                dialogVisible = true;
                path_id = item.id;
              "
              >添加关联课程</el-button
            >
            <el-divider direction="vertical"></el-divider>
            <router-link :to="`/path/${item.id}/edit`">
              <el-button type="text">编辑</el-button>
            </router-link>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" @click="delPath(item, index)"
              >删除</el-button
            >
          </div>
        </div>
        <div class="courses-list" v-show="item.CourseArr.length">
          <draggable
            v-model="item.CourseArr"
            @change="getCoursen(item.id, item.CourseArr)"
          >
            <transition-group>
              <div v-for="(data, indexs) in item.CourseArr" :key="data.id">
                <div class="courseArr-list_item">
                  <p class="courseArr-list_title">{{ data.name }}</p>
                  <div>
                    <el-button
                      type="text"
                      @click="delPathCourse(item.id, data.id, index, indexs)"
                      >删除关联</el-button
                    >
                  </div>
                </div>
              </div>
            </transition-group>
          </draggable>
        </div>
      </div>
    </div>
    <el-dialog title="添加关联课程" :visible.sync="dialogVisible" width="30%">
      <span
        ><el-input
          v-model="CourseArrId"
          placeholder="请输入想管理课程的id,以逗号分割"
        ></el-input
      ></span>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="
            dialogVisible = false;
            CourseArrId = '';
          "
          >取 消</el-button
        >
        <el-button type="primary" @click="addPathCourse">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import servicePath from "@/global/service/path.js";
import servicePathCourse from "@/global/service/pathCourse.js";

import draggable from "vuedraggable";
export default {
  data() {
    return {
      dialogVisible: false,
      pathArr: [],
      CourseArrId: "",
      path_id: null
    };
  },
  components: {
    draggable
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let id = this.$route.params.id;
      servicePath.index({ plan_id: id }).then(res => {
        this.pathArr = res.pathsArr;
      });
    },
    addPathCourse() {
      let CourseArrId = this.CourseArrId;
      if (CourseArrId == "") return this.$message("请填写数值");
      const data = {
        CourseArrId,
        path_id: this.path_id
      };
      servicePathCourse.store(data).then(() => {
        this.getData();
        this.dialogVisible = false;
      });
    },
    delPath(item, index) {
      this.$confirm("确认删除？")
        .then(() => {
          servicePath.destroy(item.id).then(() => {
            this.pathArr.splice(index, 1);
          });
        })
        .catch(() => {});
    },
    getCoursen(id, arr) {
      const data = arr.map((item, index) => {
        return { path_id: id, course_id: item.id, index };
      });
      servicePathCourse.sort({ data }).then(() => {});
    },
    delPathCourse(path_id, course_id, index, indexs) {
      this.$confirm("确认删除？")
        .then(() => {
          let data = { path_id, course_id };
          servicePathCourse.destroy(data).then(() => {
            this.pathArr[index].CourseArr.splice(indexs, 1);
          });
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.path-list {
  margin-top: 20px;
  .courses-list {
    padding: 5px 0 10px 20px;
    .courseArr-list_item {
      height: 40px;
      border-radius: 5px;
      padding: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .courseArr-list_title {
        font-size: 14px;
        line-height: 14px;
      }
    }
  }
}
.path-item {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 5px;
  margin-bottom: 10px;
  justify-content: space-between;
  .item-text {
    display: flex;
    .item-title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 160px;
      font-size: 16px;
      font-weight: 500;
      line-height: 16px;
    }
    .item-desc {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100px;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
