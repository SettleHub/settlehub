<template>
  <div class="upload-section">
    <div class="column">
      <div v-if="showInstructions" @click="hidePopup($event)" class="popup-inner">
        <div class="popup-wrapper">
          <KepInfoForm :hidePopup="hidePopup" v-model:device="this.device" />
        </div>
      </div>
      <div class="column_item">
        <div class="action-title-wrapper">
          <label class="action-title">
            2. Завантажте підписану заяву з Дія.Підпис
          </label>
          <ButtonComponent
              type="button"
              :paddingV="5"
              :paddingH="10"
              :style="{ width: 'max-content', height: 'max-content', minWidth: '0', padding: '0px 6px 0px 6px', margin: '0 0 0 18px', cursor: 'pointer' }"
              label="?"
              :className="'question_button'"
              @click="showPopup($event)" />
        </div>
        <DownloadButton
            :fileName="'zayava_lizhko-mistse.docx'"
            :filePath="'/files/zayava_lizhko-mistse.docx'"
            :className="'download_document'" />
        <div class="upload-item">
          <FileUploader
              label="Завантажити заповнену заяву"
              ref="fileUploader"
              v-model:modelFiles="this.internalStatementDocuments" />
        </div>
      </div>
      <div class="column_item">
        <label class="action-title">
          3. Завантажити скан паспорту
        </label>
        <div class="upload-item">
          <FileUploader
              label="Завантажити заповнену заяву"
              ref="fileUploader"
              v-model:modelFiles="this.internalPassportDocuments" />
        </div>
      </div>
      <div class="column_item">
        <label class="action-title">
          4. Завантажити скан ідентифікаційного коду
        </label>
        <div class="upload-item">

          <FileUploader
              label="Завантажити заповнену заяву"
              ref="fileUploader"
              v-model:modelFiles="this.internalIdCodeDocuments" />
        </div>
      </div>
    </div>

    <div class="column expanded-column">
      <div class="column_item">
        <label class="action-title">
          5. Завантажити фото
        </label>
        <div class="upload-item">
          <FileUploader
              label="Завантажити заповнену заяву"
              :uploadIcon="uploadPicturesIcon"
              ref="fileUploader"
              v-model:modelFiles="this.internalPhotoDocuments" />
        </div>
      </div>

      <div class="column_item">
        <label class="action-title">
          6. Вкажіть вашу стать
        </label>
        <div class="upload-item-gender">
          <div class="gender-select">
            <div class="radio_wrapper">
              <input id="radioButton1" type="radio" :value="GENDER.FEMALE" v-model="this.internalGender" />
              <label for="radioButton1">Дівчина</label>
            </div>
            <div class="radio_wrapper">
              <input id="radioButton2" type="radio" :value="GENDER.MALE" v-model="this.internalGender" />
              <label for="radioButton2">Хлопець</label>
            </div>
          </div>
        </div>
      </div>

      <div class="column_item">
        <label class="action-title">
          7. Надайте контактні дані
        </label>
        <div class="upload-item-contacts contact-info">
          <InputText v-model:modelValue="this.internalPhone"
                     :type="'tel'"
                     :placeholder="'+380112223344'"
                     :isRequired="true"
                     :sizeMax="true" />
          <InputText v-model:modelValue="this.internalEmail"
                     :type="'mail'"
                     :placeholder="'email@example.com'"
                     :isRequired="false"
                     :sizeMax="true" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import DownloadButton from '@/components/DownloadButton.vue';
import FileUploader from '@/components/FileUploader.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import KepInfoForm from "@/components/KepInfoForm.vue";
import UploadPictureIcon from '@/assets/photos.icon.svg';
import InputComponent from "@/components/InputComponent.vue";
import { GENDER } from "@/types/Gender";

export default {
  components: {
    InputText: InputComponent,
    DownloadButton,
    FileUploader,
    ButtonComponent,
    KepInfoForm
  },
  data() {
    return {
      internalStatementDocuments: this.statementDocuments,
      internalPassportDocuments: this.passportDocuments,
      internalIdCodeDocuments: this.idCodeDocuments,
      internalPhotoDocuments: this.photoDocuments,
      internalGender: this.gender,
      internalPhone: this.phone,
      internalEmail: this.email,

      showInstructions: false,
      device: this.$route.query.device || 'mobile'
    };
  },
  props: {
    statementDocuments: {
      type: Array,
      required: true
    },
    passportDocuments: {
      type: Array,
      required: true
    },
    idCodeDocuments: {
      type: Array,
      required: true
    },
    photoDocuments: {
      type: Array,
      required: true
    },
    gender: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      default: "",
    },
    email: {
      type: String,
      required: true,
      default: "",
    },
  },
  computed: {
    GENDER() {
      return GENDER
    },
    uploadPicturesIcon() {
      return UploadPictureIcon;
    },
  },
  methods: {
    showPopup(event) {
      event.preventDefault();
      document.documentElement.classList.add('scroll-hidden');
      document.body.classList.add('scroll-hidden');
      this.showInstructions = true;
      this.$router.push({
        query: {
          ...this.$route.query,
          instruction: 'true',
          device: this.$route.query.device || this.device || 'mobile'
        }
      });
    },
    hidePopup(event) {
      event.preventDefault();
      if (event.target.classList.contains('popup-inner') || event.target.classList.contains('button-close')) {
        document.documentElement.classList.remove('scroll-hidden');
        document.body.classList.remove('scroll-hidden');
        this.showInstructions = false;
        const rest = { ...this.$route.query };
        delete rest.instruction;
        delete rest.device;
        this.$router.replace({ query: rest });
      }
    }
  },
  watch: {
    device(newVal) {
      const newQuery = {
        ...this.$route.query,
        device: newVal
      };
      this.$router.replace({ query: newQuery });
    },
    internalStatementDocuments(newVal) {
      this.$emit('update:statementDocuments', newVal);
    },
    statementDocuments(newVal) {
      this.internalStatementDocuments = newVal;
    },
    internalPassportDocuments(newVal) {
      this.$emit('update:passportDocuments', newVal);
    },
    internalIdCodeDocuments(newVal) {
      this.$emit('update:idCodeDocuments', newVal);
    },
    internalPhotoDocuments(newVal) {
      this.$emit('update:photoDocuments', newVal);
    },
    internalGender(newVal) {
      this.$emit('update:gender', newVal);
    },
    internalPhone(newVal) {
      this.$emit('update:phone', newVal);
    },
    internalEmail(newVal) {
      this.$emit('update:email', newVal);
    },
  },
  mounted() {
    if (this.$route.query.instruction === 'true') {
      this.showPopup(new Event('Opening Popup'));
    }
  }
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

::v-deep(.question_button) {
  @include responsive-font(16, 12, 1440);
  @media (max-width: 768px) {
    padding: 3px 7px !important;
    margin: 0 11px 0 11px;
    border-radius: 5px;
  }
}

.upload-section {
  display: flex;
  column-gap: 20px;
  row-gap: 37px;
  justify-content: space-between;
  flex-wrap: wrap;
}

.column {
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 29px;
  min-width: 220px;
  @media (max-width: 768px) {
    row-gap: 37px;
  }
}

.action-title-wrapper {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.action-title {
  @include poppins-bold;
  @include responsive-font(16, 11, 1440);
  color: $text-dark-blue;
  padding-left: 5px;
}

::v-deep(.download_document) {
  margin: 10px 0 4px;
  @media (max-width: 768px) {
    margin: 15px 0 18px;
  }
}

.upload-item {
  padding: 16px;
  border-radius: 4px;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  background-image: repeating-linear-gradient(-2deg, $dark-blue-60, $dark-blue-60 9px, transparent 9px, transparent 23px, $dark-blue-60 23px), repeating-linear-gradient(88deg, $dark-blue-60, $dark-blue-60 9px, transparent 9px, transparent 23px, $dark-blue-60 23px), repeating-linear-gradient(178deg, $dark-blue-60, $dark-blue-60 9px, transparent 9px, transparent 23px, $dark-blue-60 23px), repeating-linear-gradient(268deg, $dark-blue-60, $dark-blue-60 9px, transparent 9px, transparent 23px, $dark-blue-60 23px);
  background-size: 1px 100%, 100% 1px, 1px 100% , 100% 1px;
  background-position: 0 0, 0 0, 100% 0, 0 100%;
  background-repeat: no-repeat;

  @media (max-width: 768px) {
    padding: 8px 8px 20px;
  }
}

.upload-block {
  text-align: center;
}

.upload-block img {
  width: 24px;
  height: 24px;
  margin-bottom: 5px;
}

.upload-block p {
  font-size: 14px;
  color: $dark-blue-60;
  margin-bottom: 10px;
}

.file-button {
  background: $deep-sky-blue;
  color: $text-white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.file-button img {
  width: 20px;
  height: 20px;
}

.upload-item-gender, .upload-item-contacts {
  padding-left: 25px;
  margin-top: 12px;
}

.gender-select {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: start;
  flex-direction: column;
}

.radio_wrapper {
  margin: 0 auto 0 0;
  width: max-content;
}

input[type="radio"] {
  display: none;
}

input[type="radio"] + label {
  color: $text-dark-blue;
  @include poppins-semibold;
  @include responsive-font(14, 10, 1440);
  position: relative;
  padding-left: 35px;
  cursor: pointer;
}

.radio_radius {
  position: relative;
  border-width: 1px;
  border-style: solid;
  border-radius: 50%;
  padding: 4px;
}

input[type="radio"] + label::before {
  z-index: 2;
  content: "";
  position: absolute;
  left: 4px;
  top: 50%;
  transform: translateY(-45%);
  width: 14px;
  height: 14px;
  border: 2px solid transparent;
  border-radius: 50%;
  background: transparent;
  transition: 0.3s;
}

input[type="radio"] + label::after {
  z-index: 1;
  content: '';
  position: absolute;
  left: -1px;
  top: 48%;
  transform: translateY(-45%);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: $background-white;
  border: 2px solid;
}

#radioButton1 + label::after {
  border-color: $bright-red;
}

#radioButton2 + label::after {
  border-color: $bright-blue;
}

#radioButton1:checked + label::before {
  border-color: $bright-red;
  background: $bright-red;
}

#radioButton2:checked + label::before {
  border-color: $bright-blue;
  background: $bright-blue;
}

.contact-info {
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 20px;
  @media (max-width: 768px) {
    gap: 13px;
    padding: 0 10px;
  }
}

.contact-field {
  margin-top: 5px;
  padding: 8px;
  width: 520px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}
</style>
