<template>
  <div class="dorm-info">
    <!-- Виведення title з переданого пропса -->
    <h2>Гуртожиток №2</h2>
    <div class="dorm-details">
      <div class="dorm-description">
        <p><strong>Хто проживає в гуртожитку:</strong></p>
        <p>
          Гуртожиток для студентів і аспірантів, які навчаються на факультетах
          індустрії моди та культурних і креативних індустрій, інституті права
          та сучасних технологій.
        </p>
      </div>
      <div class="dorm-contact">
        <p><strong>Адреса гуртожитку та контакти:</strong></p>
        <p>
          <i class="icon-location"></i> вул. Бойчука Михайла, 13–6
        </p>
        <p>
          <i class="icon-phone"></i> +36849168498
        </p>
      </div>
    </div>
    <div class="button-container">
      <SelectButton @click="selectDormitory" />
    </div>
  </div>
</template>

<script>
import SelectButton from './SelectButton.vue';

export default {
  name: 'HostleItemListCard',
  components: {
    SelectButton,
  },
  props: {
    elemetn: {
      type: Object,
      required: true,
    },
  },
  methods: {
    selectDormitory() {
      alert('Гуртожиток обрано!');
    },
  },
};
</script>


<style scoped>
.dorm-info {
  background-color: #f9fbff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 1100px;
  height: 215px;
  margin: 60px 0px 0px 350px;
  position: relative; /* Додаємо позиціонування для контейнера */
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
.dorm-description{
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


.button-container{
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
  background-image: url('../assets/icon-location.png')
}

.icon-phone::before {
  background-image: url('../assets/icon-phone.png');
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