<template>
  <div>
    <ServiceUnvailibleComponent :title="'500'"
                                :message="'Перепрошуємо, наші студенти знову все запороли'" />
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