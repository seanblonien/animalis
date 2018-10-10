package petfinder.site.common.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import petfinder.site.common.user.UserDto.UserType;

import java.io.IOException;
import java.util.*;

/**
 * Created by jlutteringer on 8/23/17.
 */
@Service
public class UserService {
	@Autowired
	private UserDao userDao;

	@Autowired
	private PasswordEncoder passwordEncoder;


	public Optional<UserDto> findUserByPrincipal(String principal) {
		return userDao.findUserByPrincipal(principal).map(UserAuthenticationDto::getUser);
	}

	public Optional<UserAuthenticationDto> findUserAuthenticationByPrincipal(String principal) {
		return userDao.findUserByPrincipal(principal);
	}

	public static class DeleteRequest {
		private String principal;

		public String getPrincipal() {
			return principal;
		}

		public void setPrincipal(String principal) {
			this.principal = principal;
		}
	}

	public static class RegistrationRequest {
		private String principal;
		private String password;
//		private Map<String, Object> attributes;
		private String fname;
		private String lname;
		private String phone;
		private String street;
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

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public Map<String, Object> getAddress() {
			Map<String, Object> myAddress = new HashMap<>();
			myAddress.put("street", this.street);
			myAddress.put("city", this.city);
			myAddress.put("state", this.state);
			myAddress.put("zip", this.zip);

			return myAddress;
		}

		public Map<String, Object> getAttributes() {
			Map<String, Object> myAttributes = new HashMap<>();
			myAttributes.put("fname", this.fname);
			myAttributes.put("lname", this.lname);
			myAttributes.put("phone", this.phone);
			myAttributes.put("emailNotifications", this.emailNotifications);

			return myAttributes;
		}

		public List<String> getRoles() {
			List<String> myRoles = new ArrayList<>();

			if(this.petOwner != null && !this.petOwner.equals("")) {
				myRoles.add(UserType.OWNER.toString());
			}
			if(this.petSitter != null && !this.petSitter.equals("")) {
				myRoles.add(UserType.SITTER.toString());
			}

			if(myRoles.isEmpty()) myRoles.add("None");
			return myRoles;
		}

        public void setPrincipal(String principal) {
            this.principal = principal;
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

        public String getStreet() {
            return street;
        }

        public void setStreet(String street) {
            this.street = street;
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
    }

    private UserDto constructUser(RegistrationRequest request){
		return new UserDto(request.getPrincipal(), request.getRoles(), request.getAttributes(), request.getAddress());
	}

	public void delete(DeleteRequest request) {
		userDao.delete(request);
	}

    public UserDto update(RegistrationRequest request) {
		System.out.println("Updating user...");
		UserDto myUser = constructUser(request);
		try {
			userDao.update(myUser);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return myUser;
	}

	public UserDto register(RegistrationRequest request) {
		UserAuthenticationDto userAuthentication = new UserAuthenticationDto(constructUser(request), passwordEncoder.encode(request.getPassword()));
		userDao.save(userAuthentication);
		return userAuthentication.getUser();
	}

	public UserPetDto save(UserPetDto userPetDto) {
		return userDao.save(userPetDto);
	}

	public List<UserPetDto> findPets(UserDto user) {
		return userDao.findPets(user);
	}
}