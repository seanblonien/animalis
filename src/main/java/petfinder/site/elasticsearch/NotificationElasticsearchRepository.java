package petfinder.site.elasticsearch;

import alloy.elasticsearch.ElasticSearchClientProvider;
import alloy.elasticsearch.ElasticSearchIndex;
import alloy.elasticsearch.ElasticSearchRepository;
import org.springframework.stereotype.Service;
import petfinder.site.common.notification.NotificationDto;

@Service
public class NotificationElasticsearchRepository extends ElasticSearchRepository.ElasticSearchJsonRepository<NotificationDto, Long> {
    public NotificationElasticsearchRepository(ElasticSearchClientProvider provider) {
        super(new ElasticSearchIndex(provider, "petfinder-notifications"), NotificationDto.class);
    }
}
