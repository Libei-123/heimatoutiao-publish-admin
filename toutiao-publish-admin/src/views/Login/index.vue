<template>
  <div class="login-container">
    <div class="login-form-wrap">
       <div class="login-head">
        <div class="logo"></div>
      </div>
      <el-form class="login-form" :rules="formRules" ref="formLogin" :model="user">
        <el-form-item prop="mobile">
          <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="user.agree"
            >我已阅读并同意用户协议和隐私条款</el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" :loading="loginLoading" @click="onSubmit"
            >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810', // 验证码
        agree: false // 是否同意协议
      },
      loginLoading: false, // 登录的loading 状态
      formRules: {
        // 校验规则
        mobile: [
          // trigger 用来配置触发校验的时机，有两个选项，change 是当输入的内容发送变化的时候，blur 当失去焦点的时候
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式', trigger: 'change' }
        ],
        agree: [
          {
            // 自定义校验规则：https://element.eleme.cn/#/zh-CN/component/form#zi-ding-yi-xiao-yan-gui-ze
            // 验证通过：callback()
            // 验证失败：callback(new Error('错误消息'))
            // validator 验证函数不是你来调用的，而是当 element 表单触发验证的时候它会自己内部调用
            // 所以你只需要提供校验函数处理逻辑就可以了
            //   通过：callback()
            validator: (rule, value, callback) => {
            // value 状态 通过callback
              console.log(value)
              if (value) {
                // 验证通过
                callback()
              } else {
                // 验证失败
                callback(new Error('请同意用户协议'))
              }
            },
            // message: '请勾选同意用户协议',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSubmit () {
      this.$refs.formLogin.validate((valid) => {
        if (!valid) {
          return
        }
        this.onLogin()
      })
    },
    onLogin () {
      this.loginLoading = true
      login(this.user).then((res) => {
        if (res.data) {
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          this.loginLoading = false
          window.sessionStorage.setItem('user', JSON.stringify(res.data.data))
          this.$router.push('/home')
        }
      }).catch(err => {
        console.log('登录失败', err)
        this.$message.error('登录失败，手机号或验证码错误')
        this.loginLoading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url('../../assets/login_bg.jpg') no-repeat;
    background-size: cover;
    .login-form-wrap {
      min-width: 300px;
      padding: 30px 50px 10px;
      background-color: #fff;
      .login-head {
        display: flex;
        justify-content: center;
        .logo {
          width: 200px;
          height: 57px;
          background: url('../../assets/logo_index.png') no-repeat;
          background-size: contain;
        }
      }
      .login-form {
        .login-btn {
          width: 100%;
        }
      }
    }
  }
</style>
