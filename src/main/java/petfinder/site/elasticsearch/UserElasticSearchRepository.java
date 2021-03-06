package petfinder.site.elasticsearch;

import alloy.elasticsearch.ElasticSearchClientProvider;
import alloy.elasticsearch.ElasticSearchIndex;
import alloy.elasticsearch.ElasticSearchRepository.ElasticSearchJsonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import petfinder.site.common.user.UserAuthenticationDto;

@Service
public class UserElasticSearchRepository extends ElasticSearchJsonRepository<UserAuthenticationDto, String> {
    @Autowired
    public UserElasticSearchRepository(ElasticSearchClientProvider provider) {
        super(new ElasticSearchIndex(provider, "petfinder-users"), UserAuthenticationDto.class);
    }
}
