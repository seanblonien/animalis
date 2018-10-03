package petfinder.site.common.user;

import alloy.util.Identifiable;

import java.util.UUID;

public class UserPetDto implements Identifiable {
    private Long id = UUID.randomUUID().getMostSignificantBits();
    private String userPrincipal;
    private String pet_name;
    private Long petId;
    private String pet_species;

    public String getPet_name() {
        return pet_name;
    }

    public void setPet_name(String pet_name) {
        this.pet_name = pet_name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserPrincipal() {
        return userPrincipal;
    }

    public void setUserPrincipal(String userPrincipal) {
        this.userPrincipal = userPrincipal;
    }

    public Long getPetId() {
        return petId;
    }

    public void setPetId(Long petId) {
        this.petId = petId;
    }

    public String getPet_species() {
        return pet_species;
    }

    public void setPet_species(String pet_species) {
        this.pet_species = pet_species;
    }
}