package petfinder.site.common.user;

import alloy.util.Momento;
import org.codehaus.jackson.annotate.JsonIgnore;

public class UserAuthenticationDto implements Momento<String> {
    private UserDto user;
    private String password;

    private UserAuthenticationDto() {

    }

    public UserAuthenticationDto(UserDto user, String password) {
        this.user = user;
        this.password = password;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public UserDto getUser() {
        return user;
    }

    public String getPassword() {
        return password;
    }

    @JsonIgnore
    @Override
    public String getMomento() {
        return user.getMomento();
    }
}
