<template>
    <div>
      <router-link v-if="isLink" :to="route">
        <button
          :class="`select-button ${isActive ? 'active' : ''}`"
          :style="buttonStyle"
          @click="handleClick"
        >
          {{ label }}
        </button>
      </router-link>
  
      <button
        v-else
        :class="`select-button ${isActive ? 'active' : ''}`"
        :style="buttonStyle"
        @click="triggerFileInput"
      >
        <img src="../assets/add.icon.svg" alt="icon" class="button-img" />
        {{ label }}
      </button>
  
      <!-- Схований інпут для вибору файлів -->
      <input
        ref="fileInput"
        type="file"
        style="display: none;"
        @change="handleFileChange"
      />
    </div>
  </template>
  

  <script>
export default {
  name: "ButtonSelect",
  props: {
    img: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: "Завантажити фото",
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
    isLink: {
      type: Boolean,
      default: false,
    },
    route: {
      type: String,
      default: "",
    }
  },
  computed: {
    buttonStyle() {
      return {
        padding: `${this.paddingV}px ${this.paddingH}px`,
      };
    },
  },
  methods: {
    
    triggerFileInput() {
      this.$refs.fileInput.click(); 
    },


    handleFileChange(event) {
      const file = event.target.files[0]; 
      if (file) {
        console.log("Вибраний файл: ", file.name);
        this.$emit("file-selected", file); 
      }
    },

    handleClick() {
      this.$emit("click");
    }
  },
};
</script>


  
  <style lang="scss" scoped>
.select-button {
  background-color: $background-white;
  color: $text-dark-blue;
  &.active {
    background-color: $bright-blue;
    color: $text-white;
  }
  @include poppins-semibold;
  @include responsive-font(16, 16, 1440);
  padding: 10px 40px;
  width: max-content;
  height: max-content;
  border: none; 
  border-radius: 4px;
  cursor: pointer;

  .button-img {
    margin-right: 8px; /* Відступ між іконкою та текстом */
    width: 20px; /* Розмір іконки */
    height: 20px; /* Розмір іконки */
    vertical-align: middle; /* Вертикальне вирівнювання */
  }
}
</style>
