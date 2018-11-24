package petfinder.site.elasticsearch;

import alloy.elasticsearch.ElasticSearchClientProvider;
import alloy.elasticsearch.ElasticSearchIndex;
import alloy.elasticsearch.ElasticSearchRepository;
import org.springframework.stereotype.Service;
import petfinder.site.common.notification.NotificationDto;
import petfinder.site.common.rating.RatingDto;

@Service
public class RatingElasticsearchRepository extends ElasticSearchRepository.ElasticSearchJsonRepository<RatingDto, Long> {
    public RatingElasticsearchRepository(ElasticSearchClientProvider provider) {
        super(new ElasticSearchIndex(provider, "petfinder-ratings"), RatingDto.class);
    }
}
