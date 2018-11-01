package petfinder.site.test.unit;

import org.junit.Before;
import org.junit.Test;
import petfinder.site.common.pet.PetDto;

import static junit.framework.TestCase.assertEquals;

public class PetTest {

    private PetDto pet = null;

    @Before
    public void init() {

        pet = new PetDto(3543115176076623000L,
                "Fido",
                "Dog",
                6L,
                "Medium",
                "Male",
                "Takes medication for flees.");
    }

    @Test
    public void testID() {
        assertEquals(3543115176076623000L, (Object)pet.getId());
    }

    @Test
    public void testName() {
        assertEquals("Fido", pet.getPet_name());
    }

    @Test
    public void testSpecies() {
        assertEquals("Dog", pet.getPet_species());
    }

    @Test
    public void testAge() {
        assertEquals("6", pet.getPet_age());
    }

    @Test
    public void testSize() {
        assertEquals("Medium", pet.getPet_size());
    }

    @Test
    public void testSex() {
        assertEquals("Male", pet.getPet_sex());
    }

    @Test
    public void testInfo() {
        assertEquals("Takes medication for flees.", pet.getPet_info());
    }
}
