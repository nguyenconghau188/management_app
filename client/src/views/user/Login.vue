<template>
<!-- eslint-disable max-len -->
    <div class="container login-container">
            <div class="row">
                <div class="col-md-6 login-form-1">
                    <h3>Login</h3>
                    <form @submit.prevent="handleSubmit">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Your Email *" v-model="email" />
                            <div v-show="isSubmited && !email" class="invalid-feedback">Email is required!</div>
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" placeholder="Your Password *" v-model="password" />
                            <div v-show="isSubmited && !password" class="invalid-feedback">Password is required!</div>
                        </div>
                        <div class="form-group">
                            <input type="submit" class="btnSubmit" value="Login" />
                        </div>
                        <div class="form-group">
                            <a href="#" class="ForgetPwd">Forget Password?</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      isSubmited: false,
    };
  },
  created() {
    this.forceLogout();
  },
  computed: {
    ...mapState('user', ['isLogin']),
  },
  methods: {
    ...mapActions('user', ['login', 'forceLogout']),
    handleSubmit() {
      this.isSubmited = true;
      const { email, password } = this;
      if (email && password) {
        /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
        console.error(email);
        console.error(password);
        this.login({ email, password });
      }
    },
  },
};
</script>

<style>
.login-container{
    margin-top: 5%;
    margin-bottom: 5%;
}
.login-form-1{
    padding: 5%;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
    margin-left: 25%;
}
.login-form-1 h3{
    text-align: center;
    color: #333;
}
.login-container form{
    padding: 10%;
}
.btnSubmit
{
    width: 50%;
    border-radius: 1rem;
    padding: 1.5%;
    border: none;
    cursor: pointer;
}
.login-form-1 .btnSubmit{
    font-weight: 600;
    color: #fff;
    background-color: #0062cc;
}
.login-form-1 .ForgetPwd{
    color: #0062cc;
    font-weight: 600;
    text-decoration: none;
}
</style>
