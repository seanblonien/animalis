package petfinder.site.common.user;

import java.time.Duration;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import alloy.util.AlloyAuthentication;
import alloy.util.Wait;
import alloy.util._Lists;
import alloy.util._Maps;
import petfinder.site.common.user.UserDto.UserType;

/**
 * Created by jlutteringer on 8/23/17.
 */
@Service
public class UserService {
	@Autowired
	private UserDao userDao;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public Optional<UserDto> findUser(String id) {
		return userDao.findUser(id).map(UserAuthenticationDto::getUser);
	}

	public Optional<UserDto> findUserByPrincipal(String principal) {
		return userDao.findUserByPrincipal(principal).map(UserAuthenticationDto::getUser);
	}

	public Optional<UserAuthenticationDto> findUserAuthenticationByPrincipal(String principal) {
		return userDao.findUserByPrincipal(principal);
	}

	public static class RegistrationRequest {
		private String principal;
		private String password;
//		private Map<String, Object> attributes;
		private String fname;
		private String lname;
		private String phone;
		private String address;
		private String city;
		private String state;
		private String zip;
		private String petSitter;
		private String petOwner;
		private String emailNotifications;

		/*public RegistrationRequest(@JsonProperty("prinicipal")String principal, @JsonProperty("password") String password, @JsonProperty("attributes") Map<String, Object> attributes) {
			this.principal = principal;
			this.password = password;
			this.attributes = attributes;
		}*/

		public String getPrincipal() {
			return principal;
		}

		public void setPrincipal(String principal) {
			this.principal = principal;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public String getFname() {
			return fname;
		}

		public void setFname(String fname) {
			this.fname = fname;
		}

		public String getLname() {
			return lname;
		}

		public void setLname(String lname) {
			this.lname = lname;
		}

		public String getPhone() {
			return phone;
		}

		public void setPhone(String phone) {
			this.phone = phone;
		}

		public String getAddress() {
			return address;
		}

		public void setAddress(String address) {
			this.address = address;
		}

		public String getCity() {
			return city;
		}

		public void setCity(String city) {
			this.city = city;
		}

		public String getState() {
			return state;
		}

		public void setState(String state) {
			this.state = state;
		}

		public String getZip() {
			return zip;
		}

		public void setZip(String zip) {
			this.zip = zip;
		}

		public String getPetSitter() {
			return petSitter;
		}

		public void setPetSitter(String petSitter) {
			this.petSitter = petSitter;
		}

		public String getPetOwner() {
			return petOwner;
		}

		public void setPetOwner(String petOwner) {
			this.petOwner = petOwner;
		}

		public String getEmailNotifications() {
			return emailNotifications;
		}

		public void setEmailNotifications(String emailNotifications) {
			this.emailNotifications = emailNotifications;
		}

		public Map<String, Object> getAttributes() {
			Map<String, Object> myAttributes = new HashMap<>();
			myAttributes.put("fname", this.fname);
			myAttributes.put("lname", this.lname);
			myAttributes.put("phone", this.phone);
			myAttributes.put("address", this.address);
			myAttributes.put("city", this.city);
			myAttributes.put("state", this.state);
			myAttributes.put("zip", this.zip);
			myAttributes.put("emailNotifications", this.emailNotifications);

			return myAttributes;
		}

		public List<String> getRoles() {
			List<String> myRoles = new ArrayList<>();

			System.out.println();
			System.out.print(this.petOwner);
			System.out.print(this.petSitter);
			System.out.println();

			if(this.petOwner != null && !this.petOwner.equals("")) {
				myRoles.add(UserType.OWNER.toString());
			}
			if(this.petSitter != null && !this.petSitter.equals("")) {
				myRoles.add(UserType.SITTER.toString());
			}

			if(myRoles.isEmpty()) myRoles.add("None");
			return myRoles;
		}
	}

	public UserDto register(RegistrationRequest request) {
		System.out.print(request.getAttributes());
		UserAuthenticationDto userAuthentication = new UserAuthenticationDto(
				new UserDto(request.getPrincipal(), request.getRoles(), request.getAttributes()), passwordEncoder.encode(request.getPassword()));

		userDao.save(userAuthentication);
		return userAuthentication.getUser();
	}
}