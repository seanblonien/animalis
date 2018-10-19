package petfinder.site.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import petfinder.site.common.pet.PetDto;
import petfinder.site.common.pet.PetService;

import java.util.Optional;

/**
 * Created by jlutteringer on 8/23/17.
 */
@RestController
@RequestMapping("/api/pets")
public class PetEndpoint {
	@Autowired
	private PetService petService;

	@GetMapping(value = "/{id}", produces = "application/json")
	public Optional<PetDto> getPet(@PathVariable("id") String id) {
		return petService.findPet(Long.parseLong(id));
	}

	@PostMapping(produces = "application/json")
	public PetDto savePet(@RequestBody PetDto pet) {
		System.out.println("Saving pet " + pet.getId());
		petService.save(pet);
		return pet;
	}

	@PostMapping(value = "/update")
	public PetDto updatePet(@RequestBody PetDto pet) {
		System.out.println("Got to update pet endpoint");
		return petService.update(pet);
	}
}
