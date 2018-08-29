<template>
  <div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="num"
      :page-size = 10
      :current-page = 2
      @prev-click = 'prevClick'
      @next-click = 'nextClick'
   >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'page',
  props: {
    num: Number
  },
  methods: {
    prevClick: () => {
    },
    nextClick: () => {
    }
  }
}
</script>
