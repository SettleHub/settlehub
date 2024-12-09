<template>
  <div class="card">
    <div class="card_wrapper">
      <div class="information_block">
        <h3 class="title">{{ dormitory.title }}</h3>
        <div class="description_and_contacts_block">
          <div class="description_block">
            <h4 class="description_title">Хто проживає в гуртожитку:</h4>
            <p class="description_text">{{ dormitory.description }}</p>
          </div>
          <div class="contacts_block">
            <h4 class="contacts_title">Адреса гуртожитку та контакти:</h4>
            <div class="contacts_list">
              <div class="contact_wrapper">
                <a class="link-dormitory_contact" :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dormitory.address)}`">
                  <img src="../assets/location.icon.svg" alt="Location" />
                  <p>{{ dormitory.address }}</p>
                </a>
              </div>
              <div class="contact_wrapper">
                <a class="link-dormitory_contact" :href="`tel: ${encodeURIComponent(dormitory.phone)}`">
                  <img src="../assets/phone.icon.svg" alt="Phone" />
                  <p>{{ dormitory.phone }}</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SelectButton :label="Обрати"/>
    </div>
  </div>
</template>

<script>
import SelectButton from "@/components/SelectButton.vue";

export default {
  name: "DormitoryCardComponent",
  components: { SelectButton },
  props: {
    dormitory: {
      type: Object,
      required: true,
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
  .title {
    @include poppins-bold;
    @include responsive-font(24, 20, 1440);
    color: $text-dark-blue;
    text-align: start;
  }
}


.description_and_contacts_block {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  gap: 69px;

  .description_block {
    max-width: 241px;

    .description_title {
      @include poppins-bold;
      @include responsive-font(16, 14, 1440);
      color: $text-dark-blue;
      text-align: start;
    }
    .description_text {
      margin-top: 18px;
      @include poppins-regular;
      @include responsive-font(13, 12, 1440);
      color: $text-light-gray;
      text-align: start;
    }
  }

  .contacts_block {
    max-width: 265px;

    .contacts_title {
      @include poppins-bold;
      @include responsive-font(16, 14, 1440);
      color: $text-dark-blue;
      text-align: start;
    }

    .contacts_list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 18px;

      .contact_wrapper {
        .link-dormitory_contact {
          text-decoration: none;
          display: flex;
          flex-direction: row;
          align-items: center;

          img {
            @include locked-image;
            margin-right: 13px;
          }
          p {
            @include poppins-medium;
            @include responsive-font(13, 12, 1440);
            color: $text-light-gray;
            text-align: start;
          }
        }
      }
    }
  }
}
</style>
  