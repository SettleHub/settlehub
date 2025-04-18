<template>
  <div :class="{'expanded': files.length > 0 || !filesCleared}" @dragover.prevent @drop="handleDrop">
  
    <div v-if="files.length" class="file-list">
      <p v-for="(file, index) in files" :key="index" class="file-item">
        {{ file.name }}
        <button @click="removeFile(index)" class="delete_item">×</button>
      </p>
    </div>
    <div v-else class="upload-block">
      <img :src="uploadIcon" alt="icon" />
      <p>Виберіть файл, завантажений з комп'ютера</p>
    </div>


    <button
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

export default {
  name: "FileUploader",
  props: {
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
    }
  },
  data() {
    return {
      files: [],
      filesCleared: true, // Початково стан очищено
    };
  },
  computed: {
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
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      let selectedFiles = Array.from(event.target.files);
      let availableSlots = this.maxFiles - this.files.length;

      if (selectedFiles.length > availableSlots) {
        alert(`Максимальна кількість файлів - ${this.maxFiles}`);
        selectedFiles = selectedFiles.slice(0, availableSlots);
      }

      this.files.push(...selectedFiles);
      this.filesCleared = false; // Скидаємо очищення
      this.$emit("files-selected", this.files);

      event.target.value = "";  // Очищаємо значення інпуту
    },
    removeFile(index) {
      this.files.splice(index, 1);  // Видаляємо файл
      if (this.files.length === 0) {
        this.filesCleared = true; // Якщо файлів немає, скидаємо стан
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
  margin: 0 auto;
  @include poppins-semibold;
  @include responsive-font(16, 14, 1440);

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
}

.expanded {
  transition: min-height 0.3s ease-in-out;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f1f1f1;
  padding: 5px 10px;
  border-radius: 4px;
  margin-bottom: 5px;
  color: #3913e4;
}

.file-item button {
  color: rgb(0, 0, 0);
  border: none;
  background-color: transparent;
  cursor: pointer;
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
    @include responsive-font(14, 12, 1440);
    color: $text-dark-blue;
  }
}
</style>
