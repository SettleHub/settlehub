`<template>
  <form>
    <p class="message-error"
       :style="{ visibility: errorMessage ? 'visible' : 'hidden' }"
    >
      {{ errorMessage }}
    </p>
    <div class="elements-wrapper">
      <InputComponent
          v-model:modelValue="username"
          :placeholder="'Ел. пошта'"
          :type="'email'"
          :sizeMax="true" />
      <InputComponent
          v-model:modelValue="password"
          :placeholder="'Пароль'"
          :type="'password'"
          :sizeMax="true" />
      <InputComponent
          v-model:modelValue="repeatedPassword"
          :placeholder="'Повторіть пароль'"
          :type="'password'"
          :sizeMax="true" />
      <div class="buttons-wrapper">
        <ButtonComponent
            :label="'Зареєструватись'"
            :type="'submit'"
            :sizeMax="true"
            :paddingV="14"
            :borderRadius="10"
            :className="'login-button'"
            @click="handleRegister"
        />
      </div>
    </div>
  </form>
</template>

<script>
import InputComponent from "@/components/InputComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import { register } from "@/services/auth";

export default {
  name: "RegisterForm",
  components: {ButtonComponent, InputComponent},
  data() {
    return {
      username: "",
      password: "",
      repeatedPassword: "",
      errorMessage: "",
    };
  },
  props: {
    method: {
      type: String,
      required: false,
      default: "login"
    },
  },
  methods: {
    changeMethod(newMethod) {
      this.$emit('update:method', newMethod);
    },
    handleRegister() {
      if (!this.username || !this.password || !this.repeatedPassword ) {
        this.errorMessage = "Будь ласка, заповніть всі поля";
        return;
      }
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(this.username)) {
        this.errorMessage = "Некоректний формат ел. пошти";
        return;
      }
      if (this.password !== this.repeatedPassword) {
        this.errorMessage = "Паролі повинні збігатися";
        return;
      }

      this.proceedRegister(this.username, this.password);
    },

    async proceedRegister(username, password) {
      const response = await register(username, password);
      if (response) {
        if (response.status === 200) {
          this.$notify({
            title: "Пройдіть верифікацію!",
            text: "Ми надіслали листа для підтвердження на вашу електронну пошту. Будь ласка, перевірте вхідні повідомлення та папку 'Спам'.",
            type: "info"
          });
          this.changeMethod('login');
        } else if (response.status === 409) {
          this.$notify({
            title: "Сталася помилка!",
            text: "Користувач з такою поштою вже зареєстрований.",
            type: "error"
          });
        } else if (response.status === 404) {
          this.$notify({
            title: "Сталася помилка!",
            text: "Нажаль ми не можемо вас зареєструвати на нашому сервісі.",
            type: "error"
          });
        } else {
          this.$router.push({path: '/internal-error'});
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.elements-wrapper {
  max-width: 342px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 50px;
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
  margin: 15px auto 0;
  color: $text-light-gray;
  text-align: center;
  text-decoration: none;
}
</style>`