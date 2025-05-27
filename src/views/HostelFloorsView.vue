<template>
  <div v-if="floorsData && floorsData.floors && floorsData.floors.length > 0" class="hostel_view_inner">
    <div class="hostel_view_wrapper">

      <div class="navigation_wrapper">
        <nav class="floors_nav" v3>
          <ul class="floors_links_list">
            <li v-for="f in floorsData.floors" :key="f.floorNumber">
              <ButtonComponent
                  :label="`${f.floorNumber} поверх`"
                  :isLink="true"
                  :route="`/hostel/${this.id}/floor/${f.floorNumber}`"
                  :paddingH="20"
                  :paddingV="10"
                  :isActive="this.floorNumber == f.floorNumber"
                  @click="selectFloor(f.floorNumber)"
              />
            </li>
          </ul>
        </nav>
        <div class="hostel_title_wrapper">
          <h2 class="hostel_title">Гуртожиток №{{this.id}}</h2>
        </div>
      </div>

      <div class="chessboard_inner">
        <div class="chessboard_wrapper">
          <div class="scroll-button scroll-left" @click="scrollLeft">
            <img src="@/assets/left-arrow.icon.svg" alt="Ліворуч" />
          </div>
          <ul ref="scrollingRef" class="floors_list">
            <li v-for="f in floorsData.floors" 
                :key="f.floorNumber" 
                :class="`${this.floorNumber == f.floorNumber ? 'scrollable' : ''}`"> 
              <FloorChessboardComponent :roomsData="f.rooms" :isActive="this.floorNumber == f.floorNumber" />
            </li>
          </ul>
          <div class="scroll-button scroll-right" @click="scrollRight">
            <img src="@/assets/right-arrow.icon.svg" alt="Праворуч" />
          </div>
        </div>

        <nav class="map_legends_wrapper">
          <ul class="map_legends_list">
            <li>
              <div class="map_legend">
                <div class="color_mark" />
                <p class="map_legend_description">Місце зайняте</p>
              </div>
            </li>
            <li>
              <div class="map_legend free-for_man">
                <div class="color_mark" />
                <p class="map_legend_description">Місце вільне для хлопця</p>
              </div>
            </li>
            <li>
              <div class="map_legend free-for_girl">
                <div class="color_mark" />
                <p class="map_legend_description">Місце вільне для дівчини</p>
              </div>
            </li>
          </ul>
        </nav>
      </div>

    </div>
  </div>

  <div v-else class="error_block">
    <ServiceUnvailibleComponent />
  </div>
      
</template>

  <script>
  import FloorChessboardComponent from "@/components/FloorChessboard.vue";
  import { reactive, onMounted, getCurrentInstance } from "vue";
  import axios from "axios";
  import ButtonComponent from "@/components/ButtonComponent.vue";
  import ServiceUnvailibleComponent from "@/components/ServiceUnvailibleComponent.vue";
  import { setHostelFloor } from "@/services/selectStorage";

  export default {
    name: "HostelFloorsViewComponent",
    props: ['id', 'floorNumber'],
    components: {
      ServiceUnvailibleComponent,
      ButtonComponent,
      FloorChessboardComponent
    },
    methods: {
      scrollLeft() {
        this.$refs.scrollingRef.scrollBy({ left: -200, behavior: 'smooth' });
      },
      scrollRight() {
        this.$refs.scrollingRef.scrollBy({ left: 200, behavior: 'smooth' });
      },
      selectFloor(floor) {
        setHostelFloor(floor);
      },
    },
    setup(props){
      const {proxy} =  getCurrentInstance();
      let floorsData = reactive({
        floors: [],
        firstRoom: 0,
        lastRoom: 0,
      });
    
      onMounted(() => {
          axios.get(`${proxy.$api}/view/hostel/${props.id}`,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            }
          })
          .then(response => {
          floorsData.floors = response.data.floors || [];
          floorsData.firstRoom = response.data.firstRoom;
          floorsData.lastRoom = response.data.lastRoom;
        })
        .catch(error => {
          console.error("Error fetching floors data:", error);
        });

        setHostelFloor(Number(props.floorNumber));
    });

    return {
      floorsData
    };
  }
}
  
</script>

<style lang="scss" scoped>
.scrollable {
  padding: 25px;
}

.hostel_view_wrapper {
  padding: 40px 130px 60px;
}

.navigation_wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.floors_links_list {
  display: flex;
  flex-direction: row;
  gap: 40px;
  li {
    list-style: none;
    @include shadow-light();
  }
}

.hostel_title_wrapper {
  background-color: $background-white;
  border-radius: 5px;
  padding: 5px 48px;
  @include shadow-light();
  .hostel_title {
    @include poppins-bold;
    @include responsive-font(24, 13, 1440);
    color: $text-dark-blue;
  }
}

.chessboard_inner {
  padding: 65px 115px 0;
}

.chessboard_wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  .floors_list {
    scroll-behavior: smooth;
    overflow-x: auto;
    overflow-y: hidden;

    li {
      list-style: none;
      border-radius: 20px;
    }
  }
}

.map_legends_wrapper {
  margin-top: 50px;
  background-color: $background-white;
  padding: 29px 28px;
  border-radius: 20px;
  @include shadow-light;

  .map_legends_list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap; 
    gap: 30px;

    li {
      list-style: none;
      .map_legend {
        min-width: 230px;
        padding: 10px;
        border-radius: 5px;
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: $background-gray;

        .color_mark {
          width: 24px;
          height: 24px;
          border-radius: 5px;
          background-color: $gainsboro-gray;
        }

        &.free-for_man {
          .color_mark {
            background-color: $bright-blue;
          }
        }
        &.free-for_girl {
          .color_mark {
            background-color: $bright-red;
          }
        }

        .map_legend_description {
          margin-left: 12px;
          color: $text-dark-blue;
          @include responsive-font(14, 12, 1440);
          @include poppins-regular;
        }

      }
    }
  }
}

.scroll-button {
  display: none;
}

@media (max-width: 1440px) {
  .hostel_view_wrapper {
    padding: 40px 7vw 50px;
  }

  .chessboard_inner {
    padding: 65px 6vw 0;
  }
}

@media (max-width: 1200px) {
  .navigation_wrapper {
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    gap: 25px;
  }

  .hostel_title_wrapper {
    width: max-content;
  }

  .chessboard_inner {
    padding: 65px 0 0;
  }
}

@media (max-width: 768px) {
  .hostel_view_wrapper {
    padding: 35px 0 40px;
  }

  .hostel_title_wrapper {
    padding: 5px 26px;
  }

  .floors_nav {
    max-width: 90%;
    overflow-x: auto;
    scroll-behavior: smooth;
    padding-bottom: 10px;

    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .chessboard_wrapper .floors_list {
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .scroll-button {
    display: block;
    position: absolute;
    width: 32px;
    height: 32px;
    top: 175px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9;

    img {
      width: 15px;
    }

    &.scroll-left {
      left: 5px;
    }
    &.scroll-right {
      right: 5px;
    }
  }

  .scrollable {
    padding: 0;
  }
 
  .chessboard_inner {
    padding: 25px 0 0;
  }

  .map_legends_wrapper {
    margin-top: 30px;
    border-radius: 0;
    padding: 20px;
    .map_legends_list {
      flex-direction: column;
      gap: 10px;

      li .map_legend {
        width: max-content;
      }
    }
  }
}

::v-deep(.hostel_floor.active) {
  @media (max-width: 768px) {
    padding: 0 40px;
  }
}


</style>
