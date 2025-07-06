<template>
  <div class="methods-toggler">
    <div class="togglable-methods">
      <div class="wrapper" @click="changeMethod('login')">
        <p :class="['method', { active: method == 'login' }]">Авторизація</p>
      </div>
      <div class="wrapper" @click="changeMethod('register')">
        <p :class="['method', { active: method == 'register' }]">Зареєструватись</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    method: {
      type: String,
      required: false,
      default: "login"
    }
  },
  methods: {
    changeMethod(newMethod) {
      this.$emit('update:method', newMethod);
    }
  },
};
</script>

<style scoped lang="scss">
.methods-toggler {
  width: 100%;
}

.togglable-methods {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;

  .wrapper {
    cursor: pointer;
    padding: 5px 3px;
  }

  .method {
    transition: all ease 0.2s;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $text-light-gray;
    @include poppins-bold;
    @include responsive-font(20, 13, 1440);

    &.active, &:hover {
      color: $text-dark-blue;
    }
  }
}

</style>
