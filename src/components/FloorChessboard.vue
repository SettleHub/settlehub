<template>
    <div :class="`hostel_floor ${this.isActive ? 'active' : 'hidden'}`">
      <div class="floor_wrapper">
        <div class="floor_unit sanitary_unit-left">
          <div class="side-one">
            <div class="side_wrapper">
              <div class="room toilet">
                <div class="room-img"></div>
              </div>
              <div class="room stairs">
                <div class="room-img"></div>
              </div>
            </div>
          </div>
          <div class="side-two">
            <div class="side_wrapper">
              <div class="room sinks">
                <div class="room-img"></div>
              </div>
              <div class="room kitchen">
                <div class="room-img"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="floor_unit rooms_unit">
          <div class="side-one">

            <div v-for="room in floor.sideOne" class="room living" :key="room.roomNumber">
              <div class="room-number"><p class="room-number_text">№{{ room.roomNumber }}</p></div>
              <div class="places-living">
                <div
                  v-for="(place, index) in room.badPlaces"
                  :class="`living_place ${place == 'NOT_SPECIFIED' ? 'place-free' : 'place-booked'}`"
                  :key="index">
                </div>
              </div>
            </div>

          </div>
          <div class="side-two">

            <div v-for="room in floor.sideTwo" class="room living" :key="room.roomNumber">
              <div class="room-number"><p class="room-number_text">№{{ room.roomNumber }}</p></div>
              <div class="places-living">
                <div
                    v-for="(place, index) in room.badPlaces"
                    :class="`living_place ${place == 'NOT_SPECIFIED' ? 'place-free' : 'place-booked'}`"
                    :key="index">
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="floor_unit sanitary_unit-right">
          <div class="side-one">
            <div class="side_wrapper">
              <div class="room stairs">
                <div class="room-img"></div>
              </div>
              <div class="room toilet">
                <div class="room-img"></div>
              </div>
            </div>
          </div>
          <div class="side-two">
            <div class="side_wrapper">
              <div class="room kitchen">
                <div class="room-img"></div>
              </div>
              <div class="room sinks">
                <div class="room-img"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {reactive} from "vue";

export default {
  name: "FloorChessboardComponent",
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    roomsData: {
      type: Array,
      required: true,
    }
  },
  setup(props) {
    const floor = reactive({
      sideOne: [],
      sideTwo: [],
    });

    const halfLength = Math.ceil(props.roomsData.length / 2);

    floor.sideTwo = props.roomsData.slice(0, halfLength).reverse();
    floor.sideOne = props.roomsData.slice(halfLength);

    return { floor };
  }
}
</script>

<style scoped lang="scss">
.hostel_floor {
  border-radius: 20px;
  visibility: hidden;
  width: 0;
  height: 0;
  padding: 0;
  &.active {
    visibility: visible;
    width: max-content;
    height: max-content;
    padding: 0;
  }
  &.hidden {
    visibility: hidden;
    width: 0;
    height: 0;
    padding: 0;
  }
  .floor_wrapper {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    border-radius: 20px;
    border: 3px solid $border-gray;
    padding: 0;
    margin: 0;
    width: max-content;
    height: max-content;
    .floor_unit {
      &.sanitary_unit {
        &-left, &-right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .side {
            &-one, &-two {
              .side_wrapper {
                display: flex;
                flex-direction: row;
              }
              .room {
                padding: 45px 31px;
                &.toilet, &.sinks, &.kitchen {
                  border: 2px solid $border-gray;
                }
                &.stairs {
                  border: 2px solid transparent;
                }

                &.toilet .room-img,  &.stairs .room-img, &.sinks .room-img,  &.kitchen .room-img {
                  width: 44px;
                  height: 42px;
                }
                &.toilet .room-img {
                }
                &.stairs .room-img {
                  content: url(../assets/stairs.icon.svg);
                }
                &.sinks .room-img {
                }
                &.kitchen .room-img {
                  content: url(../assets/kitchen.icon.svg);
                }
              }
            }
          }
        }

        &-left {
          .side {
            &-one, &-two {
              .room {
                &.toilet {
                  border-radius: calc(20px - 3px) 0 5px 0;
                }
                &.sinks {
                  border-radius: 0 5px 0 calc(20px - 3px);
                }
                &.kitchen {
                  border-radius: 5px 5px 0 0;
                }
              }
            }
          }
        }

        &-right {
          .side {
            &-one, &-two {
              .room {
                &.toilet {
                  border-radius: 0 calc(20px - 3px) 0 5px;
                }
                &.kitchen {
                  border-radius: 5px 5px 0 0;
                }
                &.sinks {
                  border-radius: 5px 0 calc(20px - 3px) 0;
                }
              }
            }
          }
        }
      }

      &.rooms_unit {
        width: max-content;
        height: max-content;
        .side {
          &-one, &-two {
            display: flex;
            flex-direction: row;
            .room.living {
              position: relative;
              border: 2px solid $border-gray;
              padding: 25px 16px;
              .room-number {
                position: absolute;
                left: calc(50% - 30px);
                width: 60px;
                height: 34px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: $gainsboro-gray;
                border: 5px solid $background-gray;
                border-radius: 11px;
                .room-number_text {
                  color: $text-dark-blue;
                  font-size: 15px;
                  font-weight: 400;
                }
              }

              .places-living {
                display: flex;
                flex-wrap: wrap;
                gap: 4px;
                width: calc(33px + 4px + 33px);
                height: calc(42px + 14px + 42px);
                .living_place {
                  width: 33px;
                  height: 42px;
                  &:nth-child(3), &:nth-child(4) {
                    margin-top: 10px;
                  }
                  &.place-free {
                    content: url(../assets/bed_place.availible.icon.svg);
                  }

                }
              }
            }
          }

          &-one {
            .room.living {
              border-radius: 0 0 5px 5px;
              .room-number {
                bottom: -17px;
              }
            }
          }
          &-two {
            margin-top: 75px;
            .room.living {
              border-radius: 5px 5px 0 0;
              .room-number {
                top: -17px;
              }
            }
          }
        }
      }
    }
  }

}
</style>

<!--<style scoped lang="scss">-->
<!--.hostel_floor {-->
<!--  border-radius: 20px;-->
<!--  visibility: hidden;-->
<!--  height: 0;-->
<!--  &.active {-->
<!--    visibility: visible;-->
<!--    height: max-content;-->
<!--  }-->
<!--  &.hidden {-->
<!--    visibility: hidden;-->
<!--    height: 0;-->
<!--  }-->
<!--}-->

<!--.floor_wrapper {-->
<!--  border-radius: 20px;-->
<!--  border: 3px solid $border-gray;-->
<!--  display: flex;-->
<!--  flex-direction: row;-->
<!--}-->

<!--.floor_unit {-->
<!--  display: flex;-->
<!--  flex-direction: column;-->

<!--  .side-one, .side-two {-->
<!--    display: flex;-->
<!--    flex-direction: row;-->
<!--  }-->
<!--}-->

<!--.side_wrapper {-->

<!--}-->

<!--.room {-->
<!--  width: 85px;-->
<!--  height: 120px;-->
<!--  border-radius: 5px;-->
<!--  border: 1,5px solid $border-gray;-->
<!--}-->
<!--</style>-->