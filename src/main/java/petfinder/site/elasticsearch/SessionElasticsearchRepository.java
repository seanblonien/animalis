package petfinder.site.elasticsearch;

import alloy.elasticsearch.ElasticSearchClientProvider;
import alloy.elasticsearch.ElasticSearchIndex;
import alloy.elasticsearch.ElasticSearchRepository.ElasticSearchJsonRepository;
import org.springframework.stereotype.Service;
import petfinder.site.common.session.SessionDto;

@Service
public class SessionElasticsearchRepository extends ElasticSearchJsonRepository<SessionDto, Long> {
    public SessionElasticsearchRepository(ElasticSearchClientProvider provider) {
        super(new ElasticSearchIndex(provider, "petfinder-sessions"), SessionDto.class);
    }
}
