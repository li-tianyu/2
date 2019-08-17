<template>
  <div class="loginBackground">
    <el-card class="box-card" style="width: 400px">
      <div style="text-align: center;margin-bottom: 10px;">
        <img src="../../assets/images/logo_index.png" alt="" width="200"/>
      </div>
      <!--      // v-model绑定表单为以后获取表单元素使用-->
      <!--      // rules是组件提供的校验规则，并可以给子表单组件prop设置校验的规则-->
      <el-form ref="form" :model="loginForm" :rules="rules">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" autocomplete="off" placeholder="验证码"
                    style="width: 245px; margin-right: 30px;"></el-input>
          <el-button>验证码</el-button>
        </el-form-item>
        <el-form-item prop="checked">
          <el-checkbox v-model="loginForm.checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="loginRule" type="primary" style="width: 100%">登陆</el-button>
        </el-form-item>
      </el-form>

    </el-card>
  </div>
</template>

<script>import store from '@/store/'

export default {
  name: 'index',
  data () {
    const validatemobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不正确'))
      }
    }

    const code = (rule, value, callback) => {
      if (value !== '246810') {
        callback(new Error('请再次输入密码'))
      } else {
        callback()
      }
    }

    const validatechecked = (rule, value, callback) => {
      if (value === false) {
        callback(new Error('请勾选'))
      }
      callback()
    }
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810',
        checked: true
      },
      rules: {
        mobile: [{ validator: validatemobile, trigger: 'blur' }],
        code: [{ validator: code, trigger: 'blur' }],
        checked: [{ validator: validatechecked, trigger: 'blur' }]
      }
    }
  },
  mounted () {
    store.clearUser()
  },
  methods: {
    loginRule () {
      try {
        this.$refs.form.validate(async (validate) => {
          if (validate) {
            const { data: { data } } = await this.$http.post('authorizations', this.loginForm)
            store.setUser(data.token)
            await this.$router.push('/')
          }
        })
      } catch {
        this.$message.error('登陆错误')
      }
    }
  }
}
</script>

<style scoped lang="less">
  .loginBackground {
    position: absolute;
    height: 100%;
    width: 100%;
    background: url("../../assets/images/login_bg.jpg") no-repeat center / cover;

    .box-card {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
