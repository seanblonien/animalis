package petfinder.site.common.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import petfinder.site.elasticsearch.NotificationElasticsearchRepository;

import java.util.Optional;

@Repository
public class NotificationDao {
    @Autowired
    private NotificationElasticsearchRepository notificationElasticsearchRepository;

    public Optional<NotificationDto> findNotification(Long id) {
        return notificationElasticsearchRepository.find(id);
    }

    public void save(NotificationDto notification) {
        notificationElasticsearchRepository.save(notification);
    }

    public void delete(Long id) {
        notificationElasticsearchRepository.delete(id);
    }
}
