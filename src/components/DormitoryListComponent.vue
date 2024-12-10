<template>
  <div class="dormitories_inner">
    <div class="dormitories_wrapper">
      <ul class="dormitories_list">
        <li v-for="d in dormitories" :key="d.title">
          <DormitoryCardComponent :dormitory="d" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import DormitoryCardComponent from "@/components/DormitoryCardComponent.vue";
  import dormitories from "@/assets/dormitories.json";

  export default {
    name: 'DormitoryListComponent',
    components: {
      DormitoryCardComponent,
    },
    data() {
      return {
        dormitories,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .dormitories_inner {
    padding: 90px 169px;
    background-color: $background-gray;
  }

  .dormitories_list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 70px;
  }
</style>