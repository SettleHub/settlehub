<template>
    <div>
    <div v-if="hostelsDescription && hostelsDescription.length > 0">
      <HostelListComponent :hostels="hostelsDescription" />
    </div>
    <div v-else>
    <div class="error_block">
      <div class="error_page">
        <div class="message_block">
        <p>Sorry, but the service is unavailable</p>
         <span>Please, come back later or reload page</span>
        </div>  
      </div>
    </div>  
  </div>
</div>

</template>

<script>
import {ref, onMounted} from 'vue';
import HostelListComponent from "@/components/HostelList.vue";
import axios from 'axios'; 

export default {
  name: "HostelsListViewComponent",
  components: {
    HostelListComponent,
  },
  setup() {
    const hostelsDescription = ref([]); 
    const loadHostelsDescription = async () => {
      try {
        const response = await axios.get('http://192.168.197.153:8081/api/hostels'); 
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
.error_block {
  display: flex;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  justify-content: center;
  align-items: center;
  height: 70vh; 
  background-color: #f4f4f4; 
}

.message_block {
  max-width: 600px;
  padding: 40px;
  background-color: white;
  border-radius: 15px; 
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); 
  text-align: center;
  
  opacity: 0;
  transform: translateY(-20px);
  animation: fadeIn 0.5s ease-in-out forwards;
}

.error_page p {
  font-size: 24px;
  color: #2d08b5;
  margin: 0;
}
.error_page span {
  font-size: 18px;
  color:  #2d08b5;
  padding-top: 10px;
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
