package petfinder.site.common.rating;

import alloy.util.Identifiable;

public class RatingDto implements Identifiable {
    private Long id;
    private Double rating;
    private String rater;
    private String review;
    private String date;

    private RatingDto() {}

    @Override
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getRater() {
        return rater;
    }

    public void setRater(String rater) {
        this.rater = rater;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "RatingDto{" +
                "id=" + id +
                ", rating=" + rating +
                ", rater='" + rater + '\'' +
                ", review='" + review + '\'' +
                ", date='" + date + '\'' +
                '}';
    }
}
