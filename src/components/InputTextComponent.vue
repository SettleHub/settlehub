<template>
  <input class="input-component"
         :type="type"
         :placeholder="placeholder"
         :style="inputStyle"
         :required="isRequired" />
</template>

<script>
export default {
  name: "InputText",
  props: {
    placeholder: {
      type: String
    },
    isRequired: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "text"
    },
    sizeMax: {
      type: Boolean,
      default: false
    },
    paddingV: {
      type: Number,
      default: 20,
    },
    paddingH: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    inputStyle() {
      return {
        padding: `${this.paddingV}px ${this.paddingH}px`,
        width: this.sizeMax ? '100%' : 'max-content',
      };
    },
  },
};
</script>

<style lang="scss" scoped>
  .input-component {
    background-color: $background-gray;
    border: none;
    border-radius: 5px;
    @include poppins-medium;
    @include responsive-font(16, 14, 1440);
    color: $dark-blue-60;
    min-width: 330px;
    height: 30px;
    transition: 0.5s ease-in-out;
    border: 2px solid transparent;

    &:focus, &:focus-visible {
      outline: none;
      border-color: $gainsboro-gray;
      @include shadow-light;
    }
  }
</style>