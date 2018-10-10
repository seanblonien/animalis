package petfinder.site.common.user;

import alloy.util.Identifiable;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.UUID;

public class UserPetDto implements Identifiable {
    private Long id = UUID.randomUUID().getMostSignificantBits();
    private String userPrincipal;
    private String pet_name;
    private String pet_age;
    private String pet_species;
    private String pet_size;
    private String pet_sex;
    private String pet_info;

    @Override
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getPet_age() {
        return pet_age;
    }

    public void setPet_age(String pet_age) {
        this.pet_age = pet_age;
    }

    public String getPet_name() {
        return pet_name;
    }

    public void setPet_name(String pet_name) {
        this.pet_name = pet_name;
    }

    public String getUserPrincipal() {
        return userPrincipal;
    }

    public void setUserPrincipal(String userPrincipal) {
        this.userPrincipal = userPrincipal;
    }

    public String getPet_species() {
        return pet_species;
    }

    public void setPet_species(String pet_species) {
        this.pet_species = pet_species;
    }

    @Override
    public String toString() {
        return "UserPetDto{" +
                "id=" + id +
                ", userPrincipal='" + userPrincipal + '\'' +
                ", pet_name='" + pet_name + '\'' +
                ", pet_age='" + pet_age + '\'' +
                ", pet_species='" + pet_species + '\'' +
                ", pet_size='" + pet_size + '\'' +
                ", pet_sex='" + pet_sex + '\'' +
                ", pet_info='" + pet_info + '\'' +
                '}';
    }
}