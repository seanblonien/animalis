package petfinder.site.common.user;

import alloy.util.Momento;
import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class UserDto implements Momento<String> {
    private String principal;
    private List<String> roles;
    private Map<String, Object> attributes;
    private Map<String, Object> address;
    private List<Long> pets;
    private List<Long> sessions;
    private List<Long> notifications;
    private List<Long> ratings;

    private UserDto() {
    }

    public UserDto(String principal, List<String> roles, Map<String, Object> attributes, Map<String, Object> address, List<Long> pets, List<Long> sessions, List<Long> notifications, List<Long> ratings) {
        this.principal = principal;
        this.roles = roles;
        this.attributes = attributes;
        this.address = address;
        this.pets = pets;
        this.sessions = sessions;
        this.notifications = notifications;
        this.ratings = ratings;
    }

    public List<Long> getPets() {
        return pets;
    }

    public void setPets(List<Long> pets) {
        this.pets = pets;
    }

    public List<Long> getSessions() {
        return sessions;
    }

    public void setSessions(List<Long> sessions) {
        this.sessions = sessions;
    }

    public String getPrincipal() {
        return principal;
    }

    public List<String> getRoles() {
        return roles;
    }

    public Map<String, Object> getAttributes() {
        return attributes;
    }

    public Map<String, Object> getAddress() {
        return address;
    }

    public List<Long> getNotifications() {
        return notifications;
    }

    public List<Long> getRatings() {
        return ratings;
    }

    public void addPet(Long id) {
        if (this.pets == null) {
            this.pets = new ArrayList<>();
        }
        this.pets.add(id);
    }

    public void deletePet(Long id) {
        if (this.pets != null) {
            this.pets.remove(id);
        }
    }

    public void addSession(Long id) {
        if (this.sessions == null) {
            this.sessions = new ArrayList<>();
        }
        this.sessions.add(id);
    }

    public void deleteSession(Long id) {
        if (this.sessions != null) {
            this.sessions.remove(id);
        }
    }

    public void addNotification(Long id) {
        if (this.notifications == null) {
            this.notifications = new ArrayList<>();
        }
        this.notifications.add(id);
    }

    public void deleteNotification(Long id) {
        if (this.notifications != null) {
            this.notifications.remove(id);
        }
    }

    public void addRating(Long id) {
        if (this.ratings == null) {
            this.ratings = new ArrayList<>();
        }
        this.ratings.add(id);
    }

    public void deleteRating(Long id) {
        if (this.ratings != null) {
            this.ratings.remove(id);
        }
    }

    @JsonIgnore
    @Override
    public String getMomento() {
        return principal;
    }

    @Override
    public String toString() {
        return "UserDto{" +
                "principal='" + principal + '\'' +
                ", roles=" + roles +
                ", attributes=" + attributes +
                ", address=" + address +
                ", pets=" + pets +
                ", sessions=" + sessions +
                ", notifications=" + notifications +
                '}';
    }

    public enum UserType {
        OWNER, SITTER
    }
}
