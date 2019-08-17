<template>
  <div>
    <el-card>
      <div slot="header">
        <Bread>内容管理</Bread>
      </div>
      <el-form>
        <el-form-item>
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <el-select value="" clearable v-model="reqParams.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="reqParams.dateArr"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="screen" type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-table
      :data="tableData">
      <!-- el-table-column 表格组件 prop指定字段显示该字段的值  label列标题 -->
      <el-table-column
        prop="pubdate"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="80">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="reqParams.per_page"
      :current-page="reqParams.page"
      @current-change="changePager">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      // 筛选项表单数据  提交给后台参数
      reqParams: {
        // 文章状态
        status: null,
        // 频道ID
        channel_id: null,
        // 手机号和验证码
        mobile: '13911111111',
        code: '246810',
        // 日期数据
        dateArr: [],
        // 页数
        page: 1,
        // 数量
        per_page: 10
      },
      // 获取的总条数
      total: null,

      // 频道下拉选项数据
      channelOptions: [],

      // 返回显示表格数据
      tableData: [
        {
          pubdate: null,
          status: null,
          title: null
        }
      ]
    }
  },
  // 钩子
  created () {
    this.getChannelOptions()
    this.screen()
  },
  watch: {
    'reqParams.channel_id': function (newVal, oldVal) {
      if (newVal === '') {
        this.reqParams.channel_id = null
      }
    }
  },
  methods: {
    // 文章查询
    async screen () {
      try {
        const { data } = await this.$http.get('articles', { params: this.reqParams })
        console.log(data)
        this.tableData = data.data.results
        this.total = data.data.total_count
      } catch {
        this.$message.error('精神病')
      }
    },
    // 频道获取
    async getChannelOptions () {
      try {
        const { data: { data } } = await this.$http.get('channels', this.UserInformation)
        this.channelOptions = data.channels
      } catch {
        this.$message.error('频道获取失败')
      }
    },
    changePager (newPage) {
      // 修改获取数据的页码
      this.reqParams.page = newPage
      this.screen()
    }
  }
}
</script>

<style scoped lang="less">

</style>
<!--```html-->
<!--<el-date-picker @change="changeDate"-->
<!--                ```-->

<!--                ```js-->
<!--// 日期选择后的事件-->
<!--changeDate (dateArr) {-->
<!--// 严谨一些，清空数据考虑在内-->
<!--if (dateArr) {-->
<!--this.reqParams.begin_pubdate = dateArr[0]-->
<!--this.reqParams.end_pubdate = dateArr[1]-->
<!--} else {-->
<!--this.reqParams.begin_pubdate = null-->
<!--this.reqParams.end_pubdate = null-->
<!--}-->
<!--},-->
