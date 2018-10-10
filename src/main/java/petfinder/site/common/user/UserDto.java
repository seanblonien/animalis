package petfinder.site.common.user;

import alloy.util.Momento;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.elasticsearch.common.xcontent.XContentBuilder;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import static org.elasticsearch.common.xcontent.XContentFactory.jsonBuilder;

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

	public XContentBuilder getUserDto() {
		try {
			return jsonBuilder()
					.startObject()
					.field("principal", this.getPrincipal())
					.field("attributes", this.getAttributes())
					.field("roles", this.getRoles())
					.field("address", this.getAddress())
					.endObject();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return null;
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