<template>
  <div>
    <!-- Вибір гуртожитку -->
    <select v-model="selectedDormitory.title">
      <option v-for="(dorm, index) in dormitories" :key="index" :value="dorm.title">
        {{ dorm.title }}
      </option>
    </select>

    <!-- Передача вибраного гуртожитку до дочірнього компонента -->
    <DormitoryBlock :elemetn="selectedDormitory" />
  </div>
</template>

<script>
import DormitoryBlock from './DormitoryBlock.vue';

export default {
  name: 'ParentComponent',
  components: {
    DormitoryBlock,
  },
  data() {
    return {
      dormitories: [
        { title: 'Гуртожиток №1', address: 'вул. Шевченка, 12', phone: '+380123456789' },
        { title: 'Гуртожиток №2', address: 'вул. Бойчука, 13–6', phone: '+380987654321' },
        { title: 'Гуртожиток №3', address: 'вул. Лесі Українки, 45', phone: '+380555555555' },
      ],
      selectedDormitory: { title: 'Гуртожиток №1', address: 'вул. Шевченка, 12', phone: '+380123456789' },
    };
  },
};
</script>
