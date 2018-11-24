package petfinder.site.common.user;

import alloy.util.Momento;
import org.codehaus.jackson.annotate.JsonIgnore;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class PublicUserDto implements Momento<String> {
    private String principal;
    private List<String> roles;
    private Map<String, Object> attributes;
    private List<Long> pets;

    private PublicUserDto() {}

    public PublicUserDto(String principal, List<String> roles, Map<String, Object> attributes, List<Long> pets) {
        this.principal = principal;
        this.roles = roles;
        this.attributes = attributes;
        this.pets = pets;
    }

    public PublicUserDto(UserDto user){
        this.principal = user.getPrincipal();
        this.roles = user.getRoles();
        this.attributes = user.getAttributes();
        this.pets = user.getPets();
    }

    public String getPrincipal() {
        return principal;
    }

    public void setPrincipal(String principal) {
        this.principal = principal;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public Map<String, Object> getAttributes() {
        return attributes;
    }

    public void setAttributes(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public List<Long> getPets() {
        return pets;
    }

    public void setPets(List<Long> pets) {
        this.pets = pets;
    }

    @JsonIgnore
    @Override
    public String getMomento() {
        return principal;
    }

    public enum UserType {
        OWNER, SITTER
    }

    @Override
    public String toString() {
        return "PublicUserDto{" +
                "principal='" + principal + '\'' +
                ", roles=" + roles +
                ", attributes=" + attributes +
                ", pets=" + pets +
                '}';
    }
}
