package petfinder.site.endpoint;

import org.elasticsearch.index.engine.Engine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import petfinder.site.common.pet.PetDto;
import petfinder.site.common.user.UserDto;
import petfinder.site.common.user.UserPetDto;
import petfinder.site.common.user.UserService;
import petfinder.site.common.user.UserService.RegistrationRequest;

import java.util.List;
import java.util.Optional;

/**
 * Created by jlutteringer on 8/23/17.
 */
@RestController
@RequestMapping(value = "/api/user")
public class UserEndpoint {
	@Autowired
	private UserService userService;

	@GetMapping(value = "", produces = "application/json")
	public Optional<UserDto> getUserDetails() {
		String principal = SecurityContextHolder.getContext().getAuthentication().getName();
		return userService.findUserByPrincipal(principal);
	}

	@PostMapping(value = "/register")
	public UserDto register(@RequestBody RegistrationRequest request) {
		return userService.register(request);
	}

	@PostMapping(value = "/update")
	public UserDto update(@RequestBody RegistrationRequest request) {
		System.out.println("Got to endpoint");
		return userService.update(request);
	}

	@PostMapping(value = "/delete")
	public void delete(@RequestBody UserService.DeleteRequest request) {
		userService.delete(request);
	}

	@GetMapping(value = "/pet")
	public List<UserPetDto> getPets() {
		String principal = SecurityContextHolder.getContext().getAuthentication().getName();
		UserDto user = userService.findUserByPrincipal(principal).get();
		return userService.findPets(user);
	}

	@PostMapping(value = "/pet")
	public UserPetDto addPet(@RequestBody UserPetDto userPetDto) {
		return userService.save(userPetDto);
	}
}