package petfinder.site.common.pet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PetService {
    @Autowired
    private PetDao petDao;

    public void save(PetDto pet) {
        petDao.save(pet);
    }

    public Optional<PetDto> findPet(Long id) {
        return petDao.findPet(id);
    }

    public void deletePet(Long id) {
        petDao.delete(id);
    }
}
