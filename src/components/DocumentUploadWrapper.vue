<template>
  <div class="form-container">
    <div class="section section-one">
      <div class="room-section">
        <div class="header">
          <h3>Обраний гуртожиток та кімната:</h3>
          <ButtonComponent label="Змінити" :isLink=true route="/hostels" :className="'change_button'" />
        </div>

        <div class="room-info">
          <div class="room-detail">
            <span class="label">Гуртожиток:</span>
            <span class="value">№{{ this.hostel.number }}</span>
          </div>
          <div class="room-detail">
            <span class="label">Поверх:</span>
            <span class="value">{{ this.hostel.floor }}</span>
          </div>
          <div v-if="this.hostel.section" class="room-detail">
            <span class="label">Клітка:</span>
            <span class="value">{{ this.hostel.section }}</span>
          </div>
          <div v-if="this.hostel.block" class="room-detail">
            <span class="label">Блок:</span>
            <span :class="`value ${this.hostel.blockGender === 'MALE' ? 'value-blue_background' :
                                  this.hostel.blockGender === 'FEMALE' ? 'value-red_background' :
                                  'value-gray_background'}`">
              <span>{{ this.hostel.block }}</span>
            </span>
          </div>
          <div v-if="this.hostel.room" class="room-detail">
            <span class="label">Кімната:</span>
            <span class="value">{{ this.hostel.room }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="section section-two">
      <h3 class="upload-header">Завантаження документів</h3>
      <FormToggler v-model:submissionType="this.submissionType" />

      <!--       v-model:passportDocuments="{ data: this.passportDocuments, type: this.uploadedFiles.name }"-->
      <AnnualSubmissionForm v-if="submissionType === SUBMISSION_TYPE.SETTLEMENT_STUDENT_FOR_A_YEAR"
                            v-model:statementDocuments="this.statementDocuments"
                            v-model:passportDocuments="this.passportDocuments"
                            v-model:idCodeDocuments="this.idCodeDocuments"
                            v-model:photoDocuments="this.photoDocuments"
                            v-model:gender="this.gender"
                            v-model:phone="this.phone"
                            v-model:email="this.email" />

      <SummerSubmissionForm v-else-if="submissionType === SUBMISSION_TYPE.SETTLEMENT_STUDENT_FOR_A_SUMMER"
                            v-model:statementDocuments="this.statementDocuments"
                            v-model:phone="this.phone"
                            v-model:email="this.email" />

      <button type="button"
              class="submit-button"
              @click="handlePostSubmission"
      >Відправити</button>
    </div>
  </div>
</template>

<script>
import ButtonComponent from '@/components/ButtonComponent.vue';
import { getHostel } from "@/services/selectStorage";
import { createSubmission } from "@/services/submissions";
import SummerSubmissionForm from "@/components/SummerSubmissionForm.vue";
import AnnualSubmissionForm from "@/components/AnnualSubmissionForm.vue";
import FormToggler from "@/components/FormToggler.vue";
import { SUBMISSION_TYPE } from "@/types/SubmissionTypes";
import {GENDER} from "@/types/Gender";

export default {
  components: {
    AnnualSubmissionForm,
    FormToggler,
    ButtonComponent,
    SummerSubmissionForm,
  },
  data() {
    return {
      hostel: getHostel(),
      statementDocuments: [],
      passportDocuments: [],
      idCodeDocuments: [],
      photoDocuments: [],
      phone: "",
      email: "",
      gender: GENDER.NOT_SPECIFIED,
      showInstructions: false,
      device: this.$route.query.device || 'mobile',
      SUBMISSION_TYPE,
      submissionType: SUBMISSION_TYPE.SETTLEMENT_STUDENT_FOR_A_YEAR,
    };
  },
  methods: {
    handlePostSubmission() {
      if (this.isContainsEmptyFields()) return;
      if (this.isEmailIncorrect()) return;

      const submissionObject = {
        submitterId: localStorage.getItem("userId"),
        phones: {
          transmittedViaSystem: this.phone,
        },
        emails: {
          transmittedViaSystem: this.email,
        },
        type: this.submissionType,
        description: "",
        hostel: this.hostel.number || 0,
        floor: this.hostel.floor || 0,
        section: this.hostel.section || 0,
        block: this.hostel.block || "",
        blockGender: this.gender || GENDER.NOT_SPECIFIED,
        room: this.hostel.room || "",
      };

      let documents = [];
      if (this.submissionType === SUBMISSION_TYPE.SETTLEMENT_STUDENT_FOR_A_YEAR) {
        documents = [...this.statementDocuments,
          ...this.passportDocuments,
          ...this.idCodeDocuments,
          ...this.photoDocuments];
      } else {
        documents = [...this.statementDocuments];
      }

      this.postSubmission(submissionObject, documents);
    },
    async postSubmission(data, files) {
      try {
        const response = await createSubmission(data, files);

        if (!response) {
          this.$router.push({ path: '/internal-error' });
          return;
        }

        switch (response.status) {
          case 201:
            this.$notify({
              title: "Успішно!",
              text: "Заява була успішно передана, слідкуйте за її станом в особистому кабінеті.",
              type: "success"
            });
            setTimeout(() => {
              this.$router.push({ path: '/' });
            }, 3000);
            break;

          case 207:
            this.$notify({
              title: "Частково переданий запит.",
              text: "Деякі файли не вдалося завантажити. Спробуйте ще раз або зверніться до підтримки.",
              type: "warn"
            });
            break;

          case 403:
            this.$notify({
              title: "Сталася помилка!",
              text: "У вас немає прав для завантаження файлів або доступу до цієї дії.",
              type: "error"
            });
            break;

          case 409:
            this.$notify({
              title: "Сталася помилка!",
              text: "Заява вже подана. Ви не можете подати її повторно.",
              type: "error"
            });
            break;

          case 429:
            this.$notify({
              title: "Ліміт подання заявок вичерпано.",
              text: "Дочекайтеся завершення минулих або ж зверніться до підтримки по допомогу.",
              type: "error"
            });
            this.$router.push({ path: '/' });
            break;

          case 500:
            this.$router.push({ path: '/internal-error' });
            break;

          default:
            this.$router.push({ path: '/internal-error' });
            break;
        }
      } catch (error) {
        console.error("Помилка при відправленні запиту:", error);
        this.$notify({
          title: "Сталася помилка!",
          text: `Деталі: ${error.message}`,
          type: "error"
        });
      }
    },
    isContainsEmptyFields() {
      let containsEmptyFields = false;
      if (this.submissionType === SUBMISSION_TYPE.SETTLEMENT_STUDENT_FOR_A_YEAR) {
        containsEmptyFields = (this.statementDocuments.length === 0
            || this.passportDocuments.length === 0
            || this.idCodeDocuments.length === 0
            || this.photoDocuments.length === 0
            || this.gender === "" || this.gender === GENDER.NOT_SPECIFIED
            || this.email === "");
      } else {
        containsEmptyFields = (this.statementDocuments.length === 0
            || this.email === "");
      }

      if (!containsEmptyFields) {
        return containsEmptyFields;
      } else {
        this.$notify({
          title: "Присутні незаповнені поля!",
          text: "Будь ласка, заповніть всі обов'язкові поля",
          type: "warn"
        });
        return containsEmptyFields;
      }
    },
    isEmailIncorrect() {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (this.email !== "" && !emailRegex.test(this.email)) {
        this.$notify({
          title: "Некоректний формат ел. пошти",
          text: "Перевірте правильність написання вами електронної пошти.",
          type: "warn"
        });
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.scroll-hidden {
  overflow: hidden;
  height: 100%;
}

.popup-inner {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  padding: 8% 6% 8%;
  background-color: $background-black-30;
}
.popup-wrapper {
  max-width: 1250px;
  width: 86%;
  margin: 0 auto;
  @include shadow-light;
}

@media (max-width: 600px) {
  .popup-inner {
      padding: 60px 10px 290px;
  }
  .popup-wrapper {
    width: 100%;
    padding: 20px 15px 30px;
  }
}

.form-container {
  max-width: 1275px;
  margin: 0 auto;
  padding: 40px 20px 60px;
  @include poppins-bold;
  border-radius: 10px;
}
.section {
  border-radius: 10px;
  background-color: $background-white;
}

.room-section {
  padding: 26px 26px 24px 26px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  h3 {
    @include responsive-font(24, 12, 1440);
    @include poppins-bold;
    color: $text-dark-blue;
  }
}

::v-deep(.question_button) {
  @include responsive-font(16, 12, 1440);
  @media (max-width: 768px) {
    padding: 3px 7px !important;
    margin: 0 11px 0 11px;
    border-radius: 5px;
  }
}

::v-deep(.change_button) {
  @media (max-width: 768px) {
    width: 73px;
    height: 22px;
  }
}

.room-info {
  display: flex;
  gap: 50px;
  position: relative;
  max-width: max-content;
  &:before {
    content: '';
    width: 100%;
    height: 1px;
    background-color: $sheet-bar-gray;
    position: absolute;
    left: 0;
    top: 35px;
  }
}

.room-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.label {
  color: $text-light-gray;
  @include poppins-bold;
  @include responsive-font(16, 10, 1440);
  line-height: 30px;
}

.value {
  padding: 5px 10px;
  margin-top: 10px;
  border-radius: 5px;
  color: $text-dark-blue;
  @include poppins-bold;
  @include responsive-font(16, 13, 1440);
  width: 80%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  &.value-red_background {
    background: $bright-red;
    color: $text-white;
  }
  &.value-blue_background {
    background: $bright-blue;
    color: $text-white;
  }
  &.value-gray_background {
    background: $light-state-gray;
    color: $text-dark-blue;
  }
}

@media (max-width: 768px) {
  .room-section {
    padding: 10px 10px 15px;
  }

  .header {
    margin-bottom: 15px;
  }

  .room-info {
    gap: unset;
    max-width: unset;
    margin: 0 10px;
    width: calc(100% - 20px);
    justify-content: space-between;
    &::before {
      top: 25px;
    }
  }

  .label {
    line-height: 20px;
  }

  .value {
    margin-top: 5px;
    padding: 1px 12px;
  }
}

.block-info {
  margin-top: 13px;
}

.block {
  background: $bright-red;
  color: $text-white;
  @include poppins-bold;
  @include responsive-font(13, 11, 1440);
  padding: 5px 10px;
  border-radius: 5px;
}

.section-two {
  margin-top: 30px;
  padding: 26px;
}

.upload-header {
  @include poppins-bold;
  @include responsive-font(24, 16, 1440);
  color: $text-dark-blue;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .section-two {
    padding: 9px 10px 33px;
  }
  .upload-header {
    text-align: center;
    margin-bottom: 12px;
  }
}

.submit-button {
  display: block;
  background-color: $bright-blue;
  color: $text-white;
  border: none;
  @include poppins-semibold;
  @include responsive-font(16, 14, 1440);
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  width: 50%;
  max-width: 516px;
  margin: 106px auto 0 auto;
  text-align: center;
  &:focus, &:focus-visible {
    outline: none;
  }

  @media (max-width: 768px) {
    margin: 50px 12px 0;
    width: calc(100% - 24px);
    padding: 7px 10px;
  }
}
</style>
