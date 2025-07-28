<template>
  <div>
    <div v-if="submissionsCount === -1" class="loading_block">
      <ServiceUnvailibleComponent message="Завантаження..."
                                  textUnderMessage="" />
    </div>

    <form v-else-if="(submissionsCount < submissionsMaxCount) && (selectedHostelNumber > 0 && selectedHostelFloor > 0 && selectedHostelRoom > 0)"
          enctype="multipart/form-data">
      <DocumentUploadWrapper />
    </form>

    <div v-else-if="submissionsCount >= submissionsMaxCount" class="error_block">
      <ServiceUnvailibleComponent
          :message="'Ліміт подання заявок вичерпано'"
          :textUnderMessage="'Дочекайтеся завершення минулих або ж зверніться до підтримки по допомогу.'" />
    </div>

    <div v-else-if="selectedHostelNumber <= 0 || selectedHostelFloor <= 0" class="error_block">
      <ServiceUnvailibleComponent :message="'Не обрано гуртожиток'"
                                  :textUnderMessage="'Щоб продовжити, спочатку оберіть гуртожиток зі списку.'"
                                  :hasButton="true"
                                  :buttonLabel="'Перейти до списку'"
                                  :route="'/hostels'" />
    </div>

    <div v-else-if="(selectedHostelNumber > 0 && selectedHostelFloor > 0) && selectedHostelRoom <= 0" class="error_block">
      <ServiceUnvailibleComponent :message="'Не обрано кімнату'"
                                  :textUnderMessage="'Щоб продовжити, спочатку оберіть поверх та кімнату на схемі.'"
                                  :hasButton="true"
                                  :buttonLabel="'Перейти до вибору кімнат'"
                                  :route="`/hostel/${selectedHostelNumber}/floor/${selectedHostelFloor}`" />
    </div>

    <div v-else class="error_block">
      <ServiceUnvailibleComponent />
    </div>
  </div>
</template>

<script>

import DocumentUploadWrapper from "@/components/DocumentUploadWrapper.vue";
import { getActiveSubmissionsCountByOwner } from "@/services/submissions";
import { SUBMISSIONS_MAX_COUNT } from "@/services/credentials";
import ServiceUnvailibleComponent from "@/components/ServiceUnvailibleComponent.vue";
import { getHostelFloor, getHostelNumber, getHostelRoom } from "@/services/selectStorage";

export default {
  components: {
    ServiceUnvailibleComponent,
    DocumentUploadWrapper,
  },
  data() {
    return {
        submissionsMaxCount: SUBMISSIONS_MAX_COUNT,
        submissionsCount: -1,
        selectedHostelNumber: 0,
        selectedHostelFloor: 0,
        selectedHostelRoom: 0,
    };
  },
  mounted() {
    this.fetchActiveSubmissionsCount();
    this.fetchSelectedHostelNumberAndFloorAndRoom();
  },
  methods: {
    async fetchActiveSubmissionsCount() {
      try {
        const { body, status } = await getActiveSubmissionsCountByOwner(
          localStorage.getItem("userId")
        );
        if (status === 200) {
          this.submissionsCount = Number(body);
        } else {
          this.showError(status);
        }

      } catch (error) {
        console.error('Помилка при завантаженні даних користувача:', error);
        this.$notify({
          title: 'Помилка при завантаженні даних користувача.',
          text: `Деталі: ${error.message}`,
          type: 'error'
        });
      }
    },
    fetchSelectedHostelNumberAndFloorAndRoom() {
      this.selectedHostelNumber = getHostelNumber();
      this.selectedHostelFloor = getHostelFloor();
      this.selectedHostelRoom = getHostelRoom();
    },
    showError(status) {
      let message = 'Невідома помилка.';

      switch (status) {
        case 403:
          message = 'У вас немає прав на перегляд цих даних.';
          break;
        case 404:
          message = 'Користувача з таким ID не знайдено.';
          break;
        case 401:
          message = 'Сесія не дійсна або користувача не автентифіковано.';
          break;
        case 0:
          message = 'Немає з’єднання з сервером.';
          break;
      }

      console.error('Помилка при завантаженні даних користувача:', status);
      this.$notify({
        title: 'Помилка при завантаженні даних користувача',
        text: `Деталі: ${message}`,
        type: 'error'
      });
    },
  },
}
</script>
