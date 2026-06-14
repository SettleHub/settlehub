import axios from 'axios';
import { API_GATEWAY_URL } from "./credentials";

const api = axios.create({
  baseURL: `${API_GATEWAY_URL}/booking/api/`, // Зауваж: якщо це BookingService. А для IAM треба інший baseURL.
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    let authType = localStorage.getItem("auth-type") || "Bearer"; // Bearer за замовчуванням
    
    // Капіталізуємо першу літеру (Bearer, а не bearer), бо Spring чутливий до цього
    authType = authType.charAt(0).toUpperCase() + authType.slice(1);

    if (token) {
      config.headers['Authorization'] = `${authType} ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

export const BookingService = {
  /**
   * Отримання даних для шахматки
   * @param {string} startDate - Дата початку (YYYY-MM-DD)
   * @param {string} endDate - Дата кінця (YYYY-MM-DD)
   */
  async getCalendar(startDate, endDate) {
    try {
      const response = await api.get('/reservations/calendar', {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      console.error('Помилка завантаження календаря:', error);
      throw error;
    }
  },

  /**
   * Отримання списку всіх кімнат
   */
  async getRooms() {
    try {
      const response = await api.get('/management/rooms');
      return response.data;
    } catch (error) {
      console.error('Помилка завантаження кімнат:', error);
      throw error;
    }
  },

  /**
   * Створення нового бронювання
   * @param {Object} bookingData - Дані бронювання (BookRoomRequest schema)
   */
  async bookRoom(bookingData) {
    try {
      const response = await api.post('/reservations/book', bookingData);
      return response.data;
    } catch (error) {
      console.error('Помилка бронювання кімнати:', error);
      throw error;
    }
  },

  /**
   * Позначити кімнату як брудну
   * PATCH /housekeeping/rooms/{roomId}/dirty
   */
  async markRoomAsDirty(roomId) {
    try {
      const response = await api.patch(`/housekeeping/rooms/${roomId}/dirty`);
      return response.data;
    } catch (error) {
      console.error('Помилка при зміні статусу кімнати:', error);
      throw error;
    }
  },

  /**
   * Позначити кімнату як чисту (готову до заселення)
   * PATCH /housekeeping/rooms/{roomId}/clean
   */
  async markRoomAsClean(roomId) {
    try {
      const response = await api.patch(`/housekeeping/rooms/${roomId}/clean`);
      return response.data;
    } catch (error) {
      console.error('Помилка при зміні статусу кімнати:', error);
      throw error;
    }
  },


  // ==========================================
  // HOUSEKEEPING RULES
  // ==========================================

  /**
   * Отримання списку всіх правил прибирання
   * GET /management/housekeeping-rules
   */
  async getHousekeepingRules() {
    try {
      const response = await api.get('/management/housekeeping-rules');
      return response.data;
    } catch (error) {
      console.error('Помилка завантаження правил прибирання:', error);
      throw error;
    }
  },

  /**
   * Створення нового правила прибирання
   * POST /management/housekeeping-rules?categoryId={id}
   */
  async createHousekeepingRule(ruleData, categoryId) {
    try {
      const response = await api.post('/management/housekeeping-rules', ruleData, {
        params: { categoryId }
      });
      return response.data;
    } catch (error) {
      console.error('Помилка створення правила:', error);
      throw error;
    }
  },

  /**
   * Оновлення існуючого правила
   * PUT /management/housekeeping-rules/{id}?categoryId={catId}
   */
  async updateHousekeepingRule(id, ruleData, categoryId) {
    try {
      const response = await api.put(`/management/housekeeping-rules/${id}`, ruleData, {
        params: { categoryId }
      });
      return response.data;
    } catch (error) {
      console.error('Помилка оновлення правила:', error);
      throw error;
    }
  },

  /**
   * Видалення правила
   * DELETE /management/housekeeping-rules/{id}
   */
  async deleteHousekeepingRule(id) {
    try {
      await api.delete(`/management/housekeeping-rules/${id}`);
      return true;
    } catch (error) {
      console.error('Помилка видалення правила:', error);
      throw error;
    }
  },

  /**
   * Швидке ввімкнення/вимкнення правила (Toggle)
   * PATCH /management/housekeeping-rules/{id}/status?isActive=true|false
   */
  async toggleRuleStatus(id, isActive) {
    try {
      const response = await api.patch(`/management/housekeeping-rules/${id}/status`, null, {
        params: { isActive }
      });
      return response.data;
    } catch (error) {
      console.error('Помилка зміни статусу правила:', error);
      throw error;
    }
  },

  // ==========================================
  // ROOM CATEGORIES (потрібні для селекта)
  // ==========================================

  /**
   * Отримання списку всіх категорій кімнат
   * GET /management/categories
   */
  async getCategories() {
    try {
      const response = await api.get('/management/categories');
      return response.data;
    } catch (error) {
      console.error('Помилка завантаження категорій:', error);
      throw error;
    }
  }
};
