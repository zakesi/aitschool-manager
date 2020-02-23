<template>
  <div class="page-content">
    <div class="carousel-page">
      <el-button size="medium" type="primary" plain @click="show = true"
        >创建轮播图</el-button
      >
      <template>
        <el-table class="mt-20" :data="carouseArr">
          <el-table-column label="id" prop="id" width="80px;"></el-table-column>
          <el-table-column label="图片" width="80px;">
            <template slot-scope="scope">
              <el-image
                :src="scope.row.image_url"
                style="width: 30px; height: 30px"
                fit="cover"
                :preview-src-list="[scope.row.image_url]"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column
            prop="tag"
            label="平台"
            width="100"
            :filters="[
              { text: '网页', value: 1 },
              { text: '手机', value: 2 }
            ]"
            :filter-method="filterTag"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.platfrom == 1 ? 'primary' : 'success'"
                disable-transitions
                >{{ scope.row.platfrom == 1 ? "网页" : "手机" }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            label="排序"
            prop="sort"
            width="80px;"
          ></el-table-column>
          <el-table-column label="重定向地址" prop="router_url">
          </el-table-column>
          <el-table-column label="创建时间" prop="created_at">
          </el-table-column>
          <el-table-column label="操作" align="right">
            <template slot-scope="scope">
              <el-button type="text" @click="handleEdit(scope.row)"
                >编辑</el-button
              ><el-divider direction="vertical"></el-divider>
              <el-button
                type="text"
                style="color:#f56c6c;"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-dialog
        :title="difference == 1 ? '创建轮播图' : '编辑轮播图'"
        :visible.sync="show"
        :before-close="delData"
      >
        <el-form
          :model="showCarouseData"
          :rules="rules"
          ref="ruleForm"
          label-position="left"
          label-width="110px"
        >
          <el-form-item label="图片" prop="image_url">
            <el-upload
              action=""
              class="image-uploader"
              :show-file-list="false"
              :before-upload="getImage"
              :http-request="setImage"
            >
              <img
                v-if="showCarouseData.image_url"
                :src="showCarouseData.image_url"
                class="image"
              />
              <i v-else class="el-icon-plus image-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="图片排序" prop="sort">
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
                >网页</el-radio
              >
              <el-radio v-model="showCarouseData.platfrom" :label="Number(2)"
                >手机</el-radio
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
          { type: "number", message: "排序必须为数字值", trigger: "blur" }
        ],
        sort: [
          { required: true, message: "请输入排序", trigger: "change" },
          { type: "number", message: "排序必须为数字值", trigger: "blur" }
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
    filterTag(value, row) {
      return row.platfrom === value;
    },
    getData() {
      carouselAxios.index().then(res => {
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
      this.getData();
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
          carouselAxios.store(showCarouseData).then(() => {
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
          carouselAxios.update(id, showCarouseData).then(() => {
            this.delData();
          });
        }
      });
    },
    handleDelete(index, row) {
      this.$confirm("确认删除吗？")
        .then(() => {
          carouselAxios.destroy(row.id).then(() => {
            this.getData();
          });
        })
        .catch(() => {});
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
