<template>
  <div>
    <!-- Перевірка наявності даних перед відображенням -->
    <div v-if="hostels && hostels.length > 0">
      <div v-for="hostel in hostels" :key="hostel.id">
        <DormitoryListComponent :dormitory="hostel" />
      </div>
    </div>
    <!-- Якщо дані ще не завантажились -->

  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import DormitoryListComponent from "@/components/DormitoryListComponent.vue";
import axios from 'axios'; // або ваш спосіб отримання даних (fetch, etc.)

export default {
  name: "HostelViewComponent",
  components: {
    DormitoryListComponent,
  },
  setup() {
    // Ініціалізація змінної для даних гуртожитків
    const hostels = ref([]); // Початкове значення - порожній масив

    // Завантаження даних за допомогою axios або іншого методу
    const loadHostels = async () => {
      try {
        const response = await axios.get('/api/hostels'); // Замість '/api/hostels' використовуйте правильний URL
        if (response.data && Array.isArray(response.data)) {
          hostels.value = response.data; // Записуємо отримані дані у змінну
        } else {
          console.error("Дані гуртожитків не є масивом", response.data);
        }
      } catch (error) {
        console.error('Помилка завантаження гуртожитків:', error);
      }
    };

    // Виклик функції завантаження даних після монтування компонента
    onMounted(() => {
      loadHostels();
    });

    return {
      hostels,
    };
  },
};
</script>

<style scoped>
.dorm-info {
  background-color: #f9fbff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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
  color: #323a56;
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
  background-color: #5a5eff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.choose-btn:hover {
  background-color: #4848e5;
}
</style>
