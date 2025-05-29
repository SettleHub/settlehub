<template>
  <div>
    <div v-if="submissionsCount === -1" class="loading_block">
      <ServiceUnvailibleComponent message="Завантаження..."
                                  textUnderMessage="" />
    </div>

    <form v-else-if="submissionsCount < submissionsMaxCount"
          enctype="multipart/form-data">
      <SummerDocumentViewComponent />
    </form>

    <div v-else-if="submissionsCount >= submissionsMaxCount" class="error_block">
      <ServiceUnvailibleComponent
          :message="'Ліміт подання заявок вичерпано'"
          :textUnderMessage="'Дочекайтеся завершення минулих або ж зверніться до підтримки по допомогу.'" />
    </div>

    <div v-else class="error_block">
      <ServiceUnvailibleComponent />
    </div>
  </div>
</template>

<script>

import SummerDocumentViewComponent from "@/components/SummerDocumentViewComponent.vue";
import { getActiveSubmissionsCountByOwner } from "@/services/submissions";
import { SUBMISSIONS_MAX_COUNT } from "@/services/credentials";
import ServiceUnvailibleComponent from "@/components/ServiceUnvailibleComponent.vue";

export default {
  components: {
    ServiceUnvailibleComponent,
    SummerDocumentViewComponent,
  },
  data() {
    return {
        submissionsMaxCount: SUBMISSIONS_MAX_COUNT,
        submissionsCount: -1,
    };
  },
  mounted() {
    this.fetchActiveSubmissionsCount();
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
