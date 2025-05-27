<template>
  <div class="ca-diia-instructions-inner">
    <div class="ca-diia-instructions-wrapper">
      <InstructionsToggler v-model:device="this.internalDevice" />
      <h3>Підписання заяви з Дія.Підпис, покрокова інструкція</h3>
      <ol v-if="this.internalDevice == 'computer'">
        <li>
          <p>Відкрийте у своєму браузері сторінку сервісу Дія.Підпис за посиланням:
            <a href="https://ca.diia.gov.ua/" target="_blank">https://ca.diia.gov.ua/</a>
          </p>
        </li>
        <li>
          <p>Перебуваючи на головній сторінці, клікніть на пункт меню "Довірчі послуги".</p>
          <img class="image-pc" src="@/assets/ca.diia/instruction-1.pc.png" alt="img">
        </li>
        <li>
          <p>Перед вами відкриється список, з нього вибираємо "Підписати документ"</p>
          <img class="image-pc" src="@/assets/ca.diia/instruction-2.pc.png" alt="img">
        </li>
        <li>
          <p>Перейшовши, перед вами  встане меню з вибором, виберіть з нього пункт “Дія.Підпис - UA”</p>
          <img class="image-pc" src="@/assets/ca.diia/instruction-3.pc.png" alt="img">
        </li>
        <li>
          <p>Після недовгого очікування на сторінці з'явиться тимчасово згенерований QR код</p>
          <img class="image-pc" src="@/assets/ca.diia/instruction-4.pc.png" alt="img">
        </li>
        <li>
          <p>Скануємо його з телефону використовуючи додаток Дія або ж вбудовану функцію на телефоні.</p>
        </li>
        <li>
          <p>Надаємо дозвіл сервісу на використання особистого ключа, натискаємо “Підписати”, верифікуємось.</p>
          <img class="image-mobile" src="@/assets/ca.diia/instruction-5.pc.png" alt="img">
        </li>
        <li>
          <p>Після верифікації натискаємо “Підписано” та повертаємося назад в браузер.</p>
          <img class="image-mobile" src="@/assets/ca.diia/instruction-6.pc.png" alt="img">
        </li>
        <li>
          <p>Перевіряємо наші особисті дані, після чого натискаємо “Далі” та переходимо до наступного кроку.</p>
          <img class="image-pc" src="@/assets/ca.diia/instruction-7.pc.png" alt="img">
        </li>
        <li>
          <p>Сервіс запитає в якому форматі підписати документ, Натискаємо “Так, підписати в форматі ASIC-E”</p>
          <img class="image-pc" src="@/assets/ca.diia/instruction-8.pc.png" alt="img">
        </li>
        <li>
          <p>Натискаємо на область для завантаження файлів, після чого додаємо файл з заповненою заявою.</p>
        </li>
        <li>
          <p>Завантаживши заяву, натискаємо “Підписати в форматі ASIC-E”.</p>
          <img class="image-pc" src="@/assets/ca.diia/instruction-9.pc.png" alt="img">
        </li>
        <li>
          <p>Аналогічно до того як ми робили, cкануємо QR код з телефону використовуючи додаток Дія або ж вбудовану функцію на телефоні.</p>
          <img class="image-pc" src="@/assets/ca.diia/instruction-10.pc.png" alt="img">
        </li>
        <li>
          <p>Нарешті підписуємо нашу заяву, натискаємо “Підписати”, та верифікуємось.</p>
          <img class="image-mobile" src="@/assets/ca.diia/instruction-11.pc.png" alt="img">
        </li>
        <li>
          <p>Натискаємо “Підписано” та повертаємося назад в браузер.</p>
          <img class="image-mobile" src="@/assets/ca.diia/instruction-12.pc.png" alt="img">
        </li>
        <li>
          <p>Натискаємо “Завантажити все архівом”, та відвантажуємо архів у відповідному полі.</p>
          <img class="image-pc" src="@/assets/ca.diia/instruction-13.pc.png" alt="img">
        </li>
      </ol>

      <ol v-else >
        <li>
          <p>Відкрийте у своєму браузері сторінку сервісу Дія.Підпис за посиланням:
            <a href="https://ca.diia.gov.ua/" target="_blank">https://ca.diia.gov.ua/</a>
          </p>
        </li>
        <li>
          <p>Перебуваючи на головній сторінці, клікніть на кнопку “Підписати документи”.</p>
          <img class="image-mobile" src="@/assets/ca.diia/instruction-1.mobile.png" alt="img">
        </li>
        <li>
          <p>Перейшовши, перед вами  встане меню з вибором, виберіть з нього пункт “Дія.Підпис - UA”</p>
          <img class="image-mobile" src="@/assets/ca.diia/instruction-2.mobile.png" alt="img">
        </li>
        <li>
          <p>Після недовгого очікування натискаємо на згенерований QR код та переходимо в додаток Дія.</p>
        </li>
        <li>
          <p>Надаємо дозвіл сервісу на використання особистого ключа, натискаємо “Підписати”, верифікуємось.</p>
          <img class="image-mobile" src="@/assets/ca.diia/instruction-3.mobile.png" alt="img">
        </li>
        <li>
          <p>Після верифікації натискаємо “Підписано” та повертаємося назад в браузер.</p>
          <img class="image-mobile" src="@/assets/ca.diia/instruction-4.mobile.png" alt="img">
        </li>
        <li>
          <p>Перевіряємо наші особисті дані, після чого натискаємо “Далі” та переходимо до наступного кроку.</p>
          <img class="image-mobile" src="@/assets/ca.diia/instruction-5.mobile.png" alt="img">
        </li>
        <li>
          <p>Сервіс запитає в якому форматі підписати документ, Натискаємо “Так, підписати в форматі ASIC-E”</p>
          <img class="image-mobile" src="@/assets/ca.diia/instruction-6.mobile.png" alt="img">
        </li>
        <li>
          <p>Натискаємо на область для завантаження файлів, після чого додаємо файл з заповненою заявою.</p>
        </li>
        <li>
          <p>Завантаживши заяву, натискаємо “Підписати в форматі ASIC-E”.</p>
          <img class="image-mobile" src="@/assets/ca.diia/instruction-7.mobile.png" alt="img">
        </li>
        <li>
          <p>Робимо як й до цього, натискаємо на QR код та переходимо в додаток Дія.</p>
        </li>
        <li>
          <p>Нарешті підписуємо нашу заяву, натискаємо “Підписати”, та верифікуємось.</p>
          <img class="image-mobile" src="@/assets/ca.diia/instruction-8.mobile.png" alt="img">
        </li>
        <li>
          <p>Натискаємо “Підписано” та повертаємося назад в браузер.</p>
          <img class="image-mobile" src="@/assets/ca.diia/instruction-9.mobile.png" alt="img">
        </li>
        <li>
          <p>Натискаємо “Завантажити все архівом”, та відвантажуємо архів у відповідному полі.</p>
          <img class="image-mobile" src="@/assets/ca.diia/instruction-10.mobile.png" alt="img">
        </li>
      </ol>

      <div class="close-button-wrapper">
        <ButtonComponent
            type="button"
            :paddingV="10"
            :paddingH="116"
            :className="'button-close'"
            label="Закрити"
            @click="(e) => hidePopup(e)" />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonComponent from '@/components/ButtonComponent.vue';
import InstructionsToggler from '@/components/InstructionsToggler.vue';

export default {
  components: {
    ButtonComponent,
    InstructionsToggler
  },
  data() {
    return {
      internalDevice: this.device || 'mobile'
    };
  },
  props: {
    device: {
      type: String,
      required: false,
    },
    hidePopup: {
      type: Function,
      required: true
    }
  },
  watch: {
    internalDevice(newVal) {
      this.$emit('update:device', newVal);
    },
    device(newVal) {
      this.internalDevice = newVal;
    }
  },
  created() {
    if (this.device != null) {
      this.internalDevice = this.device;
    }
  }
};
</script>

<style scoped lang="scss">
.ca-diia-instructions-wrapper {
  margin: 0 auto;
  padding: 34px;
  background-color: $background-white;
  @include poppins-bold;
  color: $text-dark-blue;
  border-radius: 20px;
}

h3 {
  @include responsive-font(24, 13, 1440);
  text-align: center;
}

ol {
  max-width: 800px;
  padding: 0 15px;
  margin: 15px auto 0;
}

ol li {
  margin-bottom: 6px;
  @include responsive-font(16, 8, 1440);
  text-align: start;
}

ol img {
  display: block;
  margin: 24px auto 24px;
  width: 60vw;

  &.image-mobile {
    max-width: 350px;
  }

  &.image-pc {
    max-width: 100%;
  }
}


a {
  color: $text-dark-blue;
  @include poppins-bold;
  text-decoration: underline;
}

.close-button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 44px;
}

@media (max-width: 600px) {
  .ca-diia-instructions-wrapper {
    padding: 20px 10px;
  }
  ol img {
    max-width: 220px;
  }
}
</style>

