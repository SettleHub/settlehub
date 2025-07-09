<template>
  <div class="auth_block-wrapper">
    <AuthToggler v-model:method="this.internalMethod" />

    <div v-if="internalMethod === 'login'" class="form-wrapper">
      <LoginForm v-model:method="this.internalMethod"
                 :hidePopup="this.hidePopup"
                 :jwtCheck="jwtCheck" />
    </div>

    <div v-if="internalMethod === 'register'" class="form-wrapper">
      <RegisterForm v-model:method="this.internalMethod" />
    </div>

    <div v-if="internalMethod === 'forgot_password'" class="form-wrapper">
      <ResetPasswordForm v-model:method="this.internalMethod" />
    </div>

  </div>
</template>

<script>
import AuthToggler from "@/components/AuthToggler.vue";
import LoginForm from "@/components/LoginForm.vue";
import RegisterForm from "@/components/RegisterForm.vue";
import ResetPasswordForm from "@/components/ResetPasswordForm.vue";

export default {
  components: {
    ResetPasswordForm,
    LoginForm,
    RegisterForm,
    AuthToggler,
  },
  data() {
    return {
      internalMethod: this.method || 'login',
      internalForgotPassword: this.forgotPassword || 'false'
    };
  },
  props: {
    method: {
      type: String,
      required: false,
    },
    forgotPassword: {
      type: Boolean,
      required: false,
    },
    hidePopup: {
      type: Function,
      required: true
    },
    jwtCheck: {
      type: Function,
      required: true,
    },
  },
  watch: {
    internalMethod(newVal) {
      this.$emit('update:method', newVal);
    },
    method(newVal) {
      this.internalMethod = newVal;
    },
    internalForgotPassword(newVal) {
      this.$emit('update:forgotPassword', newVal);
    },
    forgotPassword(newVal) {
      this.internalForgotPassword = newVal;
    }
  },
  created() {
    if (this.method != null) {
      this.internalMethod = this.method;
    }
    if (this.forgotPassword != null) {
      this.internalForgotPassword = this.forgotPassword;
    }
  }
};
</script>


<style scoped lang="scss">
.form-wrapper {
  margin: 10px auto 0;
  display: flex;
  justify-content: center;
}
.auth_block-wrapper {
  width: 44vw;
  max-width: 638px;
  margin: 0 auto;
  padding: 23px 38px 20px;
  background-color: $background-white;
  @include poppins-bold;
  color: $text-dark-blue;
  border-radius: 10px;
  @include shadow-light;
}

@media (max-width: 920px) {
    .auth_block-wrapper {
        width: 100%;
    }
}
@media (max-width: 768px) {
    .form-wrapper {
        margin-top: 40px;
    }
    .auth_block-wrapper {
        padding: 23px 18px 20px;
    }
}

</style>
