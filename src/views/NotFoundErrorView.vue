<template>
  <div>
    <ServiceUnvailibleComponent :title="'404'"
                                :message="'Сторінку не знайдено'"
                                :textUnderMessage="'Для користування сервісом поверніться на головну сторінку.'"
                                :hasButton="true"
                                :buttonLabel="'На головну'"
                                :route="'/'" />
  </div>
</template>

<script>
import ServiceUnvailibleComponent from "@/components/ServiceUnvailibleComponent.vue";

export default {
  name: "InternalErrorView",
  components: {
    ServiceUnvailibleComponent
  },
}
</script>

<style scoped lang="scss">

</style>