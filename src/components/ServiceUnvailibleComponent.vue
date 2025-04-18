<template>
  <div class="error_block">
    <div class="error_page">
      <div class="message_block">
        <p>Наразі сервіс недоступний</p>
        <span>Будь ласка спробуйте пізніше</span>
      </div>
    </div>
  </div>
</template>

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

.error_page p {
  @include responsive-font(24, 24, 1440);
  color: $text-dark-blue;
  margin: 0 0 10px 0;
}
.error_page span {
  @include responsive-font(18, 18, 1440);
  color: $text-light-gray;
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