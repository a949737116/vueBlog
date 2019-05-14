<style lang='less' scope>
  #mtb {
    background-color: inherit;
    i {
      font-size:40px;
      color: #F56C6C
    }
    .dialog {
      position: relative;
      .modelBtn {
        position: absolute;
        top: 20px;
        right: 20px;
      }
    }
  }
</style>
<template>
  <div id='mtb'>
    <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        <i class="el-icon-menu"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">首页</el-dropdown-item>
        <el-dropdown-item command='b' >博文分类</el-dropdown-item>
        <el-dropdown-item command="c">我的网站</el-dropdown-item>
        <el-dropdown-item command="d">联系方式</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog title="分类" :visible.sync="dialogTableVisible" :showClose='false' width='60%' custom-class='dialog'>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
           v-if='item.show==="是" ? true : false'
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" class='modelBtn' size='small' @click='linkToRouter'>确认</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'mTarBar',
  props: {
    isAdmin: Boolean,
    options: Array
  },
  data () {
    return {
      isCollapse: true,
      dialogTableVisible: false,
      value: ''
    }
  },
  methods: {
    handleCommand (command) {
      switch (command) {
        case 'a':
          this.$router.push('/')
          break
        case 'c':
          window.open('http://www.lizenghao.top')
          break
        case 'b':
          this.dialogTableVisible = true
          break
      };
    },
    linkToRouter () {
      this.dialogTableVisible = false
      this.$router.push({
        path: `/?cateId=${this.value}`
      })
    }
  }
}
</script>
