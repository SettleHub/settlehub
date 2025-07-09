<template>
  <form>
    <div class="form_elements_wrapper">
      <p class="message_title form_title"
         :style="{ visibility: formTitle ? 'visible' : 'hidden' }"
      >
        {{ formTitle }}
      </p>
      <p class="message_title message-error"
         :style="{ visibility: errorMessage ? 'visible' : 'hidden' }"
      >
        {{ errorMessage }}
      </p>
      <div class="inputs_switcher">

        <div v-if="this.step == Steps.EMAIL_INPUT" class="elements-wrapper">
            <InputComponent
              v-model:modelValue="email"
              :placeholder="'Ел. Пошта'"
              :type="'email'"
              :sizeMax="true" />
            <div class="buttons-wrapper">
                <ButtonComponent
                    :label="'Продовжити'"
                    :type="'submit'"
                    :sizeMax="true"
                    :paddingV="14"
                    :borderRadius="10"
                    :className="'form-button'"
                    @click="handleSendVerification"
                />
            </div>
        </div>

        <div v-else-if="this.step == Steps.CODE_INPUT" class="elements-wrapper">
          <InputComponent
              v-model:modelValue="verificationCode"
              :placeholder="'Код'"
              :type="'text'"
              :maxValueLength="8"
              :sizeMax="true"
              :className="'verification_code'" />
          <div class="buttons-wrapper">
            <ButtonComponent
                :label="'Продовжити'"
                :type="'submit'"
                :sizeMax="true"
                :paddingV="14"
                :borderRadius="10"
                :className="'form-button'"
                @click="handleCheckVerification"
            />
          </div>
        </div>

        <div v-else-if="this.step == Steps.PASSWORD_RESET" class="elements-wrapper">
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
                :label="'Підтвердити'"
                :type="'submit'"
                :sizeMax="true"
                :paddingV="14"
                :borderRadius="10"
                :className="'form-button'"
                @click="handleResetPassword"
            />
          </div>
        </div>

      </div>
    </div>
  </form>
</template>

<script>
import InputComponent from "@/components/InputComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import {resetForgottenPassword, sendForgotPasswordRequest, verifyForgotPasswordUserCode} from "@/services/auth";

const Steps = {
  EMAIL_INPUT: "emailInput",
  CODE_INPUT: "codeInput",
  PASSWORD_RESET: "passwordReset",
  SUCCESS: "success"
};

export default {
  name: "ResetPasswordForm",
  components: {ButtonComponent, InputComponent},
  data() {
    return {
      Steps,
      step: Steps.EMAIL_INPUT,
      email: "",
      verificationCode: "",
      password: "",
      repeatedPassword: "",
      formTitle: "Код для зміни паролю буде надіслано на електронну пошту",
      errorMessage: ""
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
    isContainsEmptyFields(field) {
      if (!field) {
        this.errorMessage = "Будь ласка, заповніть всі поля";
        return true;
      }
      return false;
    },
    handleSendVerification() {
      if (this.isContainsEmptyFields(this.email)) return;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(this.email)) {
        this.errorMessage = "Некоректний формат ел. пошти";
        return;
      }
      this.errorMessage = "";
      this.proceedSendVerification(this.email);
    },

    async proceedSendVerification(email) {
      const response = await sendForgotPasswordRequest(email);
      if (response) {
        if (response.status === 200) {
          this.$notify({
            title: "Код для відновлення пароля",
            text: "Ми надіслали листа з кодом для відновлення пароля на вашу електронну пошту. Перевірте вхідні повідомлення та папку 'Спам'.",
            type: "info"
          });
          this.step = Steps.CODE_INPUT;
          this.formTitle = "Введіть код";
        } else if (response.status === 206) {
          this.$notify({
            title: "Не вдалося надіслати код",
            text: "Ми не змогли надіслати вам код для відновлення пароля на вашу пошту. Спробуйте ще раз або зверніться до служби підтримки.",
            type: "warning"
          });
        } else if (response.status === 404) {
          this.notifyUserNotFound();
        } else if (response.status === 422) {
          this.$notify({
            title: "Невірні дані",
            text: "Схоже, що ви ввели некоректні дані. Перевірте введений email.",
            type: "error"
          });
        } else {
          this.notifyInternalError();
        }
      } else {
        this.$router.push({path: '/internal-error'});
      }
    },

    handleCheckVerification() {
      if (this.isContainsEmptyFields(this.verificationCode)) return;
      if (!(this.verificationCode.length === 8)) {
        this.errorMessage = "Некоректне значення коду";
        return;
      }
      this.errorMessage = "";
      this.proceedCheckVerification(this.email, this.verificationCode);
    },

    async proceedCheckVerification(email, code) {
      const response = await verifyForgotPasswordUserCode(email, code);
      if (response) {
        if (response.status === 200) {
          this.step = Steps.PASSWORD_RESET;
          this.formTitle = "Введіть новий пароль";
        } else if (response.status === 404) {
          this.notifyUserNotFound();
        } else if (response.status === 400) {
          this.$notify({
            title: "Невірний код",
            text: "Введено неправильний код підтвердження. Перевірте код і спробуйте ще раз.",
            type: "error"
          });
        } else {
          this.notifyInternalError();
        }
      } else {
        this.$router.push({path: '/internal-error'});
      }
    },

    handleResetPassword() {
      if (this.isContainsEmptyFields(this.password)) return;
      if (this.isContainsEmptyFields(this.repeatedPassword)) return;
      if (this.password !== this.repeatedPassword) {
        this.errorMessage = "Паролі повинні збігатися";
        return;
      }
      this.errorMessage = "";
      this.proceedResetPassword(this.email, this.verificationCode, this.password);
    },

    async proceedResetPassword(email, code, password) {
      const response = await resetForgottenPassword(email, code, password);
      if (response) {
        if (response.status === 200) {
          this.$notify({
            title: "Пароль змінено",
            text: "Користувачу, ваш пароль було успішно змінено. Тепер ви можете увійти на сайт, використовуючи новий пароль.",
            type: "info"
          });
          this.step = Steps.SUCCESS;
          this.changeMethod('login');
        } else if (response.status === 404) {
          this.notifyUserNotFound();
        } else if (response.status === 400) {
          this.$notify({
            title: "Некоректні дані",
            text: "Запит містить некоректні або неповні дані. Перевірте введену інформацію та спробуйте ще раз.",
            type: "error"
          });
        } else {
          this.notifyInternalError();
        }
      } else {
        this.$router.push({path: '/internal-error'});
      }
    },

    notifyUserNotFound() {
      this.$notify({
        title: "Користувача не знайдено",
        text: "Користувача з таким логіном не знайдено.",
        type: "error"
      });
    },
    notifyInternalError() {
      this.$notify({
        title: "Внутрішня помилка",
        text: "Сталася непередбачена помилка. Спробуйте пізніше або зверніться до підтримки.",
        type: "error"
      });
    },
    changeMethod(newMethod) {
      this.$emit('update:method', newMethod);
    },
  },
}
</script>

<style scoped lang="scss">
form {
  width: max-content;
  height: max-content;
}

.form_elements_wrapper {
  padding: 15px 0 60px;
}

.inputs_switcher {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.elements-wrapper {
  max-width: 342px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.message_title {
  visibility: visible;
  text-align: center;
  @include poppins-bold;
  @include responsive-font(15, 11, 1440);
  display: block;
  width: 100%;
  height: max-content;
  text-wrap: wrap;
  margin: 0 auto 4px;
  &.form_title {
    color: $text-dark-blue;
  }
  &.message-error {
    color: $text-red;
  }
}

::v-deep(.form-button) {
  @include responsive-font(20, 13, 1440);
  @include poppins-bold;
}

::v-deep(.verification_code) {
  letter-spacing: 2px;
  text-align: center;
  color: $text-dark-blue;
}
</style>
