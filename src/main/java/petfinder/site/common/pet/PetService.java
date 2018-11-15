package petfinder.site.common.pet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Created by jlutteringer on 8/23/17.
 */
@Service
public class PetService {
    @Autowired
    private PetDao petDao;

    public Optional<PetDto> findPet(Long id) {
        return petDao.findPet(id);
    }

    public void save(PetDto pet) {
        petDao.save(pet);
    }

    public void deletePet(Long id) {
        petDao.delete(id);
    }

    public PetDto update(PetDto pet) {
        petDao.save(pet);
        return pet;
    }
}