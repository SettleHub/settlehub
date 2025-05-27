<template>
  <div class="hostels_inner">
    <div class="hostels_wrapper">
      <ul class="hostels_list">
        <li v-for="h in hostels" :key="h.title">
          <HostelCardComponent :hostel="h" v-model:authorized="hasJwt" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import HostelCardComponent from "@/components/HostelCard.vue";

  export default {
    name: 'HostelListComponent',
    components: {
      HostelCardComponent,
    },
    data() {
      return {
        hasJwt: !!localStorage.getItem('jwt'),
      };
    },
    props: {
      hostels: {
        type: Array,
        required: true,
      },
    },
    methods: {
      checkJwt() {
        this.hasJwt = !!localStorage.getItem('jwt');
      },
    },
    mounted() {
      window.addEventListener('storage', this.checkJwt);
    },
    unmounted() {
      window.removeEventListener('storage', this.checkJwt);
    }
  };
</script>

<style lang="scss" scoped>
  .hostels_inner {
    padding: 90px 169px;
    background-color: $background-gray;
  }

  .hostels_list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 70px;
  }

  @media (max-width: 768px) {
    .hostels_inner {
      padding: 34px 5%;
    }
    .hostels_list {
      gap: 54px;
    }
  }
</style>