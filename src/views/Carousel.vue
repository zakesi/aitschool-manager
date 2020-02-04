<template>
  <div class="carous-page">
    <h2>Carousel</h2>
    <div>
      <el-button type="primary" @click="show = true">上传照片</el-button>
      <template>
        <el-table :data="carouseArr" style="margin-top:30px; width: 100%">
          <el-table-column label="id" prop="id"></el-table-column>
          <el-table-column label="图片">
            <template slot-scope="scope">
              <el-image
                :src="scope.row.image_url"
                style="width: 50px; height: 50px"
                fit="contain"
                :preview-src-list="[scope.row.image_url]"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column label="平台">
            <template slot-scope="scope">
              {{ scope.row.platfrom == 1 ? "pc" : "m" }}
            </template>
          </el-table-column>
          <el-table-column label="等级" prop="sort"> </el-table-column>
          <el-table-column label="重定向地址" prop="router_url">
          </el-table-column>

          <el-table-column label="创建时间" prop="created_at">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-dialog title="创建轮播图" :visible.sync="show">
        <el-form
          :model="showCarouseData"
          :rules="rules"
          ref="ruleForm"
          label-position="left"
          label-width="110px"
        >
          <el-form-item label="图片" prop="image_url" v-if="difference == 1">
            <el-upload
              action=""
              class="avatar-uploader"
              :show-file-list="false"
              :before-upload="getImage"
              :http-request="setImage"
            >
              <img
                v-if="showCarouseData.image_url"
                :src="showCarouseData.image_url"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="图片等级" prop="sort">
            <el-input-number
              v-model="showCarouseData.sort"
              :min="0"
              :max="10"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="平台" prop="platfrom">
            <template>
              <el-radio v-model="showCarouseData.platfrom" :label="Number(1)"
                >pc</el-radio
              >
              <el-radio v-model="showCarouseData.platfrom" :label="Number(2)"
                >m</el-radio
              >
            </template>
          </el-form-item>
          <el-form-item label="重定向地址" prop="router_url">
            <el-input
              v-model="showCarouseData.router_url"
              placeholder="请输入重定向地址"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="delData">取 消</el-button>
          <el-button type="primary" @click="verdict">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import carouselAxios from "@/global/service/carousel.js";
import qiniuAxios from "@/global/service/qiniu.js";

export default {
  data() {
    return {
      difference: 1,
      carouseArr: [],
      show: false,
      showCarouseData: {
        platfrom: null,
        sort: 0,
        image_url: "",
        router_url: "https://www.google.com/"
      },
      rules: {
        platfrom: [
          { required: true, message: "请选择平台", trigger: "change" },
          { type: "number", message: "等级必须为数字值", trigger: "blur" }
        ],
        sort: [
          { required: true, message: "请输入等级", trigger: "change" },
          { type: "number", message: "等级必须为数字值", trigger: "blur" }
        ],
        image_url: [
          { required: true, message: "请选择图片", trigger: "change" }
        ],
        router_url: [
          { required: true, message: "请输入重定向地址", trigger: "change" }
        ]
      },
      carouseId: null
    };
  },
  created: function() {
    this.getData();
  },
  methods: {
    getData() {
      carouselAxios.all().then(res => {
        this.carouseArr = res.carousels;
      });
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
        this.showCarouseData.image_url = res;
      });
    },
    delData() {
      this.showCarouseData = {
        platfrom: null,
        sort: 0,
        image_url: "",
        router_url: "https://www.google.com/"
      };
      this.show = false;
      this.difference == 1;
    },
    verdict() {
      if (this.difference == 1) {
        this.addCarousel();
      } else if (this.difference == 2) {
        this.editCarousel();
      }
    },
    addCarousel() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let showCarouseData = this.showCarouseData;
          carouselAxios.add(showCarouseData).then(() => {
            this.getData();
            this.delData();
          });
        }
      });
    },
    handleEdit(row) {
      this.carouseId = row.id;
      this.showCarouseData = row;
      this.difference = 2;
      this.show = true;
    },
    editCarousel() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let id = this.carouseId;
          let showCarouseData = this.showCarouseData;
          carouselAxios.enit(id, showCarouseData).then(() => {
            this.getData();
            this.delData();
          });
        }
      });
    },
    handleDelete(index, row) {
      carouselAxios.del(row.id).then(() => {
        this.getData();
      });
    }
  }
};
</script>
<style lang="less">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  display: block;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.ql-container {
  height: 280px;
}
</style>
