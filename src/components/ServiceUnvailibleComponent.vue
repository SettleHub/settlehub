<template>
  <div class="error_block">
    <div class="error_page">
      <div class="message_block">
        <h4 v-if="title !== ''"> {{ title }} </h4>
        <p>{{ message }}</p>
        <span>{{ textUnderMessage }}</span>
        <div class="button_wrapper"
             v-if="hasButton">
          <ButtonComponent :label="buttonLabel"
                           :isLink="true"
                           :route="route"
                           :paddingV="13"
                           :borderRadius="10"
                           :sizeMax="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonComponent from "@/components/ButtonComponent.vue";

export default {
  name: "ServiceUnvailibleComponent",
  components: {ButtonComponent},
  props: {
    title: {
      type: String,
      default: "",
      required: false,
    },
    message: {
      type: String,
      default: "Наразі сервіс недоступний",
      required: false,
    },
    textUnderMessage: {
      type: String,
      default: "Будь ласка спробуйте пізніше",
      required: false,
    },
    hasButton: {
      type: Boolean,
      default: false,
      required: false,
    },
    buttonLabel: {
      type: String,
      default: "Перейти",
      required: false,
    },
    route: {
      type: String,
      required: false,
    }
  },
}
</script>

<style scoped lang="scss">

.error_block {
  display: flex;
  @include calibri-regular;
  justify-content: center;
  align-items: center;
  height: 70vh;
  background-color: $background-white;
}

.message_block {
  max-width: 600px;
  padding: 40px;
  background-color: $background-white;
  border-radius: 15px;
  @include shadow-light;
  text-align: center;

  opacity: 0;
  transform: translateY(-20px);
  animation: fadeIn 0.5s ease-in-out forwards;
}

.error_page {
  h4 {
    @include poppins-bold;
    @include responsive-font(60, 58, 1440);
    color: $text-dark-blue;
    margin: 0 0 10px 0;
    text-align: center;
  }
  p {
    @include poppins-bold;
    @include responsive-font(24, 22, 1440);
    color: $text-dark-blue;
    margin: 0 0 10px 0;
  }
  span {
    @include poppins-medium;
    @include responsive-font(18, 16, 1440);
    color: $text-light-gray;
  }
}

.button_wrapper {
  margin-top: 20px;
  padding: 0 10%;
}


@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>