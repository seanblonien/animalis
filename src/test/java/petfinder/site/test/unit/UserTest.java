package petfinder.site.test.unit;

import org.junit.Before;
import org.junit.Test;
import petfinder.site.common.user.UserDto;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.assertEquals;

public class UserTest {

    private UserDto user = null;

    @Before
    public void init() {

        List<String> roles = new ArrayList<String>();
        roles.add("owner");
        roles.add("sitter");

        Map<String, Object> attributes = new HashMap<String, Object>();
        attributes.put("fname", "John");
        attributes.put("lname", "Doe");
        attributes.put("phone", "1234567890");
        attributes.put("emailNotifications", "true");

        Map<String, Object> address = new HashMap<String, Object>();
        address.put("street", "1234 Street Rd");
        address.put("city", "Citytown");
        address.put("state", "TX");
        address.put("zip", "12345");

        List<Long> pets = new ArrayList<Long>();
        pets.add(3543115176076623000L);

        List<Long> sessions = new ArrayList<Long>();
        sessions.add(1876115176076625034L);

        user = new UserDto("email", roles, attributes, address, pets, sessions, null, null);
    }

    @Test
    public void testPrincipal() {
        assertEquals("email", user.getPrincipal());
    }

    @Test
    public void testRoles() {
        assertEquals("owner", user.getRoles().get(0));
        assertEquals("sitter", user.getRoles().get(1));
    }

    @Test
    public void testAttributes() {
        assertEquals("John", user.getAttributes().get("fname"));
        assertEquals("Doe", user.getAttributes().get("lname"));
        assertEquals("1234567890", user.getAttributes().get("phone"));
        assertEquals("true", user.getAttributes().get("emailNotifications"));
    }

    @Test
    public void testAddress() {
        assertEquals("1234 Street Rd", user.getAddress().get("street"));
        assertEquals("Citytown", user.getAddress().get("city"));
        assertEquals("TX", user.getAddress().get("state"));
        assertEquals("12345", user.getAddress().get("zip"));
    }

    @Test
    public void testPets() {
        assertEquals(3543115176076623000L, (Object)user.getPets().get(0));
    }

    @Test
    public void testSessions() {
        assertEquals(1876115176076625034L, (Object)user.getSessions().get(0));
    }
}
