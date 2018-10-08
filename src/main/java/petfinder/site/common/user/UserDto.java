package petfinder.site.common.user;

import alloy.util.Momento;
import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.List;
import java.util.Map;

/**
 * Created by jlutteringer on 8/23/17.
 */
public class UserDto implements Momento<String> {
	private String principal;
	private List<String> roles;
	private Map<String, Object> attributes;
	private Map<String, Object> address;

	private UserDto() {

	}

	public UserDto(String principal, List<String> roles, Map<String, Object> attributes, Map<String, Object> address) {
		this.principal = principal;
		this.roles = roles;
		this.attributes = attributes;
		this.address = address;
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

	@JsonIgnore
	@Override
	public String getMomento() {
		return principal;
	}

	public enum UserType {
		OWNER, SITTER
	}
}