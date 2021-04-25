<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="标题"
        style="width: 200px;"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        v-waves
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
        style="marginLeft:8px"
      >
        {{ "搜索" }}
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form
            label-position="left"
            class="demo-table-expand"
            label-width="74px"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="发帖编号">
                  <el-tag>
                    <span>{{ props.row.postId }}</span>
                  </el-tag>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="标题">
                  <span>{{ props.row.title }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="发贴人">
                  <span>{{ props.row.userId }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="发帖时间">
                  <el-tag type="warning"
                    ><span>{{ props.row.time }}</span>
                  </el-tag>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="内容">
                  <span>{{ props.row.text }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="分享链接">
                  <template>
                    <el-tag
                      type="info"
                      v-for="(item, index) in props.row.urls"
                      :key="index"
                      :style="{ margin: '0 8px' }"
                    >
                      <el-image
                        :src="props.row.icons[index]"
                        fit="fill"
                        style="width:16px;height:16px;vertical-align: middle;"
                      >
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                      <span :style="{ marginLeft: '8px' }">{{ item }}</span>
                      <br />
                    </el-tag>
                  </template>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="点赞数">
                  <el-tag type="success">
                    <span>{{ props.row.tags }}</span>
                  </el-tag>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="评论数">
                  <el-tag type="success">
                    <span>{{ props.row.commentCount }}</span>
                  </el-tag>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="编号"
        prop="id"
        sortable="custom"
        align="center"
        width="75"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{ row }">
          <span>{{ row.no }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="发帖编号"
        class-name="status-col"
        width="85"
        align="center"
      >
        <template slot-scope="{ row }">
          <el-tag :type="row.status | statusFilter">
            {{ row.postId }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="日期"
        width="140"
        align="center"
        sortable="custom"
      >
        <template slot-scope="{ row }">
          <span
            >{{ row.time.substring(0, 10) }}
            <br />
            {{ row.time.substring(10, row.time.length) }}</span
          >
        </template>
      </el-table-column>
      <el-table-column label="标题" min-width="150">
        <template slot-scope="{ row }">
          <span class="link-type">{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布者" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="点赞数"
        align="center"
        width="95"
        sortable="custom"
      >
        <template slot-scope="{ row }">
          <span>{{ row.tags }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="评论数"
        align="center"
        width="95"
        sortable="custom"
      >
        <template slot-scope="{ row }">
          <span>{{ row.commentCount }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="150"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-row>
            <el-col :span="24">
              <el-button type="primary" size="mini" @click="handleUpdate(row)">
                {{ "编辑" }}
              </el-button>

              <el-button
                size="mini"
                type="success"
                @click="handleModifyStatus(row)"
              >
                {{ "封号" }}
              </el-button>
            </el-col>
            <el-col :span="24" :style="{ marginTop: '4px' }">
              <el-button
                size="mini"
                type="warning"
                @click="handleHide(row, $index)"
              >
                {{ "隐藏" }}
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(row, $index)"
              >
                {{ "删帖" }}
              </el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="内容" prop="text">
          <el-input v-model="temp.text" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ "取消" }}
        </el-button>
        <el-button type="primary" @click="updateData">
          {{ "确定" }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList,
  fetchPv,
  createArticle,
  updateArticle,
  deleteArticle,
  changeAcountStatus,
  changeArticleStatus
} from "@/api/article";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

export default {
  name: "forum",
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        title: undefined,
        sort: "+id"
      },
      temp: {
        id: undefined,
        remark: "",
        timestamp: new Date(),
        title: "",
        text: "",
        status: "published"
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑"
      },
      dialogPvVisible: false,
      rules: {
        title: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        text: [{ required: true, message: "内容不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.total = response.data.total;

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleModifyStatus(row) {
      changeAcountStatus({ userId: row.userId, status: "ban" }).then(res => {
        this.$message({
          message: res.message,
          type: "success"
        });
      });
    },
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },
    sortByID(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+id";
      } else {
        this.listQuery.sort = "-id";
      }
      this.handleFilter();
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          tempData.timestamp = +new Date(tempData.timestamp); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id);
            this.list.splice(index, 1, this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    handleDelete(row, index) {
      deleteArticle({ postId: row.postId }).then(res => {
        this.$notify({
          title: "成功",
          message: "删除成功",
          type: "success",
          duration: 2000
        });
        this.list.splice(index, 1);
      });
    },
    handleHide(row, index) {
      changeArticleStatus({ postId: row.postId, status: "hide" }).then(res => {
        this.$notify({
          title: "成功",
          message: res.message,
          type: "success",
          duration: 2000
        });
      });
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort;
      return sort === `+${key}` ? "ascending" : "descending";
    }
  }
};
</script>

<style scoped>
.filter-container {
  float: right;
  margin-bottom: 8px;
}
</style>
