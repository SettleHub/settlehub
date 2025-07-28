<template>
  <div class="upload-section">
    <div class="column">
      <div class="column_item">
        <div class="action-title-wrapper">
          <label class="action-title">
              2. Завантажте підписану заяву на ЛІТНІЙ період
          </label>
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
    </div>

    <div class="column expanded-column">
      <div class="column_item">
        <label class="action-title">
          3. Надайте контактні дані
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
import InputComponent from "@/components/InputComponent.vue";

export default {
  components: {
    InputText: InputComponent,
    DownloadButton,
    FileUploader,
  },
  data() {
    return {
      internalStatementDocuments: this.statementDocuments,
      internalPhone: this.phone,
      internalEmail: this.email,
    };
  },
  props: {
    statementDocuments: {
      type: Array,
      required: true
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
  methods: {

  },
  watch: {
    internalStatementDocuments(newVal) {
      this.$emit('update:statementDocuments', newVal);
    },
    statementDocuments(newVal) {
      this.internalStatementDocuments = newVal;
    },
    internalPhone(newVal) {
      this.$emit('update:phone', newVal);
    },
    internalEmail(newVal) {
      this.$emit('update:email', newVal);
    },
  },
};
</script>

<style scoped lang="scss">
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
  padding: 18px;
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
