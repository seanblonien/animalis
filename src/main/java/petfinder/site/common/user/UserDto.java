package petfinder.site.common.user;

import alloy.util.Momento;
import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.ArrayList;
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
	private List<Long> pets;
	private List<Long> sessions;

	private UserDto() {}

	public UserDto(String principal, List<String> roles, Map<String, Object> attributes, Map<String, Object> address, List<Long> pets, List<Long> sessions) {
		this.principal = principal;
		this.roles = roles;
		this.attributes = attributes;
		this.address = address;
		this.pets = pets;
		this.sessions = sessions;
	}

	public List<Long> getPets() {
		return pets;
	}

	public List<Long> getSessions() {
		return sessions;
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

	public void setPets(List<Long> pets) {
		this.pets = pets;
	}

	public void setSessions(List<Long> sessions) {
		this.sessions = sessions;
	}

	public void addPet(Long id) {
		if(this.pets == null) {
			this.pets = new ArrayList<Long>();
		}
		this.pets.add(id);
	}

	public void addSession(Long id) {
		if(this.sessions == null) {
			this.sessions = new ArrayList<Long>();
		}
		this.sessions.add(id);
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