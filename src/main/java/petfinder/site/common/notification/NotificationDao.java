package petfinder.site.common.notification;

import alloy.elasticsearch.ElasticSearchClientProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import petfinder.site.elasticsearch.NotificationElasticsearchRepository;
import java.util.Optional;

@Repository
public class NotificationDao {
    @Autowired
    private NotificationElasticsearchRepository notificationElasticsearchRepository;

    @Autowired
    private ElasticSearchClientProvider elasticSearchClientProvider;

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
