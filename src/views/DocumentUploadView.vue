<template>
    <div class="knutd-container">
      <div class="header">
        <h1>KNUTD</h1>
      </div>
      <div class="form-section">
        <h2>Обраний гуртожиток та кімната:</h2>
        <div class="room-selection">
          <label>Гуртожиток:</label>
          <input v-model="selectedRoom.hostel" type="number" placeholder="№"/>
          <label>Поверх:</label>
          <input v-model="selectedRoom.floor" type="number" placeholder="1"/>
          <label>Кімната:</label>
          <input v-model="selectedRoom.room" type="number" placeholder="110"/>
          <label>Блок:</label>
          <input v-model="selectedRoom.block" type="text" placeholder="A"/>
          <!-- <ButtonSelect name="Змінити" @click="selectDormitory" /> -->



        </div>
  
        <h3>Завантаження документів</h3>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="application">Заповніть та завантажте сам заяву</label>
            <input type="file" id="application" @change="handleFileChange" />
          </div>
  
          <div class="form-group">
            <label for="passport">Завантажити скан паспорту</label>
            <input type="file" id="passport" @change="handleFileChange" />
          </div>
  
          <div class="form-group">
            <label for="infoCard">Завантажити скан інфо-карти студента</label>
            <input type="file" id="infoCard" @change="handleFileChange" />
          </div>
  
          <div class="form-group">
            <label for="photo">Завантажити фото</label>
            <input type="file" id="photo" @change="handleFileChange" />
          </div>
  
          <div class="form-group">
            <label>Вкажіть вашу стать:</label>
            <div>
              <label>
                <input type="radio" v-model="gender" value="female" />
                Жіноча
              </label>
              <label>
                <input type="radio" v-model="gender" value="male" />
                Чоловіча
              </label>
            </div>
          </div>
  
          <button type="submit">Відправити</button>
        </form>
      </div>

    </div>
  </template>
  
  <script>
import ButtonSelect from '@/components/ButtonSelect.vue';

  export default {
    name: "DocumentUpload", // Це ім'я компонента
    components: ButtonSelect,
    data() {
      return {
        selectedRoom: {
          hostel: '',
          floor: '',
          room: '',
          block: ''
        },
        gender: '',
      };
    },
    methods: {
      handleFileChange(event) {
        console.log("Файл вибрано: ", event.target.files[0]);
      },
      submitForm() {
        // Логіка для обробки форми
        console.log("Форма відправлена");
      },
      toggleRoomStatus() {
        // Логіка для зміни блоку
        console.log("Блок змінено");
      }
    }
  };
  </script>
  
  <style scoped>
  .knutd-container {
    font-family: Arial, sans-serif;
    background-color: #f8f9fc;
    padding: 20px;
    border-radius: 8px;
    width: 60%;
    margin: 0 auto;
  }
  
  .header h1 {
    text-align: center;
    color: #003366;
  }
  
  .room-selection {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  
  .room-selection input {
    margin: 5px 0;
    padding: 10px;
    font-size: 14px;
    border-radius: 5px;
    border: 1px solid #ddd;
  }
  
  button {
    background-color: #007bff;
    color: white;
    padding: 10px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    margin-top: 10px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group input[type="file"] {
    padding: 10px;
    font-size: 14px;
  }
  
  footer {
    text-align: center;
    margin-top: 20px;
  }
  
  footer p {
    font-size: 18px;
    font-weight: bold;
  }
  
  footer div {
    font-size: 14px;
  }
  </style>
  