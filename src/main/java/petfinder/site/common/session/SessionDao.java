package petfinder.site.common.session;

import alloy.elasticsearch.ElasticSearchClientProvider;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import petfinder.site.elasticsearch.SessionElasticsearchRepository;

import java.util.Optional;

@Repository
public class SessionDao {
    @Autowired
    private SessionElasticsearchRepository sessionElasticsearchRepository;

    @Autowired
    private ElasticSearchClientProvider elasticSearchClientProvider;

    public Optional<SessionDto> findSession(Long id) {
        return sessionElasticsearchRepository.find(id);
    }

    public Optional<SessionDto> findSessionLowTech(Long id) {
        RestHighLevelClient client = elasticSearchClientProvider.getClient();
        // Use the client to make your search and manually parse the results
        return Optional.empty();
    }

    public void save(SessionDto session) {
        sessionElasticsearchRepository.save(session);
    }
}
