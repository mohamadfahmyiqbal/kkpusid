import UNotification from '../../../../utils/api/UNotification';

class NotificationService {
  // Get notifications with pagination
  static async getNotifications(filter = {}) {
    try {
      const response = await UNotification.getNotifications(filter);
      return response;
    } catch (error) {
      console.error('NotificationService.getNotifications error:', error);
      throw error;
    }
  }

  // Mark notification(s) as read
  static async markAsRead(ids) {
    try {
      const response = await UNotification.markAsRead(ids);
      return response;
    } catch (error) {
      console.error('NotificationService.markAsRead error:', error);
      throw error;
    }
  }

  // Get notification count
  static async getNotificationCount(memberId) {
    try {
      const filter = {
        member_id: memberId,
        count_only: true
      };
      const response = await UNotification.getNotifications(filter);
      return response?.data?.total || 0;
    } catch (error) {
      console.error('NotificationService.getNotificationCount error:', error);
      return 0;
    }
  }

  // Delete notification
  static async deleteNotification(id) {
    try {
      // Assuming there's a delete endpoint
      const response = await UNotification.deleteNotification(id);
      return response;
    } catch (error) {
      console.error('NotificationService.deleteNotification error:', error);
      throw error;
    }
  }
}

export default NotificationService;
