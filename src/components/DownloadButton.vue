<template>
  <a :class="`click-button ${className}`"
        :href="filePath"
        :download="fileName"
        :style="buttonStyle">
    <span class="button-label">{{ label }}</span>
    <img :src="icon" alt="icon" class="button-icon" />
  </a>
</template>

<script>

import DefaultIcon from '@/assets/file.pdf.icon.svg';

export default {
  name: "DownloadButton",
  props:{
    label:{
      type: String,
      default: "Заява",
    },
    filePath: {
      type: String,
    },
    fileName: {
      type: String,
    },
    icon: {
      type: String,
      default: DefaultIcon
    },
    paddingV: {
      type: Number,
      default: 10,
    },
    paddingH: {
      type: Number,
      default: 40,
    },
    className: {
      type: String,
      default: "",
    },
  },
  computed: {
    buttonStyle() {
      return {
        padding: `${this.paddingV}px ${this.paddingH}px`,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.click-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: $background-gray;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.click-button:hover {
  background-color: $gainsboro-gray;
  @include shadow-light;
}

.click-button:active {
  background-color: $gainsboro-gray;
}

.button-label {
  color: $deep-sky-blue;
  @include poppins-semibold;
  @include responsive-font(16, 14, 1440);
}

.button-icon {
  width: 20px;
  height: 20px;
}
</style>