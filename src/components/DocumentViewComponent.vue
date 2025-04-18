<template>
  <div class="form-container">
    <div class="section-one">
      <div class="room-section">
        <div class="header">
          <h3>Обраний гуртожиток та кімната:</h3>
          <ButtonSelect label="Змінити" :isLink=true route="/hostels" />
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
            <span class="value">110</span>
            <div class="block-info">
              <span class="block">Жіночий блок</span>
            </div>
          </div>
          <div class="room-detail">
            <span class="label">Кімната:</span>
            <span class="value">A</span>
          </div>
        </div>
      </div>
    </div>

    <div class="section-two">
      <h3 class="upload-header">Завантаження документів</h3>
      <div class="upload-section">
        <div class="column">
          <label class="action-title">1. Заповніть та завантажте скан заяви</label>
          <DownloadButton
              :fileName="'zayava_lizhko-mistse.pdf'"
              :filePath="'/files/zayava_lizhko-mistse.pdf'" />
          <div class="upload-item" :class="{ 'expanded': isUploadComplete() }">

          <FileUploader
            label="Завантажити заповнену заяву"
            @change="handleFileUpload('statement')"
            @files-cleared="resetFile('statement')"
            ref="fileUploader"
          />
        </div>


          <!-- Завантаження паспорту -->
          <label class="action-title">2. Завантажити скан паспорту</label>
          <div class="upload-item" :class="{ 'expanded': isUploadComplete() }">
            <FileUploader
              label="Завантажити заповнену заяву"
              @change="handleFileUpload('passport')"
              @files-cleared="resetForm"
              ref="fileUploader"
            />
          </div>

          <!-- Завантаження ідентифікаційного коду -->
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

        <div class="column expanded-column">
          <!-- Завантаження фото -->
          <label class="action-title">4. Завантажити фото</label>
          <div class="upload-item" :class="{ 'expanded': isUploadComplete() }">
            <FileUploader
              label="Завантажити заповнену заяву"
              @change="handleFileUpload('idCode')"
              @files-cleared="resetForm"
              :uploadIcon="uploadPicturesIcon"
              ref="fileUploader"
            />
          </div>

          <!-- Вибір статі -->
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

          <!-- Контактні дані -->
          <label class="action-title">6. Надайте контактні дані</label>
          <div class="upload-item-contacts contact-info">
            <InputText :type="'tel'" :placeholder="'Номер телефону'" :isRequired="true" />
            <InputText :type="'mail'" :placeholder="'Електронна пошта'" :isRequired="true" />
          </div>
        </div>
      </div>

      <!-- Кнопка відправити -->
      <button class="submit-button">Відправити</button>
    </div>
  </div>
</template>


<script>
import DownloadButton from '@/components/DownloadButton.vue';
import FileUploader from '../components/FileUploader.vue';
import ButtonSelect from '@/components/ButtonSelect.vue';

import UploadPictureIcon from '@/assets/photos.icon.svg';
import InputText from "@/components/InputTextComponent.vue";

// import DocxIcon from '@/assets/';
export default {
  components: {
    InputText,
    DownloadButton,
    FileUploader,
    ButtonSelect,
  },
  data() {
    return {
      gender: null,
      uploadedFiles: {
        statement: false,
        passport: false,
        idCode: false,
        photo: false
      }
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
      // Reset uploaded files
      this.uploadedFiles = {
        statement: false,
        passport: false,
        idCode: false,
        photo: false
      };

      // Reset gender selection
      this.gender = null;

      // You can also clear the files in the file uploader component if needed
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
    }
  }
};
</script>

<style scoped lang="scss">
.form-container {
  max-width: 1275px;
  margin: 0 auto;
  padding: 20px;
  @include poppins-bold;
  border-radius: 10px;
}

.room-section {
  background-color: $background-white;
  margin-top: 20px;
  border-radius: 10px;
  padding: 26px 26px 24px 26px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  h3 {
    @include responsive-font(24, 22, 1440);
    color: $text-dark-blue;
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
  @include responsive-font(16, 14, 1440);
  line-height: 30px;
}

.value {
  padding: 10px;
  border-radius: 5px;
  color: $text-dark-blue;
  @include poppins-bold;
  @include responsive-font(16, 14, 1440);
  width: 80%;
  text-align: center;
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
  margin-top: 20px;
  background-color: $background-white;
  border-radius: 10px;
  padding: 26px;
}

.upload-header {
  @include poppins-bold;
  @include responsive-font(24, 22, 1440);
  color: $text-dark-blue;
  margin-bottom: 20px;
}

.upload-section {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.action-title {
  @include poppins-bold;
  @include responsive-font(16, 14, 1440);
  color: $text-dark-blue;
  padding-left: 5px;
}

.upload-item {
  padding: 16px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  background-image: repeating-linear-gradient(-2deg, $dark-blue-60, $dark-blue-60 9px, transparent 9px, transparent 23px, $dark-blue-60 23px), repeating-linear-gradient(88deg, $dark-blue-60, $dark-blue-60 9px, transparent 9px, transparent 23px, $dark-blue-60 23px), repeating-linear-gradient(178deg, $dark-blue-60, $dark-blue-60 9px, transparent 9px, transparent 23px, $dark-blue-60 23px), repeating-linear-gradient(268deg, $dark-blue-60, $dark-blue-60 9px, transparent 9px, transparent 23px, $dark-blue-60 23px);
  background-size: 1px 100%, 100% 1px, 1px 100% , 100% 1px;
  background-position: 0 0, 0 0, 100% 0, 0 100%;
  background-repeat: no-repeat;
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
  @include responsive-font(14, 12, 1440);
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
}

</style>