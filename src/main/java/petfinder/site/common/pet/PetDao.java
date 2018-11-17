package petfinder.site.common.pet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import petfinder.site.elasticsearch.PetElasticsearchRepository;

import java.util.Optional;

@Repository
public class PetDao {
    @Autowired
    private PetElasticsearchRepository petElasticsearchRepository;

    public Optional<PetDto> findPet(Long id) {
        return petElasticsearchRepository.find(id);
    }

    public void save(PetDto pet) {
        petElasticsearchRepository.save(pet);
    }

    public void delete(Long id) {
        petElasticsearchRepository.delete(id);
    }
}
