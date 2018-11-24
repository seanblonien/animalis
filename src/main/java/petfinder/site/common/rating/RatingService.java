package petfinder.site.common.rating;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RatingService {
    @Autowired
    private RatingDao ratingDao;

    public void save(RatingDto rating) {
        ratingDao.save(rating);
    }

    public Optional<RatingDto> findRating(Long id) {
        return ratingDao.findRating(id);
    }

    public void deleteRating(Long id) {
        ratingDao.delete(id);
    }
}
