<template>
  <form>
    <p class="message-error"
       :style="{ visibility: errorMessage ? 'visible' : 'hidden' }"
    >
      {{ errorMessage }}
    </p>
    <div class="elements-wrapper">
      <InputComponent
          v-model:modelValue="username"
          :placeholder="'Логін'"
          :type="'email'"
          :sizeMax="true" />
      <InputComponent
          v-model:modelValue="password"
          :placeholder="'Пароль'"
          :type="'password'"
          :sizeMax="true" />
      <div class="buttons-wrapper">
        <ButtonComponent
            :label="'Увійти'"
            :type="'button'"
            :sizeMax="true"
            :paddingV="14"
            :borderRadius="10"
            :className="'login-button'"
            @click="handleLogin"
        />
<!--        For the better time-->
<!--        -->
<!--        <p class="highlighted_offer">або</p>-->
<!--        <ButtonComponent-->
<!--            :label="'Дія'"-->
<!--            :isLink="true"-->
<!--            :route="'/auth-with-diia/'"-->
<!--            :sizeMax="true"-->
<!--            :paddingV="14"-->
<!--            :borderRadius="10"-->
<!--            :className="'login-button button-diia'"-->
<!--        />-->

<!--        TODO: Forget password functionality! -->
        <router-link
            :to="'/forget-password/'"
            class="forget_password_button"
        >
          Забули пароль?
        </router-link>
      </div>
    </div>
  </form>
</template>

<script>
import InputComponent from "@/components/InputComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import { login } from "@/services/auth";

export default {
  name: "LoginForm",
  components: {ButtonComponent, InputComponent},
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  props: {
    hidePopup: {
      type: Function,
      required: true
    },
    jwtCheck: {
      type: Function,
      required: true,
    }
  },
  methods: {
    handleLogin() {
      if (!this.username || !this.password) {
        this.errorMessage = "Будь ласка, заповніть всі поля";
        return;
      }

      this.proceedLogin(this.username, this.password);
    },

    async proceedLogin(username, password) {
      const response = await login(username, password);
      if (response) {
        if (response.status == 200) {
          this.hidePopup(new Event("User authorization"));
          this.$router.replace({ path: this.$route.path });
          this.$router.go();
          this.jwtCheck();
        } else {
          this.errorMessage = "Невірний логін або пароль!"
        }
      } else {
        this.$router.push({path: '/internal-error'});
      }
    },
  },
}
</script>

<style scoped lang="scss">
form {
  width: max-content;
  height: max-content;
}

.elements-wrapper {
  max-width: 342px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.message-error {
  visibility: visible;
  color: $text-red;
  text-align: center;
  @include poppins-bold;
  @include responsive-font(15, 11, 1440);
  display: block;
  width: 100%;
  height: max-content;
  text-wrap: wrap;
  margin: 0 auto 4px;
}

::v-deep(.login-button) {
  @include responsive-font(20, 13, 1440);
  @include poppins-bold;
}

::v-deep(.button-diia) {
  background-color: $black !important;
}

.highlighted_offer {
  @include calibri-bold;
  @include responsive-font(15, 11, 1440);
  color: $text-deep-black;
  text-align: center;
  margin: 9px 0;
}

.forget_password_button {
  display: block;
  visibility: hidden;
  margin: 15px auto 0;
  color: $text-light-gray;
  text-align: center;
  text-decoration: none;
}
</style>