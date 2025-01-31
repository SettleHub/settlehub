<template>
  <div class="form-container">
    <div class="section-one">
      <div class="room-section">
        <div class="header">
          <h3>Обраний гуртожиток та кімната:</h3>
          <router-link to="/hostels"><ButtonSelect :label="'Змінити'"/></router-link>
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

    <div class="space"></div>
    <div class="section-two">
      <h3 class="upload-header">Завантаження документів</h3>
      <div class="upload-section">
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
              
                <input id="radioButton1" type="radio" value="Дівчина" v-model="gender" />
                
                <label for="radioButton1">Дівчина</label>
            
                <input id="radioButton2"  type="radio" value="Хлопець" v-model="gender" />
                <label for="radioButton2">Хлопець</label>
            </div>
          </div>
          
          <label class="action-title">6. Контактні дані</label>
          <div class="upload-item contact-info">
            <input type="tel" placeholder="Введіть номер телефону" class="contact-field" />
            <input type="email" placeholder="Введіть вашу пошту" class="contact-field" />
          </div>
        </div>
      </div>

      <button class="submit-button">Відправити</button>
    </div>
  </div>
</template>

<script>
import DownloadButton from '@/components/DownloadButton.vue';
import FileUploader from '../components/FileUploader.vue'
import ButtonSelect from '@/components/ButtonSelect.vue';
export default {
  components: {
    DownloadButton,
    FileUploader,
    ButtonSelect
  },
  data() {
    return {
      gender: {
        Type: String,
        default: null,
      }
    };
  },
};
</script>

<style scoped>
.form-container {
  max-width: 1275px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  border-radius: 10px;
}

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


.section-two {
  margin-top: 20px;
  background-color: white;
  border-radius: 10px;
  padding: 1px 20px 30px 20px ;
}


.upload-header {
  margin-bottom: 10px;
}

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
  width: 601px; 
  border: 2px dashed #ddd;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
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

.gender-select {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
}


input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  border-radius: 50%;
  width: 16px;
  height: 16px;

  border: 2px solid #999;
  transition: 0.2s all linear;
  outline: none;
  margin-right: 5px;

  position: relative;
}


input[type="radio"] {
  display: none;
}


input[type="radio"] + label {
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  font-size: 16px;
  color: #333;
}

input[type="radio"] + label::before {
  content: "";
  position: absolute;
  left: 2.9px;
  top: 48%;
  transform: translateY(-45%);
  width: 10px;
  height: 10px;
  border: 2px solid #ccc;
  border-radius: 50%; 
  background: #fff;
  transition: 0.3s;
}
#radioButton1:checked + label::before {
  border-color: #FF1A63;
  background: #FF1A63;
}

#radioButton2:checked + label::before {
  border-color: #0E28B7;
  background: #0E28B7;
}

#radioButton1:checked + label {
  color: #FF1A63;
  
}

#radioButton2:checked + label {
  color: #0E28B7;
}


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
