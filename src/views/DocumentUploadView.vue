<template>
  <div class="form-container">
    <!-- Перша частина контейнера -->
    <div class="section-one">
      <div class="room-section">
        <div class="header">
          <h3>Обраний гуртожиток та кімната:</h3>
          <button class="change-button">Змінити</button>
        </div>

        <div class="room-info">
          <div class="room-detail">
            <span class="label">Гуртожиток:</span>
            <span class="value">№7</span>
          </div>
          <div class="room-detail">
            <span class="label">Поверх:</span>
            <span class="value">1</span>
          </div>
          <div class="room-detail">
            <span class="label">Клітка:</span>
            <span class="value">2</span>
          </div>
          <div class="room-detail">
            <span class="label">Блок:</span>
            <span class="value">110</span>
            <div class="block-info">
          <span class="block">Жіночий блок</span>
        </div>
          </div>
          <div class="room-detail">
            <span class="label">Кімната:</span>
            <span class="value">A</span>
          </div>
        </div>

        
      </div>
    </div>

    <!-- Відступ між секціями -->
    <div class="space"></div>

    <!-- Друга частина контейнера -->
    <div class="section-two">
      <h3 class="upload-header">Завантаження документів</h3>
      <div class="upload-section">
        <!-- Перша колонка -->
        <div class="column">
          <label class="action-title">1. Заповніть та завантажте скан заяви</label>
          <DownloadButton :style="{ width: '602px' }" />

          <div class="upload-item">
            <div class="upload-block">
              <img src="../assets/Frame.svg" alt="icon" />
              <p>Виберіть файл, завантажений з комп'ютера</p>
                <FileUploader label="Завантажити заповнену заяву"   />
            </div>
          </div>

          <label class="action-title">2. Завантажити скан паспорту</label>
          <div class="upload-item">
            <div class="upload-block">
              <img src="../assets/Frame.svg" alt="icon" />
              <p>Виберіть файл, завантажений з комп'ютера</p>
              <FileUploader label="Завантажити скан"   />
            </div>
          </div>

          <label class="action-title">3. Завантажити скан ідентифікаційного коду</label>
          <div class="upload-item">
            <div class="upload-block">
              <img src="../assets/Frame.svg" alt="icon" />
              <p>Виберіть файл, завантажений з комп'ютера</p>
              <FileUploader label="Завантажити скан"   />
            </div>
          </div>
        </div>

        <!-- Друга колонка (розширена) -->
        <div class="column expanded-column">
          <label class="action-title">4. Завантажити фото</label>
          <div class="upload-item">
            <div class="upload-block">
              <img src="../assets/PhotoDoc.svg" alt="icon" />
              <p>Виберіть файл, завантажений з комп'ютера</p>
              <FileUploader label="Завантажити фото"   />
            </div>
          </div>

          <label class="action-title">5. Вкажіть вашу стать</label>
          <div class="upload-item">
            <div class="gender-select">
              <label>
                <input type="radio" value="Дівчина" v-model="gender" />
                Дівчина
              </label>
              <label>
                <input type="radio" value="Хлопець" v-model="gender" />
                Хлопець
              </label>
            </div>
          </div>
          
          <!-- Контактні дані -->
          <label class="action-title">6. Контактні дані</label>
          <div class="upload-item contact-info">
            <input type="tel" placeholder="Введіть номер телефону" class="contact-field" />
            <input type="email" placeholder="Введіть вашу пошту" class="contact-field" />
          </div>
        </div>
      </div>

      <!-- Кнопка відправити -->
      <button class="submit-button">Відправити</button>
    </div>
  </div>
</template>

<script>
import DownloadButton from '@/components/DownloadButton.vue';
import FileUploader from '../components/FileUploader.vue'
export default {
  components: {
    DownloadButton,
    FileUploader
  },
  data() {
    return {
      gender: "",
    };
  },
};
</script>

<style scoped>
/* Main container styling */
.form-container {
  max-width: 1275px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  border-radius: 10px;
}

/* Розділ гуртожитку та кімнати */
.room-section {
  background-color: white;
  margin-top: 20px;
  background-color: white;
  border-radius: 10px;
  padding: 1px 20px 30px 20px ;

}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.change-button {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

/* Room info */
.room-info {
  display: flex;
  gap: 20px;
}

.room-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.label {
  color: #A3AED0 ;
  font-weight: bold;
  font-size: 16px;
}

.value {
  padding: 10px;
  border-radius: 5px;
  font-size: 18px;
  width: 80%;
  text-align: center;
}

/* Block info */
.block-info {
  margin-top: 10px;
}

.block {
  background: #ffcccb;
  color: #d9534f;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px;
}


/* Друга частина контейнера */
.section-two {
  margin-top: 20px;
  background-color: white;
  border-radius: 10px;
  padding: 1px 20px 30px 20px ;
}


/* Заголовок завантаження документів */
.upload-header {
  margin-bottom: 10px;
}

/* Upload section */
.upload-section {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.expanded-column {
  flex: 1.5;
}

.action-title {
  margin-bottom: 10px;
  font-weight: bold;
  text-align: left;
}

.upload-item {
  height: 141px;
  width: 601px; /* Make sure they take the full width of the container */
   /* You can adjust this to your desired width */
  border: 2px dashed #ddd;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto; /* This will center the items horizontally */
}

.upload-block {
  text-align: center;
}

.upload-block img {
  width: 24px;
  height: 24px;
  margin-bottom: 5px;
}

.upload-block p {
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
}

.file-button {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.file-button img {
  width: 20px;
  height: 20px;
}

/* Gender selection */
.gender-select {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
}

/* Contact info */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.contact-field {
  margin-top: 5px;
  padding: 8px;
  width: 520px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

.submit-button {
  background: #4318FF;
  color: white;
  border: none;
  padding: 15px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  margin-top: 10px;
  text-align: center;
}

.submit-button:hover {
  background: #3913e4;
}
</style>
