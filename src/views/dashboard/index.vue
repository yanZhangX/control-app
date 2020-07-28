<template>
  <div class="home">
    <el-card class="box-card" v-loading="loading">
      <el-row :gutter="24" type="flex" class="row-bg" justify="end" style="margin:0px">
        <el-col :span="4">
          <div class="Serach_item">
            <div class="search_name">租户名称：</div>
            <el-input placeholder="请输入内容" size="medium" v-model="plat_name" clearable></el-input>
          </div>
        </el-col>
        <el-col :span="3" style="padding:0px">
          <div class="Serach_item">
            <el-select v-model="status" clearable placeholder="请选择状态">
              <el-option v-for="item in options" :key="item.status" :label="item.label" :value="item.status"> </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="2"><el-button type="primary" icon="el-icon-search" @click="serch">查询</el-button></el-col>
        <el-button type="primary" @click="addTenant('ruleForm')">新增</el-button>
      </el-row>
      <el-table :data="tenantList" :border="true" stripe style="width: 100%">
        <el-table-column prop="id" label="编号" width="180" align="center"></el-table-column>
        <el-table-column prop="plat_name" label="餐厅名称" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
        <el-table-column prop="username" label="登录账号" align="center"></el-table-column>
        <el-table-column prop="created_at" label="创建时间" align="center"> </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.status == 1">正常</div>
            <div v-if="scope.row.status == 2">停封</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="EditPass(scope.row.id)">重置密码</el-button>
            <el-button type="text" size="mini" @click="editTenant(scope.row)">修改</el-button>
            <el-button type="text" size="mini" @click="editState(scope.row.id)">{{ scope.row.status == 1 ? '停用' : '启用' }}</el-button>
            <el-button type="text" size="mini" @click="delect(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[15, 20, 30]"
        :current-page="page"
        :page-size="per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <!-- 新增 -->
      <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="餐厅名称" prop="plat_name">
            <el-input v-model="ruleForm.plat_name"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item v-if="this.title !== '修改餐厅'" label="登录账户" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item v-if="this.title !== '修改餐厅'" label="登录密码" prop="password">
            <el-input show-password v-model="ruleForm.password"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="getAddtenant">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { checkPhone } from '@/utils/regular'
import { statusType } from '@/assets/js/tenant'
import mockData from './data'
export default {
  name: 'home',
  data() {
    return {
      input: '',
      loading: true,
      title: '添加餐厅',
      ruleForm: {
        plat_name: '', // 餐厅名字
        username: '', // 登录账号
        phone: '', // 电话
        password: '' // 登录密码
      },
      rules: {
        phone: [{ required: true, validator: checkPhone, trigger: 'blur' }],
        plat_name: [
          { required: true, message: '请输入餐厅名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入登录账户', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      props: { multiple: true },
      options: statusType,
      value: '',
      currentPage4: 4,
      activeName: 'first',
      plat_name: '',
      per_page: 15,
      page: 1,
      status: '',
      tenantList: mockData, // 数据列表
      total: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    serch() {
      if (!this.plat_name && !this.status) {
        this.$message({
          message: '请输入搜索条件',
          type: 'success'
        })
      }
    },
    getList() {
      // const data = {
      //   plat_name: this.plat_name,
      //   per_page: this.per_page,
      //   status: this.status
      // }
      // TenantList(data, this.page).then((res) => {
      //   console.log(res, '租户列表')
      //   if (res.code == 0) {
      //     this.loading = false
      //     this.TenantList = res.data.data
      //     this.total = res.data.total
      //     this.page = res.data.current_page
      //   }
      // })
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    getAddtenant() {
      // 新增餐厅
      if (this.title !== '修改餐厅') {
        // const data = this.ruleForm
        // Addtenant(data).then((res) => {
        //   console.log(res, '增加餐厅')
        //   if (res.code !== 0) return this.$message.error(res.message)
        //   this.dialogVisible = false
        //   this.getList()
        //   this.$message({
        //     message: '添加成功',
        //     type: 'success'
        //   })
        // })
      } else {
        // const updata = {
        //   plat_name: this.ruleForm.plat_name,
        //   phone: this.ruleForm.phone,
        //   id: this.ruleForm.id
        // }
        // edit(updata).then((res) => {
        //   if (res.code !== 0) return this.$message.error(res.message)
        //   this.dialogVisible = false
        //   this.getList()
        //   this.$message({
        //     message: '修改成功',
        //     type: 'success'
        //   })
        // })
      }
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleCurrentChange(val) {
      // 分页
      this.page = val
      this.getList()
    },
    handleSizeChange(val) {
      // 改变一页数据
      this.per_page = val
      this.getList()
    },
    editTenant(data) {
      this.ruleForm = data
      console.log(this.ruleForm, 'this.ruleForm ')
      this.title = '修改餐厅'
      this.dialogVisible = true
    },
    editState(value) {
      // var that = this
      // const data = {
      //   id: value
      // }
      // 修改状态
      this.$confirm('是否修改当前租户状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'primary'
      })
        .then(() => {
          // ChangrState(data).then((res) => {
          //   if (res.code !== 0) return this.$message.error(res.message)
          //   that.getList()
          //   this.$message({
          //     type: 'success',
          //     message: '修改成功!'
          //   })
          // })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          })
        })
    },
    addTenant() {
      this.title = '添加餐厅'
      console.log(this.ruleForm, 'this.ruleForm')
      // this.$refs[formName].resetFields();
      this.dialogVisible = true
    },
    EditPass(value) {
      // var that = this
      // const data = {
      //   id: value
      // }
      // 重置密码
      this.$confirm('是否重置密码?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      })
        .then(() => {
          // ChangrPass(data).then((res) => {
          //   if (res.code !== 0) return this.$message.error(res.message)
          //   that.getList()
          //   this.$message({
          //     type: 'success',
          //     message: '重置成功!'
          //   })
          // })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置'
          })
        })
    },
    delect(id) {
      // 删除
      // var that = this
      // const data = {
      //   id: id
      // }
      this.$confirm('此操作将永久删除该餐厅, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // remove(data).then((res) => {
          //   if (res.code !== 0) return this.$message.error(res.message)
          //   that.getList()
          //   this.$message({
          //     type: 'success',
          //     message: '删除成功!'
          //   })
          // })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleClose(done) {
      done()
    }
    // editClick(val) {
    //   console.log(val, "val");
    //   this.$router.push({ path: "./detail" });
    // }
  }
}
</script>
<style lang="scss" scoped>
.Serach_item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .search_name {
    font-size: 16px;
    min-width: 80px;
  }
}
</style>
