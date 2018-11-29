package petfinder.site.endpoint;

import com.mashape.unirest.http.exceptions.UnirestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import petfinder.site.common.MailGun.MGEmail;
import petfinder.site.common.notification.NotificationDto;
import petfinder.site.common.pet.PetDto;
import petfinder.site.common.rating.RatingDto;
import petfinder.site.common.session.SessionDto;
import petfinder.site.common.user.PublicUserDto;
import petfinder.site.common.user.UserDto;
import petfinder.site.common.user.UserService;
import petfinder.site.common.user.UserService.RegistrationRequest;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@RestController
@RequestMapping(value = "/api/user")
public class UserEndpoint {
    @Autowired
    private UserService userService;

    private Optional<UserDto> getAuthUser() {
        String principal = SecurityContextHolder.getContext().getAuthentication().getName();
         return userService.findUserByPrincipal(principal);
    }

    @PostMapping(value = "/register")
    public UserDto register(@RequestBody RegistrationRequest request) {
        return userService.register(request);
    }

    @GetMapping(produces = "application/json")
    public Optional<UserDto> getUserDetails() {
        String principal = SecurityContextHolder.getContext().getAuthentication().getName();
        return userService.findUserByPrincipal(principal);
    }

    @GetMapping(value = "/public/{principal}", produces = "application/json")
    public PublicUserDto getUser(@PathVariable("principal") String principal) {
        String decodedPrincipal = principal.replace("*", ".");
        Optional<UserDto> optUser = userService.findUserByPrincipal(decodedPrincipal);
        if (optUser.isPresent()) {
            UserDto user = optUser.get();
            System.out.println("Got public user: \n" + new PublicUserDto(user).toString());
            return new PublicUserDto(user);
        } else {
            return null;
        }
    }

    @GetMapping(value = "/pet")
    public List<Optional<PetDto>> getPets() {
        return getAuthUser().map(userDto -> userService.findPets(userDto)).orElse(null);
    }

    @GetMapping(value = "/sessions")
    public List<Optional<SessionDto>> getSessions() {
        return getAuthUser().map(userDto -> userService.findSessions(userDto)).orElse(null);
    }

    @GetMapping(value = "/notifications")
    public List<Optional<NotificationDto>> getNotifications() {
        return getAuthUser().map(userDto -> userService.findNotifications(userDto)).orElse(null);
    }

    @GetMapping(value = "/ratings")
    public List<Optional<RatingDto>> getRatings() {
        return getAuthUser().map(userDto -> userService.findRatings(userDto)).orElse(null);
    }

    @GetMapping(value = "/confirmPassword/{pass}", produces = "application/json")
    public boolean confirmPassword(@PathVariable("pass") String pass) {
        return userService.confirmPassword(pass);
    }

    @PostMapping(value = "/update")
    public UserDto update(@RequestBody RegistrationRequest request) {
        UserDto myUser = userService.constructUser(request);
        return userService.update(myUser);
    }

    @PostMapping(value = "/sendEmailRegister")
    public void sendEmailReg() throws UnirestException {
        // Get current user
        String principal = SecurityContextHolder.getContext().getAuthentication().getName();
        UserDto user = userService.findUserByPrincipal(principal).get();
        String subject = "Welcome to Animalis! \uD83D\uDC36";
        String text = "Hey " + user.getAttributes().get("fname") + "!\nThank you for registering for Animalis. We hope you will love our pet care service as it offers all of the services you need for all of your pets and busy life. From everyone on the team who has made this app possible, we are excited to have you join us!\n\n";

        // If a user is a certain role :
        if (user.getRoles().contains("SITTER") && user.getRoles().contains("OWNER"))
            text += "As a sitter and owner, be sure to schedule your pets' sessions as soon as you need to. You can find sessions to sit for as well. We greatly appreciate your dedication as a pet enthusiast and are glad you are joining us in this pet loving journey!";
        else if (user.getRoles().contains("OWNER"))
            text += "As a sitter, be sure to check out the currently available sessions to sit for near you.";
        else if (user.getRoles().contains("SITTER"))
            text += "As a pet owner, be sure to schedule your pet service with us soon so sitters can bid and and take care of your pet as fast as possible.";

        text += "\n\nWe greatly appreciate your dedication as a pet enthusiast and are glad you are joining us in this pet loving journey!\n\nSee you on Animalis! Sincerely,\n\nMakers of Animalis";

        // Send email and display confirmation to system
        System.out.println(MGEmail.sendSimpleMessage(subject, text, user.getPrincipal()));
    }

    @PostMapping(value = "/sendEmailPost")
    public void sendEmailPost() throws UnirestException {
        // Get current user
        String currUser = SecurityContextHolder.getContext().getAuthentication().getName();
        UserDto user = userService.findUserByPrincipal(currUser).get();
        String subject = "New Bid!!";
        String text = "Hey there " + user.getAttributes().get("fname") + "," +
                "\n A new sitter has applied for your post : " + " CURR POSTING HERE" +
                " Check it out! \n " + "LINK HERE" + "\n";

        // Send email and display confirmation to system
        System.out.println(MGEmail.sendSimpleMessage(subject, text, user.getPrincipal()));
    }

    @PostMapping(value = "/pet/{id}")
    public UserDto addPet(@PathVariable("id") Long id) {
        return getAuthUser().map(userDto -> {
            userDto.addPet(id);
            return userService.update(userDto);
        }).orElse(null);
    }

    @PostMapping(value = "/sessions/{id}")
    public UserDto addSession(@PathVariable("id") Long id) {
        return getAuthUser().map(userDto -> {
            userDto.addSession(id);
            return userService.update(userDto);
        }).orElse(null);
    }

    @PostMapping(value = "/notifications/{id}")
    public UserDto addNotification(@PathVariable("id") Long id) {
        return getAuthUser().map(userDto -> {
            userDto.addNotification(id);
            return userService.update(userDto);
        }).orElse(null);
    }

    @PostMapping(value = "/ratings/{id}")
    public UserDto addRating(@PathVariable("id") Long id) {
        return getAuthUser().map(userDto -> {
            userDto.addRating(id);
            return userService.update(userDto);
        }).orElse(null);
    }

    @PostMapping(value = "/delete")
    public void delete() {
        userService.delete(getAuthUser());
    }

    @PostMapping(value = "/pet/delete/{id}")
    public UserDto deletePet(@PathVariable("id") Long id) {
        return getAuthUser().map(userDto -> {
            userDto.deletePet(id);
            return userService.update(userDto);
        }).orElse(null);
    }

    @PostMapping(value = "/sessions/delete/{id}")
    public UserDto deleteSession(@PathVariable("id") Long id) {
        return getAuthUser().map(userDto -> {
            userDto.deleteSession(id);
            return userService.update(userDto);
        }).orElse(null);
    }

    @PostMapping(value = "/notifications/delete/{id}")
    public UserDto deleteNotification(@PathVariable("id") Long id) {
        return getAuthUser().map(userDto -> {
            userDto.deleteNotification(id);
            return userService.update(userDto);
        }).orElse(null);
    }

    @PostMapping(value = "/ratings/delete/{id}")
    public UserDto deleteRating(@PathVariable("id") Long id) {
        return getAuthUser().map(userDto -> {
            userDto.deleteRating(id);
            return userService.update(userDto);
        }).orElse(null);
    }
}
