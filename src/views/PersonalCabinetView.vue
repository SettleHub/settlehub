<template>
  <div class="personal_cabinet-wrapper">
    <div v-if="isEditing" class="blocks-wrapper">
      <div class="block-wrapper">
        <div class="user_info-inner">
          <div class="user_info-wrapper">
            <div class="avatar-wrapper">
              <img :src="userData?.avatarUrl || require('@/assets/default.avatar.svg')" alt="Avatar" />
            </div>
            <div class="personal_information-wrapper">
              <h4 class="full-name">{{ fullName || "Завантаження..." }}</h4>
              <div class="personal-information">
                <InputComponent
                    v-model:modelValue="this.userData.email"
                    placeholder="Ел. пошта"
                    type="email"
                    :sizeMax="false"
                    :paddingH="6"
                    :paddingV="6"
                    :className="'edit_user_input'" />

                <InputComponent
                    v-model:modelValue="this.userData.phone"
                    placeholder="+380112223344"
                    type="text"
                    :sizeMax="false"
                    :paddingH="6"
                    :paddingV="6"
                    :className="'edit_user_input'" />

                <InputComponent
                    v-model:modelValue="this.userData.birthDate"
                    placeholder="Дата народження"
                    type="date"
                    :sizeMax="false"
                    :paddingH="6"
                    :paddingV="6"
                    :className="'edit_user_input'" />
              </div>
            </div>
          </div>
          <div class="buttons-wrapper flex-right">
            <ButtonComponent
                :label="'Підтвердити зміни'"
                :type="'submit'"
                :paddingH="47"
                :paddingV="13"
                :borderRadius="10"
                :className="'save-button'"
                @click="handleUserUpdate"
            />
          </div>
        </div>
      </div>

<!--      <div class="block-wrapper">-->
<!--        <h5 class="block_header">Змінити пароль</h5>-->
<!--        <div class="reset_password-wrapper">-->
<!--          <div class="reset_inputs_block">-->
<!--            <label class="input_label">Введіть поточний пароль</label>-->
<!--            <InputComponent-->
<!--                v-model:modelValue="currentPassword"-->
<!--                :placeholder="'Пароль'"-->
<!--                :type="'password'"-->
<!--                :sizeMax="false"-->
<!--                :paddingH="6"-->
<!--                :paddingV="6"-->
<!--                :className="'edit_user_input reset_password'" />-->
<!--          </div>-->
<!--          <div class="edit_button_block">-->
<!--            <ButtonComponent-->
<!--                :label="'Продовжити'"-->
<!--                :type="'button'"-->
<!--                :paddingH="70"-->
<!--                :paddingV="13"-->
<!--                :borderRadius="10"-->
<!--                :className="'continue-button'"-->
<!--                @click="continueResetPassword"-->
<!--            />-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </div>

    <div v-else class="blocks-wrapper">
      <div class="block-wrapper">
        <div class="user_info-inner">
          <div class="user_info-wrapper">
            <div class="avatar-wrapper">
              <img :src="userData?.avatarUrl || require('@/assets/default.avatar.svg')" alt="Avatar" />
            </div>
            <div class="personal_information-wrapper">
              <h4 class="full-name">{{ fullName || "Завантаження..." }}</h4>
              <div class="personal-information">
                <p class="email">{{ (this.userData?.email != null && this.userData?.email != "" ) ? `Пошта: ${this.userData.email}` : "" }}</p>
                <p class="phone">{{ (this.userData?.phone != null && this.userData?.phone != "" ) ? `Телефон: ${this.userData.phone}` : "" }}</p>
                <p class="birthday">{{ (this.userData?.birthDate != null && this.userData?.birthDate != "" ) ? `Дата народження: ${this.formatBirthDate(this.userData.birthDate)}` : "" }}</p>
              </div>
            </div>
          </div>
          <div class="buttons-wrapper">
            <ButtonComponent
                :label="'Редагувати інформацію'"
                :type="'button'"
                :paddingH="30"
                :paddingV="13"
                :borderRadius="10"
                :className="'edit-button'"
                @click="toEditing"
            />
            <ButtonComponent
                :label="'Вийти'"
                :type="'button'"
                :paddingH="70"
                :paddingV="13"
                :borderRadius="10"
                :className="'logout-button'"
                @click="handleLogout"
            />
          </div>
        </div>
      </div>
      <div class="block-wrapper">
        <h5 class="block_header">Заявки</h5>
        <div class="submissions-wrapper">
          <table class="submissions-table"
                 v-if="submissionsData?.body != null && Array.isArray(submissionsData.body)"
          >
            <thead>
              <tr>
                <th>Номер</th>
                <th>Пріоритет</th>
                <th>Статус</th>
                <th>Дата створення</th>
                <th>Гуртожиток</th>
                <th>Поверх</th>
                <th>Клітка</th>
                <th>Блок</th>
                <th>Кімната</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(submission, index) in submissionsData.body" :key="index" >
                <td>№{{ submission?.number || "" }}</td>
                <td>1</td>
                <td>
                  {{
                    submission?.status === 'DRAFT' ? 'Чернетка' :
                    submission?.status === 'SUBMITTED' ? 'Подано' :
                    submission?.status === 'UNDER_REVIEW' ? 'На розгляді' :
                    submission?.status === 'APPROVED' ? 'Схвалено' :
                    submission?.status === 'REJECTED' ? 'Відхилено' :
                    submission?.status === 'NEEDS_REVISION' ? 'До розгляду' :
                    submission?.status === 'FINALIZED' ? 'Завершено' :
                    submission?.status === 'CANCELLED' ? 'Скасовано' :
                    'Невідомий статус'
                  }}
                </td>
                <td>{{ submission?.creationDate != null ? formatDate(submission.creationDate) : "-" }}</td>
                <td>{{ submission?.hostel || "-" }}</td>
                <td>{{ submission?.floor || "-" }}</td>
                <td>{{ submission?.section || "-" }}</td>
                <td v-if="submission?.block" class="block-cell">
                  <span class="block-label">{{ submission?.block }}</span>
                  <span class="block-type">
                    {{
                      submission?.blockGender === 'MALE' ? 'Чоловічий блок' :
                      submission?.blockGender === 'FEMALE' ? 'Жіночий блок' :
                      'Невизначений блок'
                    }}
                  </span>
                </td>
                <td v-else>{{ "-" }}</td>
                <td>{{ (submission?.room != null && submission?.room != 0) ? submission.room : "-" }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="submissions_not_found_wrapper">
            <p>У вас жодної поданої заяви</p>
            <div class="button_wrapper">
                <ButtonComponent label="Обрати гуртожиток"
                                :isLink="true"
                                route="/"
                                :paddingV="13"
                                :borderRadius="10"
                                :sizeMax="false" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputComponent from "@/components/InputComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import {getUserData, logout, updateUserContacts} from "@/services/auth";
import {getSubmissionsBySubmitter} from "@/services/submissions";
import dayjs from 'dayjs';

export default {
  name: "PersonalCabinetView",
  components: {InputComponent, ButtonComponent},
  data() {
    return {
      userData: null,
      submissionsData: null,
      isEditing: false,
      currentPassword: '',
    };
  },
  mounted() {
    this.assignFetchedUserData();
    this.fetchSubmissionsData();
  },
  watch: {
    isEditing(newVal) {
      this.$emit('update:isEditing', newVal);
    },
  },
  computed: {
    fullName() {
      if (!this.userData) return null;
      const { lastName = '', firstName = '', middleName = '' } = this.userData || {};
      return `${lastName} ${firstName} ${middleName}`.trim();
    },
  },
  methods: {
    async fetchUserData() {
      try {
        return await getUserData();
      } catch (error) {
        console.error('Помилка при завантаженні даних користувача:', error);
        this.$notify({
          title: "Помилка при завантаженні даних користувача",
          text: `Деталі: ${error.message}`,
          type: "error"
        });
      }
    },
    async assignFetchedUserData() {
      this.userData = await this.fetchUserData();
    },
    async fetchSubmissionsData() {
      try {
        const data = await getSubmissionsBySubmitter(
            localStorage.getItem("userId")
        );
        this.submissionsData = data;
      } catch (error) {
        console.error('Помилка при завантаженні даних користувача:', error);
        this.$notify({
          title: "Помилка при завантаженні даних користувача",
          text: `Деталі: ${error.message}`,
          type: "error"
        });
      }
    },
    toEditing() {
      this.isEditing = true;
    },
    handleLogout() {
      logout();
    },
    async handleUserUpdate() {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (this.userData.email !== "" && !emailRegex.test(this.userData.email)) {
        this.$notify({
          title: "Некоректний формат ел. пошти",
          text: "Перевірте правильність написання вами електронної пошти.",
          type: "warn"
        });
        return;
      }
      const phoneRegex = /^\+380\d{9}$/;
      if (this.userData.phone !== "" && !phoneRegex.test(this.userData.phone)) {
        this.$notify({
          title: "Некоректний формат номеру телефону",
          text: "Перевірте правильність написання вами номеру телефону.",
          type: "warn"
        });
        return;
      }

      const date = new Date(this.userData.birthDate);
      const ISODate = this.toLocalISOString(date);

      try {
        const response = await updateUserContacts(
            this.userData.email,
            this.userData.phone,
            ISODate
        );

        console.log(response);

        switch (response.status) {
          case 200:
            this.$notify({
              title: "Успіх",
              text: "Контактні дані оновлено!",
              type: "success"
            });
            this.errorMessage = "";
            this.isEditing = false;
            break;

          case 400:
            this.$notify({
              title: "Помилка",
              text: "Невірні правильність написання вами пошти та номеру телефону.",
              type: "error"
            });
            break;

          case 401:
            this.$notify({
              title: "Помилка",
              text: "Сесія не дійсна або користувача не автентифіковано.",
              type: "error"
            });
            break;

          case 403:
            this.$notify({
              title: "Помилка",
              text: "Доступ заборонено. Спроба змінити чужі дані?",
              type: "error"
            });
            break;

          case 404:
            this.$notify({
              title: "Помилка",
              text: "Користувача не знайдено.",
              type: "error"
            });
            break;

          case 500:
            this.$router.push({ path: '/internal-error' });
            break;

          default:
            this.$router.push({ path: '/internal-error' });
        }

      } catch (error) {
        console.error(error);
        this.$router.push({ path: '/internal-error' });
      }
    },
    toLocalISOString(date) {
      const pad = n => n.toString().padStart(2, '0');
      const offset = -date.getTimezoneOffset(); // в хвилинах
      const sign = offset >= 0 ? '+' : '-';
      const hours = pad(Math.floor(Math.abs(offset) / 60));
      const minutes = pad(Math.abs(offset) % 60);

      return date.getFullYear() +
          '-' + pad(date.getMonth() + 1) +
          '-' + pad(date.getDate()) +
          'T' + pad(date.getHours()) +
          ':' + pad(date.getMinutes()) +
          ':' + pad(date.getSeconds()) +
          sign + hours + ':' + minutes;
    },
    continueResetPassword() {
      // TODO: Realize me!
    },
    formatDate(dateString) {
      return dayjs(dateString).format('DD.MM.YYYY, HH:mm');
    },
    formatBirthDate(dateString) {
      return dayjs(dateString).format('DD.MM.YYYY');
    },
  },
}
</script>

<style scoped lang="scss">
.personal_cabinet-wrapper {
  padding: 78px 91px 32px;
}

.blocks-wrapper {
  display: flex;
  flex-direction: column;
  gap: 31px;
}

.block-wrapper {
  background-color: $background-white;
  border-radius: 10px;
  @include shadow-light;
  width: 100%;
  padding: 21px 24px 32px;
}

.user_info-inner {
  padding: 25px 26px 18px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.user_info-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 60px;

  .avatar-wrapper {
    @include shadow-light;
    background: transparent;
    border-radius: 100%;
    width: 17%;
    height: max-content;
    max-width: 204px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 102%;
      height: 102%;
      border-radius: 100%;
      @include locked-image;
    }
  }

  .personal_information-wrapper {
    text-align: left;
    .full-name {
      @include poppins-bold();
      @include responsive-font(20, 12, 1440);
      color: $text-dark-blue;
    }
    .personal-information {
      margin-top: 14px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      p {
        @include poppins-bold;
        @include responsive-font(13, 8, 1440);
        color: $text-light-gray;
      }
    }
  }
}

@media (max-width: 768px) {
  .personal_cabinet-wrapper {
    padding: 63px 12px 32px;
  }
  .block-wrapper {
    padding: 20px 14px;
  }
  .user_info-inner {
    padding: 0;
  }
  .user_info-wrapper {
    gap: 20px;
    .avatar-wrapper {
      width: 23%;
    }
  }
}

.buttons-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  &.flex-right {
    justify-content: end;
  }
}
::v-deep(.edit-button),
::v-deep(.logout-button),
::v-deep(.save-button),
::v-deep(.continue-button) {
  @include responsive-font(13, 8, 1440);
  @include poppins-bold;
}

.block_header {
  @include poppins-bold;
  @include responsive-font(20, 10, 1440);
  color: $text-dark-blue;
  margin: 0;
}

.submissions-wrapper,
.reset_password-wrapper {
  padding: 0 26px 0;
  margin-top: 20px;
  overflow-x: auto;
}

.submissions-table {
  width: 100%;
  background: transparent;

  thead {
    tr {
      th {
        padding: 6px 0;
        @include poppins-bold;
        @include responsive-font(16, 8, 1440);
        color: $text-pastel-blue;
        text-wrap: wrap;
        text-align: center;
      }
    }
  }

  tbody {
    tr {
      position: relative;

      td {
        padding: 16px 0;
        @include poppins-bold;
        @include responsive-font(16, 8, 1440);
        color: $text-dark-blue;
        text-wrap: wrap;
        text-align: center;
        border-bottom: 1px solid $sheet-bar-gray;

        &.block-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: end;

          .block-type {
            display: block;
            padding: 4px 8px;
            @include poppins-bold;
            @include responsive-font(10, 6, 1440);
            color: $text-white;
            background-color: $bright-red;
            border-radius: 5px;
          }
        }
      }

      &:last-child td {
        border-bottom: none;
      }
    }
  }
}

@media (max-width: 768px) {
  .submissions-wrapper {
    padding: 0;
  }

  .submissions-table {
    tbody {
      tr {
        td {
          padding: 9px 0;
        }
      }
    }
  }
}

::v-deep(.edit_user_input) {
  @include poppins-bold;
  @include responsive-font(13, 8, 1440);
  border: 1px solid $dark-blue;
  max-width: 250px;
  width: 250px;

  @media (max-width: 768px) {
    height: 20px;
  }
}
.reset_password-wrapper {
  display: flex;
  flex-direction: column;
  gap: 68px;
  .edit_button_block {
    display: flex;
    flex-direction: row;
    justify-content: end;
  }
}

.reset_inputs_block {
  .input_label {
    display: block;
    @include poppins-bold;
    @include responsive-font(16, 10, 1440);
    color: $text-dark-blue;
    margin-bottom: 22px;
  }
}

::v-deep(.logout-button) {
  @media (max-width: 1200px) {
    padding: 9px 40px !important;
  }
  @media (max-width: 768px) {
    padding: 6px 33px !important;
    border-radius: 5px !important;
  }
}

::v-deep(.edit-button),
::v-deep(.save-button) {
  @media (max-width: 1200px) {
    padding: 9px 20px !important;
  }

  @media (max-width: 768px) {
    padding: 6px 10px !important;
    border-radius: 5px !important;
  }
}

.submissions_not_found_wrapper {
  p {
    @include poppins-bold;
    @include responsive-font(18, 16, 1440);
    color: $text-dark-blue;
    text-align: center;
  }
}

.button_wrapper {
  margin: 30px 0;
  padding: 0 10%;
  display: flex;
  justify-content: center;
  align-items: top;
}
</style>
