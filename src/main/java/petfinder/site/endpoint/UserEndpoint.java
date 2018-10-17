package petfinder.site.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import petfinder.site.common.pet.PetDto;
import petfinder.site.common.user.UserDto;
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
		System.out.println("Got to update user endpoint");
		return userService.update(request);
	}

	@PostMapping(value = "/delete")
	public void delete(@RequestBody UserService.DeleteRequest request) {
		userService.delete(request);
	}

	@PostMapping(value = "/pet/delete/{id}")
	public void delete(@PathVariable("id") Long id) {
		System.out.println("Got to delete pet endpoint with petId of " + id);
		userService.deletePet(id);
	}

	@GetMapping(value = "/pet")
	public List<Optional<PetDto>> getPets() {
		String principal = SecurityContextHolder.getContext().getAuthentication().getName();
		System.out.println("Getting pets from user " + principal);
		UserDto user = userService.findUserByPrincipal(principal).get();
		return userService.findPets(user);
	}

	@PostMapping(value = "/pet/{id}")
	public UserDto addPet(@PathVariable("id") Long id) {
		String principal = SecurityContextHolder.getContext().getAuthentication().getName();
		UserDto user = userService.findUserByPrincipal(principal).get();
		user.addPet(id);
		System.out.println("Adding pet with id " + id);
		System.out.println("User has pets: " + user.getPets().toString());
		return userService.update(user);
	}
}