package alloy.util;

public class AlloyAuthentication {
    private String principal;
    private String password;

    public AlloyAuthentication(String principal, String password) {
        this.principal = principal;
        this.password = password;
    }

    public String getPrincipal() {
        return principal;
    }

    public String getPassword() {
        return password;
    }
}
