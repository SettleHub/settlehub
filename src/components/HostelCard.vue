<template>
  <div class="card">
    <div class="card_wrapper">
      <div class="information_block">
        <div class="title_wrapper">
          <h3 class="title">{{ hostel.title }}</h3>
          <div v-if="this.authorized" class="button_wrapper">
            <ButtonComponent :isLink=true
                             :route="`/hostel/${hostel.number}`"
                             @click="selectHostel(hostel.number)"
                             :className="'button-select_hostel-mobile'" />
          </div>
        </div>
        <div class="description_and_contacts_block">
          <div class="description_block">
            <h4 class="description_title">Хто проживає в гуртожитку:</h4>
            <p class="description_text">{{ hostel.description }}</p>
          </div>
          <div class="contacts_block">
            <h4 class="contacts_title">Адреса гуртожитку та контакти:</h4>
            <div class="contacts_list">
              <div class="contact_wrapper">
                <a class="link-hostel_contact" :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hostel.address)}`">
                  <img src="../assets/location.icon.svg" alt="Location" />
                  <p>{{ hostel.address }}</p>
                </a>
              </div>
              <div class="contact_wrapper">
                <a class="link-hostel_contact" :href="`tel: ${encodeURIComponent(hostel.phone)}`">
                  <img src="../assets/phone.icon.svg" alt="Phone" />
                  <p>{{ hostel.phone }}</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="this.authorized" class="button_block">
        <ButtonComponent :isLink=true
                      :route="`/hostel/${hostel.number}`"
                      @click="selectHostel(hostel.number)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonComponent from "@/components/ButtonComponent.vue";
import {setHostelNumber} from "@/services/selectStorage";

export default {
  name: "HostelCardComponent",
  components: { ButtonComponent },
  props: {
    hostel: {
      type: Object,
      required: true,
    },
    authorized: {
      type: Boolean,
      required: true,
    }
  },
  methods: {
    selectHostel(number) {
      setHostelNumber(number);
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  background: transparent;
}

.card_wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.information_block {
  display: flex;
  flex-direction: column;
  position: relative;
  .title_wrapper {
    display: flex;
    justify-content: space-between;
    .title {
      @include poppins-bold;
      @include responsive-font(24, 16, 1440);
      color: $text-dark-blue;
      text-align: start;
    }
    .button_wrapper {
      display: none;
      @media (max-width: 768px) {
        display: block;
      }
    }
  }
}

::v-deep(.button-select_hostel-mobile) {
  @media (max-width: 768px) {
    width: 83px;
    height: 25px;
  }
}

.button_block {
  height: max-content;
  @media (max-width: 768px) {
    display: none;
  }
}

.description_and_contacts_block {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  column-gap: 70px;
  row-gap: 15px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    margin-top: 5px;
  }

  .description_block {
    max-width: 241px;

    .description_title {
      @include poppins-bold;
      @include responsive-font(16, 14, 1440);
      color: $text-dark-blue;
      text-align: start;

      @media (max-width: 768px) {
        display: none;
      }
    }
    .description_text {
      margin-top: 18px;
      @include poppins-regular;
      @include responsive-font(13, 13, 1440);
      color: $text-light-gray;
      text-align: start;

      @media (max-width: 768px) {
        margin-top: 0;
      }
    }
  }

  .contacts_block {
    max-width: 265px;

    .contacts_title {
      @include poppins-bold;
      @include responsive-font(16, 13, 1440);
      color: $text-dark-blue;
      text-align: start;
    }

    .contacts_list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 18px;

      .contact_wrapper {
        .link-hostel_contact {
          text-decoration: none;
          display: flex;
          flex-direction: row;
          align-items: center;

          img {
            @include locked-image;
            margin-right: 13px;
            @media (max-width: 768px) {
              height: 16px;
              margin-right: 5px;
            }
          }
          p {
            @include poppins-medium;
            @include responsive-font(13, 11, 1440);
            color: $text-light-gray;
            text-align: start;
          }
        }
      }
    }
  }
}
</style>
  