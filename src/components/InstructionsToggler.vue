<template>
  <div class="devices-toggler">
    <div class="togglable-devices">
      <div class="wrapper" @click="changeDevice('mobile')">
        <div :class="['device', { active: device == 'mobile' }]">
          <img
              :src="device === 'mobile' ? require('@/assets/mobile.active.icon.svg') : require('@/assets/mobile.icon.svg')"
              class="device-icon" alt="Використовуючи телефон" />
        </div>
      </div>
      <div class="wrapper" @click="changeDevice('computer')">
        <div :class="['device', { active: device == 'computer' }]">
          <img
              :src="device === 'computer' ? require('@/assets/pc.active.icon.svg') : require('@/assets/pc.icon.svg')"
              class="device-icon" alt="Використовуючи комп'ютер" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    device: {
      type: String,
      required: false,
      default: "mobile"
    }
  },
  methods: {
    changeDevice(newDevice) {
      this.$emit('update:device', newDevice);
    }
  },
};
</script>

<style scoped lang="scss">
.devices-toggler {
  margin: 0 auto 34px;
  width: max-content;
  border-radius: 5px;
  @include shadow-light;
  background-color: $background-gainsboro-20;
}

.togglable-devices {
  display: flex;
  width: max-content;
  flex-direction: row;

  .wrapper {
    cursor: pointer;
    padding: 10px;
  }

  .device {
    transition: all ease 0.2s;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 55px;
    height: 44px;
    border-radius: 5px;

    img {
      @include locked-image;
      height: 35px;
    }

    &.active {
      background-color: $bright-blue;
    }
  }
}

@media (max-width: 600px) {
  .devices-toggler {
    margin: 0 auto 24px;
  }
  .togglable-devices {
    .wrapper {
      padding: 8px;
    }

    .device {
      width: 47px;
      height: 38px;

      img {
        height: 31px;
      }
    }
  }
}

</style>
