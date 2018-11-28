package petfinder.site.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import petfinder.site.common.rating.RatingDto;
import petfinder.site.common.rating.RatingService;

import java.util.Optional;

@RestController
@RequestMapping("/api/ratings")
public class RatingEndpoint {
    @Autowired
    private RatingService ratingService;

    @PostMapping(produces = "application/json")
    public void saveRating(@RequestBody RatingDto pet) {
        ratingService.save(pet);
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public Optional<RatingDto> getRating(@PathVariable("id") String id) {
        return ratingService.findRating(Long.parseLong(id));
    }

    @PostMapping(value = "/update")
    public void updateRating(@RequestBody RatingDto pet) {
        ratingService.save(pet);
    }

    @PostMapping(value = "/delete/{id}")
    public void deleteRating(@PathVariable("id") String id) {
        ratingService.deleteRating(Long.parseLong(id));
    }
}
