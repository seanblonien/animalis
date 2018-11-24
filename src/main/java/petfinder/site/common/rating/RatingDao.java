package petfinder.site.common.rating;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import petfinder.site.elasticsearch.RatingElasticsearchRepository;

import java.util.Optional;

@Repository
public class RatingDao {
    @Autowired
    private RatingElasticsearchRepository ratingElasticsearchRepository;

    public Optional<RatingDto> findRating(Long id) {
        return ratingElasticsearchRepository.find(id);
    }

    public void save(RatingDto rating) {
        ratingElasticsearchRepository.save(rating);
    }

    public void delete(Long id) {
        ratingElasticsearchRepository.delete(id);
    }
}
