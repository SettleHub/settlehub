<template>
  <button class="select-button" @click="handleClick">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "SelectButton",
  props: {
    label: {
      type: String,
      default: "Обрати",
    },
  },
  methods: {
    handleClick() {
      this.$emit("click"); // Емісія події на головний компонент
    },
  },
};
</script>

<style scoped>
.select-button {
  background-color: #4a00e0;
  color: white;
  padding: 10px 40px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.select-button:hover {
  background-color: #3b00b3;
}
</style>
<style lang="scss" scoped>
  .select-button {
    background-color: $bright-blue;
    color: $text-white;
    @include poppins-semibold;
    @include responsive-font(16, 16, 1440);
    padding: 10px 40px;
    width: max-content;
    height: max-content;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>
