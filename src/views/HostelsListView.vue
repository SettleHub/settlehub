<template>
<div>
  <div v-if="hostelsDescription && hostelsDescription.length > 0">
    <HostelListComponent :hostels="hostelsDescription" />
  </div>
  <div v-else>
    <ServiceUnvailibleComponent />
  </div>
</div>

</template>

<script>
import {ref, onMounted, getCurrentInstance} from 'vue';
import HostelListComponent from "@/components/HostelList.vue";
import axios from 'axios';
import ServiceUnvailibleComponent from "@/components/ServiceUnvailibleComponent.vue";

export default {
  name: "HostelsListViewComponent",
  components: {
    ServiceUnvailibleComponent,
    HostelListComponent,
  },
  setup() {
    const {proxy} = getCurrentInstance();
    const hostelsDescription = ref([]); 
    const loadHostelsDescription = async () => {
      try {
        const response = await axios.get(`${proxy.$api}/hostels/`);
        if (response.data && Array.isArray(response.data)) {
          hostelsDescription.value = response.data;
        } else {
          console.error("Дані гуртожитків не є масивом", response.data);
        }
      } catch (error) {
        console.error('Помилка завантаження гуртожитків:', error);
      }
    };

    onMounted(() => {
      loadHostelsDescription();
    });

    return {
      hostelsDescription,
    };
  },
};
</script>

<style scoped lang="scss">

/* Write styles there */

</style>
