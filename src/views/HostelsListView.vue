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
.dorm-info {
  background-color: $background-white;
  padding: 30px;
  border-radius: 10px;
  @include shadow-light;
  width: 100%; /* Ширина на 100% доступної площі */
  max-width: 1100px; /* Максимальна ширина */
  height: auto; /* Автоматична висота, щоб підлаштуватися під контент */
  position: relative;
  margin: 20px auto;
}

@media (max-width: 1024px) {
  .dorm-info {
    padding: 20px; /* Зменшуємо паддінги для планшетів */
    margin: 10px 0px; /* Додаємо відступи для планшетів */
  }
}

@media (max-width: 768px) {
  .dorm-info {
    padding: 15px; /* Зменшуємо паддінги для мобільних пристроїв */
    margin: 10px 0px; /* Відступи для мобільних пристроїв */
    width: 100%; /* Ширина 100% для мобільних */
  }
}

.dorm-info h2 {
  color: $text-dark-blue;
  margin-bottom: 20px;
  display: flex;
  justify-content: row;
}

.dorm-details {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.dorm-description,
.dorm-contact {
  flex: 1;
  margin: 0;
}
.dorm-description {
  max-width: 290px;
}

.dorm-description p,
.dorm-contact p {
  color: #555;
  margin: 0; /* Убираем внешние отступы у параграфов */
  padding: 0; /* Убираем внутренние отступы у параграфов */
  display: block; /* Убедимся, что каждый параграф на новой строке */
  text-align: left; /* Прижимаем текст к левой стороне */
  margin: 0px 0px 25px 0px;
}

.button-container {
  max-width: 83px;
  position: absolute;
  top: 10px; /* Відстань від верхнього краю */
  right: 10px; /* Відстань від правого краю */
  padding: 20px 50px 0px 0px;
}

.icon-location::before,
.icon-phone::before {
  content: "";
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  background-size: contain;
  background-repeat: no-repeat;
}

.icon-location::before {
  background-image: url("../assets/icon-location.svg");
}

.icon-phone::before {
  background-image: url("../assets/icon-phone.svg");
}

.choose-btn {
  background-color: $bright-blue;
  color: $text-white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  @include calibri-bold;
  @include responsive-font(16, 16, 1440);
  cursor: pointer;
}

.choose-btn:hover {
  background-color: $bright-blue;
  @include shadow-light;
}

</style>
