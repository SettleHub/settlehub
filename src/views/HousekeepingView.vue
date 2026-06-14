<template>
  <div class="housekeeping-container">
    <div class="pms-header">
      <div class="titles">
        <h2 class="page-title">Правила автоматизації клінінгу</h2>
        <p class="page-subtitle">Налаштуйте автоматичний перехід кімнат у статус DIRTY</p>
      </div>
      <div class="controls">
        <button class="btn btn-primary" @click="openCreateModal">
          <span class="icon">+</span> Створити правило
        </button>
      </div>
    </div>

    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div> 
      <span>Завантаження правил...</span>
    </div>

    <div v-else-if="rules.length > 0" class="rules-grid">
      <div v-for="rule in rules" :key="rule.id" class="rule-card" :class="{ 'is-disabled': !rule.isActive }">
        
        <div class="card-header">
          <h3 class="rule-name">{{ rule.name }}</h3>
          <button 
            class="toggle-btn" 
            :class="rule.isActive ? 'active' : 'inactive'"
            @click="toggleStatus(rule)"
            :title="rule.isActive ? 'Вимкнути правило' : 'Увімкнути правило'"
          >
            {{ rule.isActive ? 'УВІМКНЕНО' : 'ВИМКНЕНО' }}
          </button>
        </div>

        <div class="card-body">
          <div class="info-row">
            <span class="label">Тригер:</span>
            <span class="value badge">{{ formatTrigger(rule.triggerType) }}</span>
          </div>
          <div class="info-row">
            <span class="label">Категорія:</span>
            <span class="value">{{ rule.targetCategory?.name || 'Всі категорії' }}</span>
          </div>
          <div class="info-row" v-if="rule.executionTime">
            <span class="label">Час виконання:</span>
            <span class="value">{{ formatTime(rule.executionTime) }}</span>
          </div>
          <div class="info-row" v-if="rule.dayOfWeek">
            <span class="label">День тижня:</span>
            <span class="value">{{ formatDay(rule.dayOfWeek) }}</span>
          </div>
        </div>

        <div class="card-footer">
          <button class="action-btn edit" @click="openEditModal(rule)">Редагувати</button>
          <button class="action-btn delete" @click="confirmDelete(rule.id)">Видалити</button>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <p>Жодного правила ще не створено.</p>
      <button class="btn btn-primary" @click="openCreateModal">Створити перше правило</button>
    </div>

    <div v-if="showModal" class="popup-inner" @click="hidePopup($event)">
      <div class="popup-wrapper">
        <div class="modal-content">
          
          <div class="modal-header">
            <h3>{{ isEditing ? 'Редагувати правило' : 'Нове правило' }}</h3>
            <button class="button-close" @click="closeModal">&times;</button>
          </div>

          <div class="modal-body">
            
            <div class="form-group">
              <label>Назва правила:</label>
              <input type="text" v-model="form.name" class="form-input" placeholder="Напр. Генеральне прибирання" />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Тип тригеру:</label>
                <select v-model="form.triggerType" class="form-input">
                  <option value="ON_CHECKOUT">Після виїзду гостя</option>
                  <option value="DAILY_OCCUPIED">Щоденно (якщо заселено)</option>
                  <option value="PRE_CHECKIN">Перед заїздом</option>
                </select>
              </div>

              <div class="form-group">
                <label>Цільова категорія:</label>
                <select v-model="form.categoryId" class="form-input">
                  <option :value="null">Всі категорії (Немає)</option>
                  <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                    {{ cat.name }}
                  </option>
                </select>
              </div>
            </div>

            <div class="form-row">
               <div class="form-group">
                <label>День тижня (Опціонально):</label>
                <select v-model="form.dayOfWeek" class="form-input">
                  <option value="">Не вказано (Кожен день)</option>
                  <option value="MONDAY">Понеділок</option>
                  <option value="TUESDAY">Вівторок</option>
                  <option value="WEDNESDAY">Середа</option>
                  <option value="THURSDAY">Четвер</option>
                  <option value="FRIDAY">П'ятниця</option>
                  <option value="SATURDAY">Субота</option>
                  <option value="SUNDAY">Неділя</option>
                </select>
              </div>

              <div class="form-group">
                <label>Час виконання:</label>
                <input type="time" v-model="form.timeString" class="form-input" />
              </div>
            </div>
            
            <div class="modal-actions">
              <button class="btn btn-secondary" @click="closeModal">Скасувати</button>
              <button class="btn btn-primary" @click="submitForm">{{ isEditing ? 'Зберегти' : 'Створити' }}</button>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { BookingService } from '@/services/booking';
import { useNotification } from "@kyvg/vue3-notification";

export default {
  name: "HousekeepingView",
  setup() {
    const { notify } = useNotification();

    const isLoading = ref(true);
    const rules = ref([]);
    const categories = ref([]);

    // Modal State
    const showModal = ref(false);
    const isEditing = ref(false);
    const currentRuleId = ref(null);
    
    const form = ref({
      name: '',
      triggerType: 'ON_CHECKOUT',
      categoryId: null,
      dayOfWeek: '',
      timeString: '12:00',
      isActive: true
    });

    const loadData = async () => {
      isLoading.value = true;
      try {
        const [rulesData, catData] = await Promise.all([
          BookingService.getHousekeepingRules(),
          BookingService.getCategories()
        ]);
        rules.value = rulesData || [];
        categories.value = catData || [];
      } catch (error) {
        notify({ title: "Помилка!", text: "Не вдалося завантажити правила.", type: "error" });
      } finally {
        isLoading.value = false;
      }
    };

    const formatTrigger = (type) => {
      const map = {
        'ON_CHECKOUT': 'Після виїзду',
        'DAILY_OCCUPIED': 'Щоденне (Заселено)',
        'PRE_CHECKIN': 'Перед заїздом'
      };
      return map[type] || type;
    };

    const formatDay = (day) => {
      const map = {
        'MONDAY': 'Пн', 'TUESDAY': 'Вт', 'WEDNESDAY': 'Ср', 
        'THURSDAY': 'Чт', 'FRIDAY': 'Пт', 'SATURDAY': 'Сб', 'SUNDAY': 'Нд'
      };
      return map[day] || day;
    };

    // Підлаштували форматування під те, що Spring тепер віддаватиме рядок (або масив, залежно від версії)
    const formatTime = (timeData) => {
      if (!timeData) return '--:--';
      if (typeof timeData === 'string') return timeData.substring(0, 5); // "12:00:00" -> "12:00"
      if (timeData.hour !== undefined) {
        const h = String(timeData.hour || 0).padStart(2, '0');
        const m = String(timeData.minute || 0).padStart(2, '0');
        return `${h}:${m}`;
      }
      return '--:--';
    };

    const toggleStatus = async (rule) => {
      try {
        const newStatus = !rule.isActive;
        await BookingService.toggleRuleStatus(rule.id, newStatus);
        rule.isActive = newStatus;
        notify({ 
          title: "Статус змінено", 
          text: `Правило "${rule.name}" ${newStatus ? 'увімкнено' : 'вимкнено'}.`, 
          type: "success" 
        });
      } catch (error) {
        notify({ title: "Помилка", text: "Не вдалося змінити статус.", type: "error" });
      }
    };

    const confirmDelete = async (id) => {
      if(confirm("Ви впевнені, що хочете видалити це правило?")) {
         try {
            await BookingService.deleteHousekeepingRule(id);
            notify({ title: "Успіх", text: "Правило видалено.", type: "success" });
            loadData();
         } catch (error) {
            notify({ title: "Помилка", text: "Не вдалося видалити.", type: "error" });
         }
      }
    };

    const openCreateModal = () => {
      isEditing.value = false;
      currentRuleId.value = null;
      form.value = {
        name: '',
        triggerType: 'ON_CHECKOUT',
        categoryId: null, // За замовчуванням Всі категорії
        dayOfWeek: '',
        timeString: '12:00',
        isActive: true
      };
      
      document.documentElement.classList.add('scroll-hidden');
      document.body.classList.add('scroll-hidden');
      showModal.value = true;
    };

    const openEditModal = (rule) => {
      isEditing.value = true;
      currentRuleId.value = rule.id;
      
      form.value = {
        name: rule.name,
        triggerType: rule.triggerType,
        categoryId: rule.targetCategory?.id || null,
        dayOfWeek: rule.dayOfWeek || '',
        timeString: formatTime(rule.executionTime),
        isActive: rule.isActive
      };

      document.documentElement.classList.add('scroll-hidden');
      document.body.classList.add('scroll-hidden');
      showModal.value = true;
    };

    const closeModal = () => {
      document.documentElement.classList.remove('scroll-hidden');
      document.body.classList.remove('scroll-hidden');
      showModal.value = false;
    };

    const hidePopup = (event) => {
      const target = event?.target;
      if (target && (target.classList?.contains('popup-inner') || target.classList?.contains('button-close'))) {
        closeModal();
      }
    };

    // ФІКС ПОМИЛКИ 400
    const submitForm = async () => {
      if (!form.value.name) {
         notify({ title: "Увага", text: "Заповніть назву правила.", type: "warn" });
         return;
      }

      // Spring Boot Jackson вимагає формат "HH:mm:ss" для LocalTime
      const formattedTime = form.value.timeString.length === 5 
                            ? `${form.value.timeString}:00` 
                            : form.value.timeString;

      const payload = {
        name: form.value.name,
        triggerType: form.value.triggerType,
        dayOfWeek: form.value.dayOfWeek === '' ? null : form.value.dayOfWeek,
        executionTime: formattedTime, // ТЕПЕР ЦЕ РЯДОК
        isActive: form.value.isActive
      };

      try {
        if (isEditing.value) {
          await BookingService.updateHousekeepingRule(currentRuleId.value, payload, form.value.categoryId);
          notify({ title: "Успіх", text: "Правило оновлено.", type: "success" });
        } else {
          await BookingService.createHousekeepingRule(payload, form.value.categoryId);
          notify({ title: "Успіх", text: "Правило створено.", type: "success" });
        }
        closeModal();
        loadData();
      } catch (error) {
         notify({ title: "Помилка", text: "Не вдалося зберегти правило.", type: "error" });
      }
    };

    onMounted(() => {
      loadData();
    });

    onUnmounted(() => {
      document.documentElement.classList.remove('scroll-hidden');
      document.body.classList.remove('scroll-hidden');
    });

    return {
      isLoading, rules, categories,
      formatTrigger, formatDay, formatTime,
      toggleStatus, confirmDelete,
      showModal, isEditing, form,
      openCreateModal, openEditModal, closeModal, hidePopup, submitForm
    };
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/mixins.scss";

:global(.scroll-hidden) {
  overflow: hidden;
  height: 100%;
}

.housekeeping-container {
  padding: 20px;
  background-color: $background-gray;
  min-height: calc(100vh - 100px);

  .pms-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;

    .page-title {
      @include poppins-bold;
      font-size: 24px;
      color: $text-dark-blue;
      margin: 0;
    }
    .page-subtitle {
       @include poppins-medium;
       font-size: 14px;
       color: $text-light-gray;
       margin-top: 5px;
    }
  }

  /* СІТКА КАРТОК ПРАВИЛ */
  .rules-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
  }

  .rule-card {
    background-color: $background-white;
    border-radius: 15px;
    border: 1px solid $sheet-bar-gray;
    padding: 20px;
    @include shadow-light;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s, opacity 0.3s;

    &.is-disabled {
       opacity: 0.7; 
       border-style: dashed;
    }

    &:hover {
       transform: translateY(-3px);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 15px;
      border-bottom: 1px solid $sheet-bar-gray;
      padding-bottom: 15px;

      .rule-name {
        @include poppins-bold;
        font-size: 16px;
        color: $text-dark-blue;
        margin: 0;
        flex: 1;
        padding-right: 10px;
      }

      .toggle-btn {
        @include poppins-bold;
        font-size: 10px;
        padding: 4px 8px;
        border-radius: 6px;
        border: none;
        cursor: pointer;
        transition: all 0.2s;

        &.active {
           background-color: rgba($deep-sky-blue, 0.1);
           color: $deep-sky-blue;
        }
        &.inactive {
           background-color: rgba($text-light-gray, 0.2);
           color: $text-light-gray;
        }
      }
    }

    .card-body {
       flex: 1;
       display: flex;
       flex-direction: column;
       gap: 10px;
       margin-bottom: 20px;

       .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .label {
             @include poppins-medium;
             font-size: 13px;
             color: $text-light-gray;
          }
          .value {
             @include poppins-bold;
             font-size: 13px;
             color: $text-dark-blue;

             &.badge {
                background-color: $background-gray;
                padding: 3px 8px;
                border-radius: 6px;
             }
          }
       }
    }

    .card-footer {
       display: flex;
       gap: 10px;
       
       .action-btn {
          flex: 1;
          @include poppins-semibold;
          font-size: 13px;
          padding: 8px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s;

          &.edit {
             background-color: $background-gray;
             color: $text-dark-blue;
             &:hover { background-color: $sheet-bar-gray; }
          }
          &.delete {
             background-color: rgba($bright-red, 0.05);
             color: $bright-red;
             &:hover { background-color: rgba($bright-red, 0.15); }
          }
       }
    }
  }

  .loading-state, .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100px 20px;
    @include poppins-medium;
    color: $text-light-gray;

    p { margin-bottom: 20px; font-size: 16px;}

    .spinner {
      border: 4px solid $sheet-bar-gray;
      width: 40px; height: 40px;
      border-radius: 50%;
      border-left-color: $bright-blue;
      animation: spin 1s linear infinite;
      margin-bottom: 15px;
    }
  }
}

/* UI Кнопки загальні */
.btn {
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  @include poppins-bold;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;

  &-primary {
    background-color: $bright-blue;
    color: $text-white;
    &:hover { filter: brightness(1.1); transform: translateY(-1px); }
  }

  &-secondary {
    background-color: $background-gray;
    color: $text-dark-blue;
    border: 1px solid $border-gray;
    &:hover { background-color: $sheet-bar-gray; }
  }
}

/* --- ПОПАП АРХІТЕКТУРА --- */
.popup-inner {
  position: fixed;
  top: 0; left: 0;
  z-index: 1000;
  width: 100vw; height: 100vh;
  overflow-y: auto;
  padding: 5% 15px;
  background-color: $background-black-30;
  backdrop-filter: blur(4px); 
}

.popup-wrapper {
  max-width: 550px; /* Збільшили для кращого вигляду (було 500) */
  margin: 0 auto;
  animation: slideDown 0.3s ease-out;

  .modal-content {
    background: $background-white;
    padding: 30px;
    border-radius: 20px;
    @include shadow-light;

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
      border-bottom: 1px solid $sheet-bar-gray;
      padding-bottom: 15px;

      h3 {
        @include poppins-bold;
        font-size: 20px;
        color: $text-dark-blue;
        margin: 0;
      }

      .button-close {
        background: transparent;
        border: none;
        font-size: 28px;
        line-height: 1;
        cursor: pointer;
        color: $text-light-gray;
        transition: color 0.2s;
        &:hover { color: $bright-red; }
      }
    }

    .modal-body {
      .form-row {
        display: flex;
        gap: 15px;
      }

      .form-group {
        margin: 10px 0;
        display: flex;
        flex-direction: column;
        flex: 1;
        min-width: 0; /* ФІКС: дозволяє колонці звужуватись, якщо текст задовгий */

        label {
          @include poppins-semibold;
          font-size: 13px;
          color: $text-dark-blue;
          margin-bottom: 8px;
          white-space: nowrap; /* Забороняємо перенесення лейблів */
        }

        .form-input {
          width: 100%; /* ФІКС: чітко на всю ширину колонки */
          box-sizing: border-box; /* ФІКС: враховуємо паддінги */
          background-color: $background-white;
          border: 1px solid $border-gray;
          border-radius: 10px;
          padding: 12px 15px;
          color: $text-dark-blue;
          @include poppins-medium;
          outline: none;
          transition: border-color 0.2s;
          text-overflow: ellipsis; /* Ховаємо задовгий текст з крапками */
          
          &:focus { border-color: $bright-blue; box-shadow: 0 0 0 2px rgba($bright-blue, 0.1); }
        }
      }

      .modal-actions {
        display: flex;
        justify-content: flex-end;
        gap: 15px;
        margin-top: 30px;
      }
    }
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 600px) {
  .popup-wrapper {
    width: 100%;
    .modal-content {
      padding: 20px;
      .form-row { flex-direction: column; gap: 0; }
    }
  }
}
</style>