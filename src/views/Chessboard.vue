<template>
  <div class="pms-chessboard">
    <div class="pms-header">
      <div class="titles">
        <h2 class="page-title">Шахматка бронювань</h2>
      </div>
      <div class="controls">
        <button class="btn btn-secondary" @click="changeMonth(-1)">&#8592; Попередній</button>
        <span class="current-month">{{ currentMonthName }} {{ currentYear }}</span>
        <button class="btn btn-secondary" @click="changeMonth(1)">Наступний &#8594;</button>
      </div>
    </div>

    <div v-if="!isLoading" class="table-wrapper">
      <table class="chessboard-table">
        <thead>
          <tr>
            <th class="sticky-col room-header">Кімната / Категорія</th>
            <th v-for="day in daysInMonth" :key="day" class="day-header">
              {{ day }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="room in rooms" :key="room.id">
            <td class="sticky-col room-info">
              <div class="room-details">
                <span class="room-number">№ {{ room.number }}</span>
                <span class="room-category">{{ room.category?.name || 'Стандарт' }}</span>
              </div>
              
              <div class="housekeeping-control" 
                   :class="room.status.toLowerCase()" 
                   title="Керування статусом прибирання">
                <span class="status-dot"></span>
                
                <div class="status-actions">
                  <button v-if="room.status === 'DIRTY'" 
                          @click="toggleRoomStatus(room, 'CLEAN')" 
                          class="action-btn clean-btn">
                    Прибрано
                  </button>
                  
                  <button v-if="room.status === 'AVAILABLE' || room.status === 'OCCUPIED'" 
                          @click="toggleRoomStatus(room, 'DIRTY')" 
                          class="action-btn dirty-btn">
                    Забруднено
                  </button>
                </div>
              </div>
            </td>

            <td 
              v-for="day in daysInMonth" 
              :key="day" 
              class="cell"
              :class="getCellClass(room.id, day)"
              @click="handleCellClick(room.id, day)"
              :title="getTooltip(room, day)"
            >
              <div v-if="getBookingForCell(room.id, day)" class="booking-bar">
                <span class="booking-name">{{ getBookingForCell(room.id, day).guestRequest || 'Бронь' }}</span>
                <span class="booking-price">{{ room.category.basePrice }}₴</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="loading-state">
      <div class="spinner"></div> 
      <span>Завантаження даних...</span>
    </div>

    <div v-if="showModal" class="popup-inner" @click="hidePopup($event)">
      <div class="popup-wrapper">
        <div class="modal-content">
          
          <div class="modal-header">
            <h3>{{ selectedBooking ? 'Керування бронюванням' : 'Оформлення бронювання' }}</h3>
            <button class="button-close" @click="closeModal">&times;</button>
          </div>

          <div v-if="selectedBooking" class="modal-body">
            
            <div class="room-summary">
              <div class="summary-badge">№ {{ selectedRoom?.number }}</div>
              <div class="summary-details">
                <strong>{{ selectedRoom?.category?.name }}</strong>
                <span>Поверх: {{ selectedRoom?.floor }} | {{ selectedRoom?.building }}</span>
              </div>
            </div>

            <div class="info-grid">
              <div class="info-block">
                <span class="info-label">Побажання гостя:</span>
                <span class="info-value">{{ selectedBooking.guestRequest || 'Відсутні' }}</span>
              </div>
              <div class="info-block">
                <span class="info-label">Дати проживання:</span>
                <span class="info-value highlight">{{ selectedBooking.checkInDate }} &#8594; {{ selectedBooking.checkOutDate }}</span>
              </div>
              <div class="info-block">
                <span class="info-label">Тривалість:</span>
                <span class="info-value">{{ existingBookingDays }} діб</span>
              </div>
              <div class="info-block">
                <span class="info-label">Загальна вартість:</span>
                <span class="info-value price">{{ existingBookingTotalPrice }} ₴</span>
              </div>
            </div>
            
            <div class="modal-actions">
              <button class="btn btn-secondary" @click="mockFeature('Редагування броні')">Редагувати</button>
              <button class="btn btn-danger" @click="mockFeature('Скасування броні')">Скасувати бронь</button>
            </div>
          </div>

          <div v-else class="modal-body">
            
            <div class="room-summary">
              <div class="summary-badge">№ {{ selectedRoom?.number }}</div>
              <div class="summary-details">
                <strong>{{ selectedRoom?.category?.name }}</strong>
                <span>До {{ selectedRoom?.category?.maxAdults }} дор. / {{ selectedRoom?.category?.maxChildren }} дит.</span>
                <span class="price-tag">{{ selectedRoom?.category?.basePrice }} ₴ / ніч</span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Дата заїзду:</label>
                <input type="date" v-model="bookingForm.checkInDate" @change="validateDates" class="form-input" />
              </div>
              <div class="form-group">
                <label>Дата виїзду:</label>
                <input type="date" v-model="bookingForm.checkOutDate" :min="minCheckOutDate" class="form-input" />
              </div>
            </div>
            
            <div class="form-group">
              <label>Ім'я гостя / Коментар:</label>
              <input type="text" v-model="bookingForm.guestRequest" class="form-input" placeholder="Введіть ПІБ або побажання" />
            </div>

            <div class="receipt-block" v-if="newBookingDays > 0">
              <div class="receipt-row">
                <span>Тривалість проживання:</span>
                <strong>{{ newBookingDays }} діб</strong>
              </div>
              <div class="receipt-row total">
                <span>До сплати:</span>
                <strong>{{ newBookingTotalPrice }} ₴</strong>
              </div>
            </div>
            
            <div class="modal-actions">
              <button class="btn btn-secondary" @click="closeModal">Відміна</button>
              <button class="btn btn-primary" @click="submitBooking">Створити бронь</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { BookingService } from '@/services/booking';
import { useNotification } from "@kyvg/vue3-notification"; 

export default {
  name: "ChessboardComponent",
  setup() {
    const { notify } = useNotification();

    const isLoading = ref(true);
    const rooms = ref([]);
    const reservations = ref([]);
    const currentDate = ref(new Date());
    
    // Modal State
    const showModal = ref(false);
    const selectedRoom = ref(null);
    const selectedDate = ref(null);
    const selectedBooking = ref(null);
    
    const bookingForm = ref({
      userId: Number(localStorage.getItem('userId')) || 1, 
      categoryId: null,
      checkInDate: '',
      checkOutDate: '',
      guestRequest: ''
    });

    // Helpers
    const currentYear = computed(() => currentDate.value.getFullYear());
    const currentMonth = computed(() => currentDate.value.getMonth());
    const currentMonthName = computed(() => {
      return currentDate.value.toLocaleString('uk-UA', { month: 'long' });
    });
    
    const daysInMonth = computed(() => {
      return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
    });

    const loadData = async () => {
      isLoading.value = true;
      try {
        const startDate = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-01`;
        const endDate = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${daysInMonth.value}`;

        const [roomsData, calendarData] = await Promise.all([
          BookingService.getRooms(),
          BookingService.getCalendar(startDate, endDate)
        ]);

        rooms.value = roomsData || [];
        reservations.value = calendarData || []; 
      } catch (error) {
        notify({ title: "Помилка!", text: "Не вдалося завантажити календар.", type: "error" });
      } finally {
        isLoading.value = false;
      }
    };

    const changeMonth = (offset) => {
      currentDate.value = new Date(currentYear.value, currentMonth.value + offset, 1);
      loadData();
    };

    const getBookingForCell = (roomId, day) => {
      const targetDate = new Date(currentYear.value, currentMonth.value, day).toISOString().split('T')[0];
      return reservations.value.find(res => {
        return res.room.id === roomId && 
               targetDate >= res.checkInDate && 
               targetDate < res.checkOutDate;
      });
    };

    const getCellClass = (roomId, day) => {
      const booking = getBookingForCell(roomId, day);
      if (booking) return 'booked'; 
      return 'available';
    };

    // Нативний тултип при наведенні мишкою
    const getTooltip = (room, day) => {
      const booking = getBookingForCell(room.id, day);
      const dateStr = `${day} ${currentMonthName.value}`;
      if (booking) {
        return `Кімната ${room.number} | Зайнята (${booking.checkInDate} - ${booking.checkOutDate})`;
      }
      return `Кімната ${room.number} | Вільна на ${dateStr} | ${room.category.basePrice}₴`;
    };

    // Обчислення дат та вартості
    const calculateDays = (start, end) => {
      if (!start || !end) return 0;
      const s = new Date(start);
      const e = new Date(end);
      if (e <= s) return 0;
      return Math.ceil(Math.abs(e - s) / (1000 * 60 * 60 * 24));
    };

    const toggleRoomStatus = async (room, action) => {
      try {
        if (action === 'CLEAN') {
          await BookingService.markRoomAsClean(room.id);
          notify({ title: "Статус оновлено", text: `Кімната №${room.number} прибрана!`, type: "success" });
        } else if (action === 'DIRTY') {
          await BookingService.markRoomAsDirty(room.id);
          notify({ title: "Статус оновлено", text: `Кімната №${room.number} потребує прибирання.`, type: "warn" });
        }
        
        // Оновлюємо дані на клієнті, щоб уникнути зайвого запиту до сервера (або можеш викликати loadData())
        room.status = action === 'CLEAN' ? 'AVAILABLE' : 'DIRTY'; 
        
      } catch (error) {
        notify({ title: "Помилка", text: "Не вдалося змінити статус кімнати.", type: "error" });
      }
    };

    const newBookingDays = computed(() => calculateDays(bookingForm.value.checkInDate, bookingForm.value.checkOutDate));
    const newBookingTotalPrice = computed(() => newBookingDays.value * (selectedRoom.value?.category?.basePrice || 0));

    const existingBookingDays = computed(() => {
      if (!selectedBooking.value) return 0;
      return calculateDays(selectedBooking.value.checkInDate, selectedBooking.value.checkOutDate);
    });
    const existingBookingTotalPrice = computed(() => existingBookingDays.value * (selectedRoom.value?.category?.basePrice || 0));

    // Валідація дат: Виїзд не може бути раніше заїзда
    const minCheckOutDate = computed(() => {
      if (!bookingForm.value.checkInDate) return '';
      const minDate = new Date(bookingForm.value.checkInDate);
      minDate.setDate(minDate.getDate() + 1);
      return minDate.toISOString().split('T')[0];
    });

    const validateDates = () => {
      if (bookingForm.value.checkInDate >= bookingForm.value.checkOutDate) {
        bookingForm.value.checkOutDate = minCheckOutDate.value;
      }
    };

    // Відкриття клітинки
    const handleCellClick = (roomId, day) => {
      const booking = getBookingForCell(roomId, day);
      selectedRoom.value = rooms.value.find(r => r.id === roomId);

      if (booking) {
        selectedBooking.value = booking;
      } else {
        selectedBooking.value = null;
        
        const targetDate = new Date(currentYear.value, currentMonth.value, day);
        // За замовчуванням виїзд на наступний день (користувач зможе змінити в календарі)
        const outDate = new Date(targetDate);
        outDate.setDate(outDate.getDate() + 1);

        // Враховуємо зсув часових поясів при форматуванні дат
        const formatDate = (date) => new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];

        bookingForm.value = {
          userId: Number(localStorage.getItem('userId')) || 1, 
          categoryId: selectedRoom.value.category.id,
          checkInDate: formatDate(targetDate),
          checkOutDate: formatDate(outDate),
          guestRequest: ''
        };
      }
      
      openModal();
    };

    const openModal = () => {
      document.documentElement.classList.add('scroll-hidden');
      document.body.classList.add('scroll-hidden');
      showModal.value = true;
    };

    const closeModal = () => {
      document.documentElement.classList.remove('scroll-hidden');
      document.body.classList.remove('scroll-hidden');
      showModal.value = false;
      selectedBooking.value = null;
    };

    const hidePopup = (event) => {
      const target = event?.target;
      if (target && (target.classList?.contains('popup-inner') || target.classList?.contains('button-close'))) {
        closeModal();
      }
    };

    const submitBooking = async () => {
      try {
        if(newBookingDays.value <= 0) {
          notify({ title: "Увага!", text: "Виберіть коректні дати.", type: "warn" });
          return;
        }
        await BookingService.bookRoom(bookingForm.value);
        notify({ title: "Успішно!", text: "Бронювання створено.", type: "success" });
        closeModal();
        await loadData(); 
      } catch (error) {
        notify({ title: "Помилка!", text: "Не вдалося створити бронювання.", type: "error" });
      }
    };

    const mockFeature = (featureName) => {
      notify({ 
        title: "В розробці", 
        text: `Функція "${featureName}" очікує на відповідний ендпоінт API.`, 
        type: "info" 
      });
      closeModal();
    };

    onMounted(() => loadData());
    onUnmounted(() => {
      document.documentElement.classList.remove('scroll-hidden');
      document.body.classList.remove('scroll-hidden');
    });

    return {
      isLoading, rooms, daysInMonth, currentYear, currentMonthName,
      changeMonth, getCellClass, getBookingForCell, getTooltip, handleCellClick,
      showModal, hidePopup, closeModal,toggleRoomStatus,
      selectedRoom, selectedDate, selectedBooking, bookingForm, 
      newBookingDays, newBookingTotalPrice, existingBookingDays, existingBookingTotalPrice,
      minCheckOutDate, validateDates, submitBooking, mockFeature
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

.pms-chessboard {
  background-color: $background-gray;
  padding: 20px;
  border-radius: 15px;

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

    .controls {
      display: flex;
      align-items: center;
      gap: 15px;

      .current-month {
        @include poppins-bold;
        font-size: 16px;
        text-transform: capitalize;
        min-width: 150px;
        text-align: center;
        color: $text-dark-blue;
      }
    }
  }

  .table-wrapper {
    overflow-x: auto;
    border: 1px solid $sheet-bar-gray;
    border-radius: 15px;
    background-color: $background-white;
    @include shadow-light;

    .chessboard-table {
      /* Дає повітря клітинкам як ти просив (4px відступ) */
      border-collapse: separate; 
      border-spacing: 4px; 
      width: 100%;
      min-width: 1000px;
      padding: 10px;
      
      th, td {
        border-radius: 6px; 
        padding: 6px;
        text-align: center;
      }

      th {
        background-color: $background-gray;
        @include poppins-semibold;
        font-size: 13px;
        color: $text-light-gray;
        position: sticky;
        top: 0;
        z-index: 1;
      }

      .sticky-col {
        position: sticky;
        left: 0;
        z-index: 3;
        background-color: $background-white;
        box-shadow: 4px 0 8px rgba(112, 144, 176, 0.08); 
      }

      .room-info {
        display: flex;
        flex-direction: row; /* Змінено на row, щоб статус був збоку */
        justify-content: space-between;
        align-items: center;
        min-width: 180px; /* Трохи розширимо для кнопки */
        padding: 10px 15px;

        .room-details {
          display: flex;
          flex-direction: column;
        }

        .room-number {
          @include poppins-bold;
          font-size: 16px;
          color: $text-dark-blue;
        }

        .room-category {
          @include poppins-medium;
          font-size: 11px;
          color: $text-light-gray;
        }

        /* --- ІНТЕРАКТИВНИЙ КОНТРОЛ ПРИБИРАННЯ --- */
        .housekeeping-control {
          position: relative;
          display: flex;
          align-items: center;
          padding: 8px;
          border-radius: 8px;
          transition: background-color 0.2s;

          .status-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            display: inline-block;
          }

          &.dirty .status-dot { background-color: $bright-red; box-shadow: 0 0 8px rgba($bright-red, 0.5); }
          &.available .status-dot { background-color: $deep-sky-blue; }
          &.occupied .status-dot { background-color: $dark-blue; }

          /* Приховані кнопки дій */
          .status-actions {
            position: absolute;
            left: 100%; /* З'являється праворуч від точки */
            top: 50%;
            transform: translateY(-50%) translateX(10px);
            opacity: 0;
            visibility: hidden;
            transition: all 0.2s;
            z-index: 10;
            background: $background-white;
            border-radius: 6px;
            @include shadow-light;
            padding: 4px;

            .action-btn {
              @include poppins-bold;
              font-size: 10px;
              padding: 4px 8px;
              border-radius: 4px;
              border: none;
              cursor: pointer;
              white-space: nowrap;

              &.clean-btn {
                background-color: rgba($deep-sky-blue, 0.1);
                color: $deep-sky-blue;
                &:hover { background-color: $deep-sky-blue; color: white; }
              }
              &.dirty-btn {
                background-color: rgba($bright-red, 0.1);
                color: $bright-red;
                &:hover { background-color: $bright-red; color: white; }
              }
            }
          }

          /* Ховер-ефект: показуємо кнопки */
          &:hover {
            background-color: $background-gainsboro-20;
            .status-actions {
              opacity: 1;
              visibility: visible;
              transform: translateY(-50%) translateX(5px);
            }
          }
        }
      }

      .cell {
        cursor: pointer;
        transition: transform 0.1s, filter 0.2s;
        height: 55px;
        min-width: 48px;
        background-color: $background-gainsboro-20;
        border: 1px solid transparent;

        &:hover {
          filter: brightness(0.9);
          transform: scale(1.05);
          z-index: 2;
        }

        &.available { background-color: $background-white; border-color: $sheet-bar-gray; }
        &.booked { background-color: rgba($bright-blue, 0.08); border-color: rgba($bright-blue, 0.2); }
        &.occupied { background-color: rgba($dark-blue, 0.08); border-color: rgba($dark-blue, 0.2); }

        /* Плашка всередині клітинки */
        .booking-bar {
          background-color: $bright-blue;
          color: $text-white;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          padding: 4px 6px;
          border-radius: 4px;
          border-left: 3px solid $dark-blue; 
          @include shadow-light;
          @include hide-text-overflow;
          height: 100%;

          .booking-name {
            @include poppins-bold;
            font-size: 11px;
            @include hide-text-overflow;
          }
          .booking-price {
            @include poppins-medium;
            font-size: 9px;
            opacity: 0.85;
          }
        }
      }
    }
  }

  .loading-state {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px;
    @include poppins-medium;
    color: $text-light-gray;

    .spinner {
      border: 4px solid $sheet-bar-gray;
      width: 36px; height: 36px;
      border-radius: 50%;
      border-left-color: $bright-blue;
      animation: spin 1s linear infinite;
      margin-right: 15px;
    }
  }
}

/* UI Кнопки */
.btn {
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  @include poppins-bold;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

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

  &-danger {
    background-color: $background-white;
    color: $bright-red;
    border: 1px solid $bright-red;
    &:hover { background-color: $bright-red-57; color: $text-white;}
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
  max-width: 550px;
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
        font-size: 22px;
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

      /* Карточка кімнати всередині попапу */
      .room-summary {
        display: flex;
        align-items: center;
        gap: 15px;
        background-color: $background-gray;
        padding: 15px;
        border-radius: 12px;
        margin-bottom: 20px;

        .summary-badge {
          background-color: $text-white;
          color: $text-dark-blue;
          @include poppins-bold;
          font-size: 18px;
          padding: 10px 15px;
          border-radius: 10px;
          @include shadow-light;
        }

        .summary-details {
          display: flex;
          flex-direction: column;
          strong { @include poppins-bold; font-size: 16px; color: $text-dark-blue; }
          span { @include poppins-medium; font-size: 13px; color: $text-light-gray; }
          .price-tag { color: $bright-blue; @include poppins-bold; margin-top: 2px; }
        }
      }

      /* Сітка інформації для існуючої броні */
      .info-grid {
        display: flex;
        flex-direction: column;
        gap: 12px;

        .info-block {
          display: flex;
          justify-content: space-between;
          padding: 12px 15px;
          border: 1px solid $sheet-bar-gray;
          border-radius: 10px;

          .info-label {
            @include poppins-medium;
            color: $text-light-gray;
            font-size: 14px;
          }
          .info-value {
            @include poppins-bold;
            color: $text-dark-blue;
            font-size: 14px;
            &.highlight { color: $bright-blue; }
            &.price { font-size: 16px; color: $text-deep-black; }
          }
        }
      }

      /* Форма для нової броні */
      .form-row {
        display: flex;
        gap: 15px;
      }

      .form-group {
        margin: 10px 0;
        display: flex;
        flex-direction: column;
        flex: 1;

        label {
          @include poppins-semibold;
          font-size: 13px;
          color: $text-dark-blue;
          margin-bottom: 8px;
        }

        .form-input {
          background-color: $background-white;
          border: 1px solid $border-gray;
          border-radius: 10px;
          padding: 12px 15px;
          color: $text-dark-blue;
          @include poppins-medium;
          outline: none;
          transition: border-color 0.2s;
          &:focus { border-color: $bright-blue; box-shadow: 0 0 0 2px rgba($bright-blue, 0.1); }
        }
      }

      /* Квитанція (чек) */
      .receipt-block {
        margin-top: 20px;
        background-color: $background-gray;
        padding: 15px;
        border-radius: 12px;
        border: 1px dashed $border-gray;

        .receipt-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
          span { @include poppins-medium; font-size: 13px; color: $text-dark-blue; }
          strong { @include poppins-bold; font-size: 14px; color: $text-dark-blue; }

          &.total {
            margin-top: 10px;
            padding-top: 10px;
            border-top: 1px solid $border-gray;
            span { font-size: 15px; }
            strong { font-size: 18px; color: $bright-blue; }
          }
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