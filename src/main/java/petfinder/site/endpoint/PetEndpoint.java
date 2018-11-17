package petfinder.site.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import petfinder.site.common.pet.PetDto;
import petfinder.site.common.pet.PetService;

import java.util.Optional;

@RestController
@RequestMapping("/api/pets")
public class PetEndpoint {
    @Autowired
    private PetService petService;

    @PostMapping(produces = "application/json")
    public void savePet(@RequestBody PetDto pet) {
        petService.save(pet);
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public Optional<PetDto> getPet(@PathVariable("id") String id) {
        return petService.findPet(Long.parseLong(id));
    }

    @PostMapping(value = "/update")
    public void updatePet(@RequestBody PetDto pet) {
        petService.save(pet);
    }

    @PostMapping(value = "/delete/{id}")
    public void deletePet(@PathVariable("id") String id) {
        petService.deletePet(Long.parseLong(id));
    }
}
