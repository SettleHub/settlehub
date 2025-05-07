<template>
  <div class="form-container">
    <div class="section section-one">
      <div class="room-section">
        <div class="header">
          <h3>Обраний гуртожиток та кімната:</h3>
          <ButtonSelect label="Змінити" :isLink=true route="/hostels" :className="'change_button'" />
        </div>

        <div class="room-info">
          <div class="room-detail">
            <span class="label">Гуртожиток:</span>
            <span class="value">№7</span>
          </div>
          <div class="room-detail">
            <span class="label">Поверх:</span>
            <span class="value">1</span>
          </div>
          <div class="room-detail">
            <span class="label">Клітка:</span>
            <span class="value">2</span>
          </div>
          <div class="room-detail">
            <span class="label">Блок:</span>
            <span class="value value-red_background">
              <span>А</span>
            </span>
<!--            <div class="block-info">-->
<!--              <span class="block">Жіночий блок</span>-->
<!--            </div>-->
          </div>
          <div class="room-detail">
            <span class="label">Кімната:</span>
            <span class="value">110</span>
          </div>
        </div>
      </div>
    </div>

    <div class="section section-two">
      <h3 class="upload-header">Завантаження документів</h3>
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
                  1. Завантажте підписану заяву з Дія.Підпис
              </label>
              <ButtonSelect
                  type="button"
                  :paddingV="5"
                  :paddingH="10"
                  :style="{ width: 'max-content', height: 'max-content', minWidth: '0', padding: '0px 6px 0px 6px', margin: '0 0 0 18px', cursor: 'pointer' }"
                  label="?"
                  :className="'question_button'"
                  @click="showPopup($event)" />
            </div>
            <DownloadButton
                :fileName="'zayava_lizhko-mistse.pdf'"
                :filePath="'/files/zayava_lizhko-mistse.pdf'"
                :className="'download_document'" />
            <div class="upload-item" :class="{ 'expanded': isUploadComplete() }">
              <FileUploader
                  label="Завантажити заповнену заяву"
                  @change="handleFileUpload('statement')"
                  @files-cleared="resetFile('statement')"
                  ref="fileUploader"/>
            </div>
          </div>
          <div class="column_item">
            <label class="action-title">2. Завантажити скан паспорту</label>
            <div class="upload-item" :class="{ 'expanded': isUploadComplete() }">
              <FileUploader
                  label="Завантажити заповнену заяву"
                  @change="handleFileUpload('passport')"
                  @files-cleared="resetForm"
                  ref="fileUploader"
              />
            </div>
          </div>
          <div class="column_item">
            <label class="action-title">3. Завантажити скан ідентифікаційного коду</label>
            <div class="upload-item" :class="{ 'expanded': isUploadComplete() }">

              <FileUploader
                label="Завантажити заповнену заяву"
                @change="handleFileUpload('idCode')"
                @files-cleared="resetForm"
                ref="fileUploader"
              />
            </div>
            </div>
        </div>

        <div class="column expanded-column">
          <div class="column_item">
            <label class="action-title">4. Завантажити фото</label>
            <div class="upload-item" :class="{ 'expanded': isUploadComplete() }">
              <FileUploader
                label="Завантажити заповнену заяву"
                @change="handleFileUpload('photo')"
                @files-cleared="resetForm"
                :uploadIcon="uploadPicturesIcon"
                ref="fileUploader"
              />
            </div>
          </div>

          <div class="column_item">
            <label class="action-title">5. Вкажіть вашу стать</label>
            <div class="upload-item-gender">
              <div class="gender-select">
                <div class="radio_wrapper">
                  <input id="radioButton1" type="radio" value="Дівчина" v-model="gender" />
                  <label for="radioButton1">Дівчина</label>
                </div>
                <div class="radio_wrapper">
                  <input id="radioButton2" type="radio" value="Хлопець" v-model="gender" />
                  <label for="radioButton2">Хлопець</label>
                </div>
              </div>
            </div>
          </div>

          <div class="column_item">
            <label class="action-title">6. Надайте контактні дані</label>
            <div class="upload-item-contacts contact-info">
              <InputText :type="'tel'" :placeholder="'Номер телефону'" :isRequired="true" />
              <InputText :type="'mail'" :placeholder="'Електронна пошта'" :isRequired="false" />
            </div>
          </div>
        </div>
      </div>

      <button class="submit-button">Відправити</button>
    </div>
  </div>
</template>


<script>
import DownloadButton from '@/components/DownloadButton.vue';
import FileUploader from '@/components/FileUploader.vue';
import ButtonSelect from '@/components/ButtonSelect.vue';
import KepInfoForm from "@/components/KepInfoForm.vue";
import UploadPictureIcon from '@/assets/photos.icon.svg';
import InputText from "@/components/InputTextComponent.vue";

// import DocxIcon from '@/assets/';
export default {
  components: {
    InputText,
    DownloadButton,
    FileUploader,
    ButtonSelect,
    KepInfoForm
  },
  data() {
    return {
      gender: null,
      uploadedFiles: {
        statement: false,
        passport: false,
        idCode: false,
        photo: false
      },
      showInstructions: false,
      device: this.$route.query.device || 'mobile'
    };
  },
  computed: {
    uploadPicturesIcon() {
      return UploadPictureIcon;
    },
  },
  methods: {
    handleFileUpload(type) {
      this.uploadedFiles[type] = true;
    },
    resetFile(type) {
      this.uploadedFiles[type] = false;
      this.$nextTick(() => {
        const uploaderRef = this.$refs.fileUploader.find(ref => ref.label === type);
        if (uploaderRef) {
          uploaderRef.files = [];
          uploaderRef.filesCleared = true;
        }
      });
    },
    resetForm() {
      this.uploadedFiles = {
        statement: false,
        passport: false,
        idCode: false,
        photo: false
      };

      this.gender = null;

      this.$nextTick(() => {
        const uploaderRefs = this.$refs.fileUploader;
        uploaderRefs.forEach((uploaderRef) => {
          uploaderRef.files = [];
          uploaderRef.filesCleared = true;
        });
      });
    },
    isUploadComplete() {
      return Object.values(this.uploadedFiles).some(Boolean);
    },
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
    }
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
