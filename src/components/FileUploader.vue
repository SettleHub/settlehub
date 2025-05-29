<template>
  <div :class="{'expanded': files.length > 0 || !filesCleared}" @dragover.prevent @drop="handleDrop">
  
    <div v-if="files.length" class="file-list">
      <div v-for="(file, index) in files"
           :key="index"
           class="file-item"
           @click="removeFile(index)"
      >
        <img v-if="getFileExtension(file.name) === 'pdf'" :src="pdfIcon" alt="icon" class="file_icon" />
        <img v-else :src="defaultIcon" alt="icon" class="file_icon" />
        <p class="filename_title">{{ file.name }}</p>
      </div>
    </div>
    <div v-else class="upload-block">
      <img :src="uploadIcon" alt="icon" />
      <p>Виберіть файл, завантажений з комп'ютера</p>
    </div>


    <button type="button"
      v-if="files.length < maxFiles"
      :class="`select-button ${isActive ? 'active' : ''}`"
      :style="buttonStyle"
      @click="triggerFileInput"
    >
      <img :src="addIcon" alt="icon" class="button-img" />
      {{ buttonLabel }}
    </button>

    <input
      ref="fileInput"
      type="file"
      multiple
      style="display: none;"
      @change="handleFileChange"
    />
  </div>
</template>

<script>
import AddIcon from "@/assets/add.icon.svg";
import UploadIcon from "@/assets/upload.icon.svg";
import PdfIcon from '@/assets/file.pdf.icon.svg';
import DefaultIcon from '@/assets/file.default.icon.svg';

export default {
  name: "FileUploader",
  props: {
    modelFiles: {
      type: Array,
      required: true,
    },
    buttonLabel: {
      type: String,
      default: "Вибрати файл",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    paddingV: {
      type: Number,
      default: 10,
    },
    paddingH: {
      type: Number,
      default: 40,
    },
    maxFiles: {
      type: Number,
      default: 3,
    },
    uploadIcon: {
      type: String,
      default: UploadIcon
    },
    addIcon: {
      type: String,
      default: AddIcon
    },
  },
  data() {
    return {
      filesCleared: true, // Початково стан очищено
      pdfIcon: PdfIcon,
      defaultIcon: DefaultIcon,
    };
  },
  computed: {
    files: {
      get() {
        return this.modelFiles;
      },
      set(newFiles) {
        this.$emit("update:modelFiles", newFiles);
      }
    },
    buttonStyle() {
      return {
        padding: `${this.paddingV}px ${this.paddingH}px`,
      };
    },
  },
  watch: {
    files(newFiles) {
      this.filesCleared = newFiles.length === 0; // Якщо список файлів пустий, повертаємо стан у початковий
    }
  },
  methods: {
    getFileExtension(filename) {
      const parts = filename.split('.');
      return parts.length > 1 ? parts.pop().toLowerCase() : '';
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      event.preventDefault();
      let selectedFiles = Array.from(event.target.files);
      let availableSlots = this.maxFiles - this.files.length;

      if (selectedFiles.length > availableSlots) {
        alert(`Максимальна кількість файлів - ${this.maxFiles}`);
        selectedFiles = selectedFiles.slice(0, availableSlots);
      }

      this.files = [...this.files, ...selectedFiles];
      this.filesCleared = false;
      this.$emit("files-selected", this.files);
      event.target.value = "";
    },
    removeFile(index) {
      const newFiles = [...this.files];
      newFiles.splice(index, 1);
      this.files = newFiles;

      if (this.files.length === 0) {
        this.filesCleared = true;
      }

      this.$emit("files-selected", this.files);
    },
    handleDrop(event) {
      event.preventDefault();
      let droppedFiles = Array.from(event.dataTransfer.files);
      let availableSlots = this.maxFiles - this.files.length;

      if (droppedFiles.length > availableSlots) {
        alert(`Максимальна кількість файлів - ${this.maxFiles}`);
        droppedFiles = droppedFiles.slice(0, availableSlots);
      }

      this.files.push(...droppedFiles);
      this.filesCleared = false; // Після додавання файлів стан скидається
      this.$emit("files-selected", this.files);
    },
  },
};
</script>


<style lang="scss" scoped>
.select-button {
  background-color: $background-white;
  color: $light-state-gray;
  &.active {
    background-color: $bright-blue;
    color: $text-white;
  }
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  margin: 20px auto 0;
  margin: 20px auto 0;
  @include poppins-semibold;
  @include responsive-font(16, 12, 1440);

  .button-img {
    margin-right: 10px;
    width: 24px;
    vertical-align: middle;
  }
}

.file-list {
  margin-top: 10px;
  max-height: 300px;
  overflow-y: auto;
  transition: max-height 0.3s ease-in-out;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
}

.expanded {
  transition: min-height 0.3s ease-in-out;
  width: 100%;
}

.file-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background-color: $background-gray;
  padding: 10px 15px;
  border-radius: 10px;
  width: 100px;
  cursor: pointer;

  &:hover, &:focus, &:focus-visible {
    background-color: $gainsboro-gray;
  }

  .file_icon {
    width: 100%;
    @include locked-image;
  }
  .filename_title {
    @include responsive-font(13, 10, 1440);
    @include poppins-medium;
    color: $text-dark-blue;
    @include hide-text-overflow;
  }

  .delete_item {
    color: rgb(0, 0, 0);
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
}

@media (max-width: 768px) {
  .file-item {
    width: 75px;
  }
}

.upload-block {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  img {
    width: 24px;
    margin-bottom: 10px;
  }
  p {
    @include poppins-medium;
    @include responsive-font(14, 11, 1440);
    color: $text-dark-blue;
  }
}

@media (max-width: 768px) {
  .select-button {
    padding: 3px 15px !important;
  }

  .upload-block {
    padding: 10px;
  }
}
</style>
