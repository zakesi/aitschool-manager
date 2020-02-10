<template>
  <div class="page-content">
    <el-tabs tab-position="right">
      <el-tab-pane label="计划编辑">
        <el-form
          label-position="left"
          label-width="50px"
          :model="planData"
          ref="planData"
          :rules="planRef"
          style="width:400px;"
        >
          <el-form-item label="名称">
            <el-input v-show="editShow" v-model="planData.name"></el-input>
            <span v-show="!editShow">{{ planData.name }}</span>
          </el-form-item>
          <el-form-item label="描述">
            <el-input
              v-show="editShow"
              type="textarea"
              resize="none"
              rows="3"
              v-model="planData.description"
            ></el-input>
            <span v-show="!editShow">{{ planData.description }}</span>
          </el-form-item>
          <el-form-item label="排序">
            <span v-show="!editShow">{{ planData.sort }}</span>
            <el-input-number
              v-show="editShow"
              v-model="planData.sort"
              :min="1"
              :max="10"
              label="排序"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload
              action=""
              class="image-uploader"
              :show-file-list="false"
              :before-upload="getImage"
              :http-request="setImage"
            >
              <img
                v-if="planData.image_url"
                :src="planData.image_url"
                class="image"
              />
              <i v-else class="el-icon-plus image-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="编辑" v-show="!editShow">
            <el-switch v-model="editShow"> </el-switch>
          </el-form-item>
          <el-form-item v-show="editShow">
            <el-button type="primary" size="mini" @click="editPlan">
              编辑
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="计划路径">
        <router-link :to="`/path/${this.$route.params.id}/create`">
          <el-button type="primary" size="mini">
            创建
            <i class="el-icon-upload el-icon--right"></i>
          </el-button>
        </router-link>
        <el-table :data="pathArr" style="width: 100%;margin-top:20px;">
          <el-table-column prop="id" label="Id"> </el-table-column>
          <el-table-column prop="name" label="名称"> </el-table-column>
          <el-table-column prop="description" label="描述"> </el-table-column>
          <el-table-column prop="sort" label="排序"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <router-link :to="`/path/${scope.row.id}/details`">
                <el-button type="text" size="small">
                  详情
                </el-button>
              </router-link>

              <el-divider direction="vertical"></el-divider>
              <el-button
                @click.native.prevent="delPath(scope.$index, scope.row)"
                type="text"
                size="small"
              >
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import qiniuAxios from "@/global/service/qiniu.js";
import servicePlan from "@/global/service/plan.js";
import servicePath from "@/global/service/path.js";

export default {
  data() {
    return {
      editShow: false,
      planData: {
        name: "",
        description: "",
        sort: 1,
        image_url: ""
      },
      planRef: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        description: [
          { required: true, message: "请输入描述", trigger: "blur" }
        ],
        image_url: [{ required: true, message: "请输入描述", trigger: "blur" }],
        sort: [
          { required: true, message: "年龄不能为空" },
          { type: "number", message: "年龄必须为数字值" }
        ]
      },
      pathArr: []
    };
  },
  created() {
    let id = this.$route.params.id;
    servicePlan.show(id).then(res => {
      this.planData = res.plans;
    });
    servicePath.index({ plan_id: id }).then(res => {
      this.pathArr = res.paths;
    });
  },
  methods: {
    delPath(index, row) {
      this.$confirm("确认删除？")
        .then(() => {
          servicePath.destroy(row.id).then(() => {
            this.pathArr.splice(index, 1);
          });
        })
        .catch(() => {});
    },
    getImage(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    setImage(file) {
      qiniuAxios.setDate(file.file).then(res => {
        this.planData.image_url = res;
      });
    },
    editPlan() {
      this.$refs["planData"].validate(valid => {
        let id = this.$route.params.id;
        let data = this.planData;
        if (valid) {
          servicePlan.update(id, data).then(() => {
            this.editShow = false;
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.image-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  display: block;
}
.image {
  width: 178px;
  height: 178px;
  display: block;
}
.ql-container {
  height: 280px;
}
.el-icon-plus:before {
  position: absolute;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.el-icon-plus {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &:hover {
    border-color: #409eff;
  }
}
</style>
