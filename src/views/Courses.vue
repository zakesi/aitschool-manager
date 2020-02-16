<template>
  <div class="page-content">
    <router-link to="/courses/create">
      <el-button type="primary" size="mini">
        创建
      </el-button>
    </router-link>
    <el-table :data="coursesArr" stripe style="width: 100%">
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="short_name" label="副标题"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link :to="`/courses/edit/${scope.row.id}`">
            <el-button type="text" size="small">
              编辑
            </el-button>
          </router-link>
          <el-divider direction="vertical"></el-divider>
          <router-link :to="`/courses/chapters/details/${scope.row.id}`">
            <el-button type="text" size="small">
              详情
            </el-button>
          </router-link>
          <el-divider direction="vertical"></el-divider>
          <el-button
            @click.native.prevent="delCourses(scope.$index, scope.row)"
            type="text"
            size="small"
          >
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import serviceCourses from "@/global/service/courses.js";
export default {
  data() {
    return {
      coursesArr: []
    };
  },
  created() {
    serviceCourses.index().then(res => {
      this.coursesArr = res.courses;
    });
  },
  methods: {
    delCourses(index, row) {
      this.$confirm("确认删除吗？")
        .then(() => {
          serviceCourses.destroy(row.id).then(() => {
            this.coursesArr.splice(index, 1);
          });
        })
        .catch(() => {});
    }
  }
};
</script>
