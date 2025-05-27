<template>
  <div>
    <router-link v-if="isLink" :to="route">
      <button
          :class="`select-button ${isActive ? 'active' : ''} ${className}`"
          :type="type"
          :style="buttonStyle"
          @click="handleClick"
      >
        <span>{{ label }}</span>
      </button>
    </router-link>

    <button
        v-else
        :class="`select-button ${isActive ? 'active' : ''} ${className}`"
        :type="type"
        :style="buttonStyle"
        @click="handleClick"
    >
      <span>{{ label }}</span>
    </button>
  </div>
</template>



<script>
export default {
  name: "ButtonComponent",
  props: {
    label: {
      type: String,
      default: "Обрати",
    },
    type: {
      type: String,
      default: "button",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    sizeMax: {
      type: Boolean,
      default: false
    },
    paddingV: {
      type: Number,
      default: 10,
    },
    paddingH: {
      type: Number,
      default: 40,
    },
    borderRadius: {
      type: Number,
      default: 4,
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
        width: this.sizeMax ? '100%' : 'max-content',
        borderRadius: `${this.borderRadius}px`,
      };
    },
  },
  methods: {
    handleClick(event) {
      if (this.type === 'submit') return;
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
    @include responsive-font(16, 9, 1440);
    padding: 10px 40px;
    width: max-content;
    height: max-content;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>
