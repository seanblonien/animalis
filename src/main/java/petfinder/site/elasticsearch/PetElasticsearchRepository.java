package petfinder.site.elasticsearch;

import alloy.elasticsearch.ElasticSearchClientProvider;
import alloy.elasticsearch.ElasticSearchIndex;
import alloy.elasticsearch.ElasticSearchRepository.ElasticSearchJsonRepository;
import org.springframework.stereotype.Service;
import petfinder.site.common.pet.PetDto;

@Service
public class PetElasticsearchRepository extends ElasticSearchJsonRepository<PetDto, Long> {
    public PetElasticsearchRepository(ElasticSearchClientProvider provider) {
        super(new ElasticSearchIndex(provider, "petfinder-pets"), PetDto.class);
    }
}
