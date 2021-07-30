<template>
  <div class="app-container">
    <el-card>
      <el-button type="primary" @click="dialogVisible = true" size="small"
        >新增接口</el-button
      >
      <el-dialog
        title="新增接口"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-form
          :model="addrequest"
          ref="addrequest"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
          :inline="true"
        >
          <el-form-item label="名称:" prop="name">
            <el-input v-model="addrequest.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="请求:" prop="request">
            <el-input
              placeholder="请输入路径"
              v-model="addrequest.url"
              class="input-with-select"
              style="width: 400px"
            >
              <el-select
                v-model="addrequest.methods"
                slot="prepend"
                style="width: 80px"
              >
                <el-option label="get" value="get"></el-option>
                <el-option label="post" value="post"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </span>
      </el-dialog>
      <el-table
        :data="requestForm"
        row-key="id"
        style="width: 60%"
        height="780"
      >
        <el-table-column
          type="index"
          label="id"
          :index="indexMethod"
        ></el-table-column>
        <el-table-column prop="name" label="接口名称"> </el-table-column>
        <el-table-column prop="methods" label="请求方式"> </el-table-column>
        <el-table-column prop="url" label="请求路径"> </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.$index, scope.row)"
              size="small"
              >查看</el-button
            >
            <el-button size="small" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import {
  interface_list,
  interface_update,
  interface_delete,
} from "@/api/interface";
export default {
  data() {
    return {
      dialogVisible: false,
      addrequest: {
        name: "",
        methods: "get",
        url: "",
      },
      requestForm: [],
      // requestForm: [
      //   {
      //     name: "登录",
      //     request: {
      //       methods: "get",
      //       url: "qweqw",
      //     },
      //   },
      // ],
      rules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      interface_list().then((response) => {
        this.requestForm = response.data;
      });
    },
    indexMethod(index) {
      return index + 1;
    },
    handleClick(index, row) {
      console.log(index, row);
      console.log(this.$router);
      this.$router.push({ path: "/nested/interface/detail" ,
      query: {id: row.id}
      });
      console.log(this.$router);
    },
    handleClose(done) {
      done();
      // this.$confirm("确认关闭？")
      //   .then((_) => {
      //     done();
      //   })
      //   .catch((_) => {});
    },
    handleEdit(row) {
      console.log(row);
      this.addrequest = row;
      this.dialogVisible = true;
    },
    handleDelete(row) {
      this.$confirm("确认删除吗？")
        .then((_) => {
          interface_delete({ id: row.id }).then((response) => {
            this.$message.success(response.message);
            this.getList();
          });
        })
        .catch((_) => {});
    },
    submitForm() {
      this.$refs["addrequest"].validate((valid) => {
        if (valid) {
          interface_update(this.addrequest).then((response) => {
            // console.log('message',response.message)
            this.$message.success(response.message);
            this.dialogVisible = false;
            this.addrequest = {
              name: "",
              methods: "get",
              url: "",
            };
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>