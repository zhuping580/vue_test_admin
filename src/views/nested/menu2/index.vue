<template>
  <div class="app-container">
    <el-card>
      <el-row class="cat_opt">
        <el-col>
          <span
            ><el-button icon="el-icon-plus" type="primary" @click="addInterface"
              >添加</el-button
            ></span
          >
        </el-col>
      </el-row>
      <el-table :data="requestPara" style="width: 100%">
        <el-table-column prop="paraname" label="参数名">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input
                class="edit-input"
                v-model="scope.row.paraname"
                placeholder="参数名"
                :rules="[{ required: true, message: '不能为空' }]"
              ></el-input>
            </template>
            <span v-else>{{ scope.row.paraname }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="paracase" label="示例">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input
                class="edit-input"
                v-model="scope.row.paracase"
                placeholder="示例"
              ></el-input>
            </template>
            <span v-else>{{ scope.row.paracase }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="required" label="是否必填">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-checkbox v-model="scope.row.required">必填</el-checkbox>
            </template>
            <span v-else>
              <span v-if="scope.row.required">必填</span>
              <span v-else>选填</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="maxlength" label="最大长度">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input
                class="edit-input"
                v-model="scope.row.maxlength"
                placeholder="最大长度"
              ></el-input>
            </template>
            <span v-else>{{ scope.row.maxlength }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="minlength" label="最小长度">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input
                class="edit-input"
                v-model="scope.row.maxlength"
                placeholder="最小长度"
              ></el-input>
            </template>
            <span v-else>{{ scope.row.maxlength }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="bookbuytime" label="购买日期">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-date-picker
                v-model="scope.row.bookbuytime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="购买日期"
              >
              </el-date-picker>
            </template>
            <span v-else>{{ scope.row.bookbuytime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="editing" label="操作">
          <template slot-scope="scope">
            <div v-if="!scope.row.editing">
              <el-button
                icon="el-icon-edit"
                size="small"
                type="primary"
                v-model="scope.$index"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑
              </el-button>
              <el-button
                icon="el-icon-delete"
                size="small"
                type="danger"
                v-model="scope.$index"
                @click="handleDelete(scope.$index, scope.row)"
                >删除
              </el-button>
            </div>
            <div v-else>
              <el-button
                icon="el-icon-close"
                size="small"
                v-model="scope.$index"
                @click="handleCancle(scope.$index, scope.row)"
                >取消
              </el-button>
              <el-button
                size="small"
                v-model="scope.$index"
                type="success"
                @click="savemodify(scope.row)"
                icon="el-icon-check"
              >
                保存
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "TestWorld",
  data() {
    return {
      catelist: ["A", "B"],
      requestPara: [
        {
          paraname: "普通高等教育物联网工程专业规划用书：物联网技术概论",
          bookbuytime: "2016-05-04",
          paracase: "李晓月",
          required: true,
          maxlength: 20,
          minlength: 10,
          editing: false,
        },
      ],
      prevValue: {},
    };
  },

  watch: {
    requestPara(val, newval) {
      // console.log(val);
      // console.log(newval);
    },
  },
  methods: {
    addInterface() {
      //添加新的行数
      this.requestPara.push({ editing: true });
    },
    handleEdit(index, row) {
      //编辑
      row.editing = true;
      this.prevValue = JSON.parse(JSON.stringify(row));
    },
    handleCancle(index, row) {
      //取消
      // console.log('row',row)
      // console.log('requestPara',this.requestPara)
      row.editing = false;

      if (this.prevValue) {
        this.prevValue.editing = false;
        this.requestPara[index] = this.prevValue;
        this.prevValue = "";
      }

      if (!row.paraname) {
        this.requestPara.pop();
      }
    },
    handleDelete(index, row) {
      this.requestPara.splice(index, 1);
    },
    savemodify(row) {
      // console.log(JSON.stringify(this.requestPara));
      row.editing = false;
      // console.log(this.requestPara);
      if (!row.paraname) {
        this.requestPara.pop();
      }
    },
  },
};
</script>
