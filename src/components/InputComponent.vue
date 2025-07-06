<template>
  <div class="input-wrapper"
       :style="wrapperStyle" >
    <input :class="`input-component ${className} ${type}`"
           :type="computedType"
           :placeholder="placeholder"
           :style="inputStyle"
           :required="isRequired"
           :value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           @copy="handleAction"
           @paste="handleAction"
           @cut="handleAction"
           @dragstart="handleAction"
           @drop="handleAction"
    />
    <button
            v-if="type === 'password'"
            class="toggle-password"
            type="button"
            @click="togglePassword"
    >
      <img v-if="showPassword"
           src="../assets/password.hidden.icon.svg"
           alt="Показати пароль" />
      <img v-else
           src="../assets/password.showed.icon.svg"
           alt="Сховати пароль" />
    </button>
  </div>
</template>

<script>
export default {
  name: "InputComponent",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
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
      default: 17,
    },
    paddingH: {
      type: Number,
      default: 15,
    },
    className: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      showPassword: false,
    };
  },
  computed: {
    computedType() {
      return this.type === "password" && this.showPassword ? "text" : this.type;
    },
    wrapperStyle() {
      return {
        width: this.sizeMax ? '100%' : 'max-content',
      };
    },
    inputStyle() {
      return {
        padding: `${this.paddingV}px ${this.paddingH}px`,
        width: this.sizeMax ? '100%' : 'max-content',
      };
    },
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    handleAction(event) {
      if (this.type === 'password') {
        event.preventDefault();
      }
    }
  },
};
</script>

<style lang="scss" scoped>
  .input-wrapper {
    width: max-content;
    height: max-content;
    position: relative;
  }

  .input-component {
    background-color: $background-gray;
    border: none;
    border-radius: 8px;
    @include poppins-bold;
    @include responsive-font(15, 11, 1440);
    color: $text-black;
    max-width: 100%;
    padding: 15px 17px;
    &[type="password"],
    &.password {
      padding-right: calc(15px + 24px + 15px) !important;
    }
    transition: 0.5s ease-in-out;
    border: 1px solid $border-black;

    &[type="date"] {
      @include poppins-bold;
      @include responsive-font(13, 8, 1440);
      color: $text-light-gray;
      cursor: pointer;
      &::-webkit-calendar-picker-indicator {
        filter: brightness(0);
        cursor: pointer;
        height: 18px;
        width: 18px;
        position: relative;
        right: 1px;
      }

      &::-moz-focus-inner {
        border: 0;
      }
    }

    &:focus, &:focus-visible {
      outline: 1px solid $border-black;
      @include shadow-light;
    }
  }

  .toggle-password {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
    background: none;
    border: none;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0 15px;
    img {
      @include locked-image;
      width: 24px;
    }
  }

  @media (max-width: 768px) {
    .input-component {
      height: 36px;
      padding: 14px 13px !important;
    }
  }

  ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color: $text-light-gray;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: $text-light-gray;
    opacity:  1;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: $text-light-gray;
    opacity:  1;
  }
  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: $text-light-gray;
  }
  ::-ms-input-placeholder { /* Microsoft Edge */
    color: $text-light-gray;
  }
  ::placeholder { /* Most modern browsers support this now. */
    color: $text-light-gray;
  }
</style>
