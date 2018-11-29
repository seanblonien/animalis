package petfinder.site.common.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NotificationService {
    @Autowired
    private NotificationDao NotificationDao;

    public Optional<NotificationDto> findNotification(Long id) {
        return NotificationDao.findNotification(id);
    }

    public void addNotification(Long id, String principal) {
        NotificationDao.addNotification(id, principal);
    }

    public void save(NotificationDto notification) {
        NotificationDao.save(notification);
    }

    public void deleteNotification(Long id) {
        NotificationDao.delete(id);
    }
}
