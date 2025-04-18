<template>
  <form enctype="multipart/form-data">
    <DocumentViewComponent />
  </form>
</template>


<script>

import DocumentViewComponent from '@/components/DocumentViewComponent.vue';

export default {
  components: {
    DocumentViewComponent,
  },
}
</script>