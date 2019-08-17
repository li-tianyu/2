<template>
  <div>
    <el-container class="wrapper">
      <el-aside :width="menuShow?'64px':'200px'">
        <div class="logo" :class="{ menuLogo: menuShow }"></div>
        <!-- 导航菜单 -->
        <el-menu
          router
          :collapse="menuShow"
          :collapse-transition="false"
          default-active="1"
          background-color="#002033"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/article">
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="/image">
            <i class="el-icon-picture"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="/publish">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="/comment">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="/fans">
            <i class="el-icon-present"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>
          <el-menu-item index="/setting">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-header>
            <span class="el-icon-s-fold" @click="menuShow=!menuShow"></span>
            <span class="text">江苏传智播客科技教育有限公司</span>
            <el-dropdown class='my-dropdown' >
          <span class="el-dropdown-link">
            <img src="../../assets/images/avatar.jpg" alt="">
            用户名称
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="setting">个人设置</el-dropdown-item>
                <el-dropdown-item @click.native="loginOut">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-header>
        </el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      menuShow: false
    }
  },
  methods: {
    setting () {
      this.$router.push('/setting')
    },
    // 另外实现方式：
    // <el-dropdown class="my-dropdown" @command="changeMenu">
    // 绑定事件的时候 不加括号  为了接受默认参数
    //  changeMenu (menuType) {
    //   menuType 是变量  值 setting  logout
    //   this[menuType]()
    // }
    loginOut () {
      // this.$router.push('/login')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped lang="less">
  .wrapper{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    .el-aside{
      background: #002033;
    }
    .el-header{
      border-bottom: 1px solid #ddd;
    }
  }

  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .el-icon-s-fold {
      font-size: 24px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
      padding-left: 10px;
    }
    .my-dropdown {
      float: right;
      img {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
      .el-dropdown-link {
        font-weight: bold;
      }
    }
  }
  .logo {
    width: 100%;
    height: 60px;
    background: #002244 url(../../assets/images/logo_admin.png) no-repeat center /
    140px auto;
  }
  .menuLogo {
    background-image: url(../../assets/images/logo_admin_01.png);
    background-size: 36px auto;
  }
  .el-menu{
    border-right: none;
  }
</style>
