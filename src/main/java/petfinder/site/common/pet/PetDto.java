package petfinder.site.common.pet;

import alloy.util.Identifiable;

public class PetDto implements Identifiable {
    private Long id;
    private String pet_name;
    private String pet_species;
    private Long pet_age;
    private String pet_size;
    private String pet_sex;
    private String pet_info;

    private PetDto() {
    }

    public PetDto(Long id, String pet_name, String pet_species, Long pet_age, String pet_size, String pet_sex, String pet_info) {
        this.id = id;
        this.pet_name = pet_name;
        this.pet_species = pet_species;
        this.pet_age = pet_age;
        this.pet_size = pet_size;
        this.pet_sex = pet_sex;
        this.pet_info = pet_info;
    }

    @Override
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPet_name() {
        return pet_name;
    }

    public void setPet_name(String pet_name) {
        this.pet_name = pet_name;
    }

    public Long getPet_age() {
        return pet_age;
    }

    public void setPet_age(Long pet_age) {
        this.pet_age = pet_age;
    }

    public String getPet_species() {
        return pet_species;
    }

    public void setPet_species(String pet_species) {
        this.pet_species = pet_species;
    }

    public String getPet_size() {
        return pet_size;
    }

    public void setPet_size(String pet_size) {
        this.pet_size = pet_size;
    }

    public String getPet_sex() {
        return pet_sex;
    }

    public void setPet_sex(String pet_sex) {
        this.pet_sex = pet_sex;
    }

    public String getPet_info() {
        return pet_info;
    }

    public void setPet_info(String pet_info) {
        this.pet_info = pet_info;
    }

    @Override
    public String toString() {
        return "PetDto{" +
                "id=" + id +
                ", pet_name='" + pet_name + '\'' +
                ", pet_age='" + pet_age + '\'' +
                ", pet_species='" + pet_species + '\'' +
                ", pet_size='" + pet_size + '\'' +
                ", pet_sex='" + pet_sex + '\'' +
                ", pet_info='" + pet_info + '\'' +
                '}';
    }
}
