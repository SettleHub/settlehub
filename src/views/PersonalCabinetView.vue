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
                    placeholder="Телефон"
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
                :type="'button'"
                :paddingH="47"
                :paddingV="13"
                :borderRadius="10"
                :className="'save-button'"
                @click="handleUserUpdate"
            />
          </div>
        </div>
      </div>

      <div class="block-wrapper">
        <h5 class="block_header">Змінити пароль</h5>
        <div class="reset_password-wrapper">
          <div class="reset_inputs_block">
            <label class="input_label">Введіть поточний пароль</label>
            <InputComponent
                v-model:modelValue="currentPassword"
                :placeholder="'Пароль'"
                :type="'password'"
                :sizeMax="false"
                :paddingH="6"
                :paddingV="6"
                :className="'edit_user_input reset_password'" />
          </div>
          <div class="edit_button_block">
            <ButtonComponent
                :label="'Продовжити'"
                :type="'button'"
                :paddingH="70"
                :paddingV="13"
                :borderRadius="10"
                :className="'continue-button'"
                @click="continueResetPassword"
            />
          </div>
        </div>
      </div>
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
                <p class="email">{{ this.userData?.email || "" }}</p>
                <p class="phone">{{ this.userData?.phone || "" }}</p>
                <p class="birthday">{{ this.userData?.birthDate || "" }}</p>
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
                 v-if="submissionsData"
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
                <td>{{ submission?.creationDate != null ? formatDate(date) : "-" }}</td>
                <td>{{ "-" }}</td>
                <td>{{ "-" }}</td>
                <td>{{ "-" }}</td>
                <td v-if="submission?.blockCell" class="block-cell">
                  <span class="block-label">А</span>
                  <span class="block-type">Жіночий блок</span>
                </td>
                <td v-else>{{ "-" }}</td>
                <td>{{ "-" }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputComponent from "@/components/InputComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import {getUserData, logout} from "@/services/auth";
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
    this.fetchUserData();
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
        const data = await getUserData();
        this.userData = data;
      } catch (error) {
        console.error('Помилка при завантаженні даних користувача:', error);
      }
    },
    async fetchSubmissionsData() {
      try {
        const data = await getSubmissionsBySubmitter(
            localStorage.getItem("userId")
        );
        this.submissionsData = data;
      } catch (error) {
        console.error('Помилка при завантаженні даних користувача:', error);
      }
    },
    toEditing() {
      this.isEditing = true;
    },
    handleLogout() {
      logout();
    },
    handleUserUpdate() {
      // TODO: validate data
      // TODO: request to API
      this.isEditing = false;
    },
    continueResetPassword() {
      // TODO: Realize me!
    },
    formatDate(dateString) {
      return dayjs(dateString).format('DD.MM.YYYY, HH:mm');
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

::v-deep(.edit_user_input) {
  @include poppins-bold;
  @include responsive-font(13, 8, 1440);
  border: 1px solid $dark-blue;
  max-width: 250px;
  width: 250px;
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


</style>