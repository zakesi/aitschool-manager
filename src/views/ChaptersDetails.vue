<template>
  <div class="page-content">
    <el-button
      type="primary"
      size="mini"
      @click="
        dialogVisible = true;
        rditChapter = 1;
      "
    >
      创建
    </el-button>
    <div class="chapters-container">
      <div
        class="chapters-list"
        v-for="(item, index) in ChapterArr"
        :key="item.id"
      >
        <div class="chapters-list_title">
          <div>
            <p class="list_title">
              {{ item.name }}
            </p>
            <span>{{ item.description }}</span>
          </div>
          <div>
            <el-button type="text" @click="addSectionShow(item)"
              >添加节</el-button
            >
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" @click="editChapters(item)">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" @click="delChapters(item, index)"
              >删除</el-button
            >
          </div>
        </div>
        <div class="section-list" v-show="item.sectionArr.length">
          <draggable
            v-model="item.sectionArr"
            @change="getSection(item.sectionArr)"
          >
            <transition-group>
              <div v-for="(data, indexs) in item.sectionArr" :key="data.id">
                <div class="section-list_item">
                  <p class="section-list_title">{{ data.name }}</p>
                  <div>
                    <router-link :to="`/courses/chapters/sections/${data.id}`">
                      <el-button type="text">编辑</el-button>
                    </router-link>
                    <el-divider direction="vertical"></el-divider>
                    <el-button
                      type="text"
                      @click="delSections(data, index, indexs)"
                      >删除</el-button
                    >
                  </div>
                </div>
              </div>
            </transition-group>
          </draggable>
        </div>
      </div>
    </div>
    <el-dialog title="添加节" :visible.sync="sectionsShow" width="30%">
      <span>
        <el-form
          label-position="left"
          label-width="80px"
          :model="sectionsData"
          ref="refsectionsData"
          style="max-width:500px;"
        >
          <el-form-item
            label="名称"
            style="max-width:300px;"
            prop="name"
            :rules="[{ required: true, message: '名称不能为空' }]"
          >
            <el-input v-model="sectionsData.name"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sectionsShow = false">取 消</el-button>
        <el-button type="primary" @click="addSection">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="rditChapter === 1 ? '添加章' : '编辑章'"
      :visible.sync="dialogVisible"
      width="46%"
    >
      <span>
        <el-form
          label-position="left"
          label-width="80px"
          :model="ChapterData"
          ref="refChapterData"
          style="max-width:500px;"
        >
          <el-form-item
            label="名称"
            style="max-width:300px;"
            prop="name"
            :rules="[{ required: true, message: '名称不能为空' }]"
          >
            <el-input v-model="ChapterData.name"></el-input>
          </el-form-item>
          <el-form-item
            label="排序"
            prop="sort"
            :rules="[
              { required: true, message: '排序不能为空' },
              { type: 'number', message: '排序必须为数字值' }
            ]"
          >
            <el-input-number
              v-model.number="ChapterData.sort"
              :min="1"
              :max="10"
              label="排序"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            label="描述"
            prop="description"
            :rules="[{ required: true, message: '描述不能为空' }]"
          >
            <el-input
              type="textarea"
              resize="none"
              rows="3"
              v-model="ChapterData.description"
            ></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="operate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import serviceChapters from "@/global/service/chapters.js";
import serviceSections from "@/global/service/sections.js";

import draggable from "vuedraggable";
export default {
  data() {
    return {
      ChapterId: null,
      sectionsData: {
        name: ""
      },
      sectionsShow: false,
      rditChapter: 1,
      showChapterId: null,
      dialogVisible: false,
      ChapterData: {
        name: "",
        description: "",
        sort: 1
      },
      ChapterArr: []
    };
  },
  components: {
    draggable
  },
  created() {
    this.getData();
  },
  methods: {
    addSection() {
      const data = this.sectionsData;
      data.chapter_id = this.ChapterId;
      serviceSections.store(data).then(() => {
        this.sectionsShow = false;
        this.sectionsData.name = "";
        this.getData();
      });
    },
    addSectionShow(item) {
      this.ChapterId = item.id;
      this.sectionsShow = true;
    },
    getData() {
      let id = this.$route.params.id;
      serviceChapters.index(id).then(res => {
        this.ChapterArr = res.ChapterArr;
      });
    },
    operate() {
      this.$refs["refChapterData"].validate(valid => {
        if (valid) {
          let data = this.ChapterData;
          data.course_id = this.$route.params.id;
          if (this.rditChapter == 1) {
            serviceChapters.store(data).then(() => {
              this.ChapterData = {
                name: "",
                description: "",
                sort: 1
              };
              this.dialogVisible = false;
            });
          } else if (this.rditChapter == 2) {
            serviceChapters.update(this.showChapterId, data).then(() => {
              this.ChapterData = {
                name: "",
                description: "",
                sort: 1
              };
              this.dialogVisible = false;
            });
          }
        }
      });
    },
    editChapters(item) {
      this.rditChapter = 2;
      this.ChapterData = {
        name: item.name,
        description: item.description,
        sort: item.sort
      };
      this.showChapterId = item.id;
      this.dialogVisible = true;
    },
    delChapters(item, index) {
      this.$confirm("确认删除吗？")
        .then(() => {
          serviceChapters.destroy(item.id).then(() => {
            this.ChapterArr.splice(index, 1);
          });
        })
        .catch(() => {});
    },
    getSection(arr) {
      const data = arr.map((item, index) => {
        return { id: item.id, index };
      });
      serviceSections.sort({ data }).then(() => {});
    },
    delSections(data, index, indexs) {
      this.$confirm("确认删除吗？")
        .then(() => {
          serviceSections.destroy(data.id).then(() => {
            this.ChapterArr[index].sectionArr.splice(indexs, 1);
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
.chapters-container {
  margin-top: 20px;
  .chapters-list {
    .chapters-list_title {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      display: flex;
      align-items: center;
      padding: 5px;
      margin-bottom: 10px;
      justify-content: space-between;
      div {
        display: flex;
        align-items: center;
      }
      .list_title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 160px;
        font-size: 16px;
        font-weight: 500;
        line-height: 16px;
      }
      span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100px;
        font-size: 12px;
        color: #999;
      }
    }
    .section-list {
      padding: 5px 0 10px 20px;
      .section-list_item {
        height: 40px;
        border-radius: 5px;
        padding: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .section-list_title {
          font-size: 14px;
          line-height: 14px;
        }
      }
    }
  }
}
</style>
