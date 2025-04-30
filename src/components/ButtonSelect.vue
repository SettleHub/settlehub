<template>
  <div>
    <router-link v-if="isLink" :to="route">
      <button
          :class="`select-button ${isActive ? 'active' : ''} ${className}`"
          :style="buttonStyle"
          @click="handleClick"
      >
        {{ label }}
      </button>
    </router-link>

    <button
        v-else
        :class="`select-button ${isActive ? 'active' : ''} ${className}`"
        :style="buttonStyle"
        @click="handleClick"
    >
      {{ label }}
    </button>
  </div>
</template>



<script>
export default {
  name: "ButtonSelect",
  props: {
    label: {
      type: String,
      default: "Обрати",
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
  methods: {
    handleClick(event) {
      this.$emit("click", event);
    },
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
  }

</style>
