<template>
  <div class="page-content">
    <el-tabs tab-position="right">
      <el-tab-pane label="路径详情">
        <el-form
          label-position="left"
          label-width="50px"
          :model="pathData"
          ref="pathData"
          :rules="pathRef"
          style="width:300px;"
        >
          <el-form-item label="名称">
            <el-input v-show="editShow" v-model="pathData.name"></el-input>
            <span v-show="!editShow">{{ pathData.name }}</span>
          </el-form-item>
          <el-form-item label="描述">
            <el-input
              v-show="editShow"
              type="textarea"
              resize="none"
              rows="3"
              v-model="pathData.description"
            ></el-input>
            <span v-show="!editShow">{{ pathData.description }}</span>
          </el-form-item>
          <el-form-item label="排序">
            <el-input-number
              v-show="editShow"
              v-model="pathData.sort"
              :min="1"
              :max="10"
              label="排序"
            ></el-input-number>
            <span v-show="!editShow">{{ pathData.sort }}</span>
          </el-form-item>
          <el-form-item label="编辑" v-show="!editShow">
            <el-switch v-model="editShow"> </el-switch>
          </el-form-item>
          <el-form-item v-show="editShow">
            <el-button type="primary" size="mini" @click="editPath">
              编辑
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="关联课程">
        <el-table :data="coursesArr" style="width: 100%">
          <el-table-column prop="id" label="ID"> </el-table-column>
          <el-table-column prop="name" label="名称"> </el-table-column>
          <el-table-column prop="short_name" label="详细名称">
          </el-table-column>
          <el-table-column prop="tips" label="提示"> </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import servicePath from "@/global/service/path.js";

export default {
  data() {
    return {
      editShow: false,
      pathData: {
        name: "",
        description: "",
        sort: ""
      },
      pathRef: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        description: [
          { required: true, message: "请输入描述", trigger: "blur" }
        ],
        sort: [
          { required: true, message: "年龄不能为空" },
          { type: "number", message: "年龄必须为数字值" }
        ]
      },
      coursesArr: []
    };
  },
  created() {
    let id = this.$route.params.id;
    servicePath.show(id).then(res => {
      this.pathData = res.paths;
      this.coursesArr = res.courses;
    });
  },
  methods: {
    editPath() {
      this.$refs["pathData"].validate(valid => {
        if (valid) {
          let id = this.$route.params.id;
          let data = this.pathData;
          servicePath.update(id, data).then(() => {
            this.editShow = false;
          });
        }
      });
    }
  }
};
</script>
