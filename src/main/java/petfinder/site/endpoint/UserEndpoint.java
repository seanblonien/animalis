package petfinder.site.endpoint;

import com.mashape.unirest.http.exceptions.UnirestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import petfinder.site.common.MailGun.MGEmail;
import petfinder.site.common.notification.NotificationDto;
import petfinder.site.common.pet.PetDto;
import petfinder.site.common.session.SessionDto;
import petfinder.site.common.user.UserDto;
import petfinder.site.common.user.UserService;
import petfinder.site.common.user.UserService.RegistrationRequest;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/user")
public class UserEndpoint {
    @Autowired
    private UserService userService;

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
    public Optional<UserDto> getUser(@PathVariable("principal") String principal) {
        String decodedPrincipal = principal.replace("*", ".");
        return userService.findUserByPrincipal(decodedPrincipal);
    }

    @GetMapping(value = "/pet")
    public List<Optional<PetDto>> getPets() {
        String principal = SecurityContextHolder.getContext().getAuthentication().getName();
        UserDto user = userService.findUserByPrincipal(principal).get();
        return userService.findPets(user);
    }

    @GetMapping(value = "/sessions")
    public List<Optional<SessionDto>> getSessions() {
        String principal = SecurityContextHolder.getContext().getAuthentication().getName();
        UserDto user = userService.findUserByPrincipal(principal).get();
        return userService.findSessions(user);
    }

    @GetMapping(value = "/notifications")
    public List<Optional<NotificationDto>> getNotifications() {
        String principal = SecurityContextHolder.getContext().getAuthentication().getName();
        UserDto user = userService.findUserByPrincipal(principal).get();
        return userService.findNotifications(user);
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
        if(user.getRoles().contains("SITTER") && user.getRoles().contains("OWNER"))
            text += "As a sitter and owner, be sure to schedule your pets' sessions as soon as you need to. You can find sessions to sit for as well. We greatly appreciate your dedication as a pet enthusiast and are glad you are joining us in this pet loving journey!";
        else if(user.getRoles().contains("OWNER"))
            text += "As a sitter, be sure to check out the currently available sessions to sit for near you.";
        else if(user.getRoles().contains("SITTER"))
            text += "As a pet owner, be sure to schedule your pet service with us soon so sitters can bid and and take care of your pet as fast as possible.";

        text  += "\n\nWe greatly appreciate your dedication as a pet enthusiast and are glad you are joining us in this pet loving journey!\n\nSee you on Animalis! Sincerely,\n\nMakers of Animalis";

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

    @PostMapping(value = "/notification/add/{id}")
    public UserDto addNotification(@PathVariable("id") Long id) {
        String principal = SecurityContextHolder.getContext().getAuthentication().getName();
        UserDto user = userService.findUserByPrincipal(principal).get();
        user.addNotification(id);
        return userService.update(user);
    }

    @PostMapping(value = "/sessions/{id}")
    public UserDto addSession(@PathVariable("id") Long id) {
        String principal = SecurityContextHolder.getContext().getAuthentication().getName();
        UserDto user = userService.findUserByPrincipal(principal).get();
        user.addSession(id);
        return userService.update(user);
    }

    @PostMapping(value = "/pet/{id}")
    public UserDto addPet(@PathVariable("id") Long id) {
        String principal = SecurityContextHolder.getContext().getAuthentication().getName();
        UserDto user = userService.findUserByPrincipal(principal).get();
        user.addPet(id);
        return userService.update(user);
    }

    @PostMapping(value = "/delete")
    public void delete(@RequestBody UserService.PrincipalRequest request) {
        userService.delete(request);
    }

    @PostMapping(value = "/pet/delete/{id}")
    public UserDto deletePet(@PathVariable("id") Long id) {
        String principal = SecurityContextHolder.getContext().getAuthentication().getName();
        UserDto user = userService.findUserByPrincipal(principal).get();
        user.getPets().remove(id);
        return userService.update(user);
    }

    @PostMapping(value = "/sessions/delete/{id}")
    public UserDto deleteSession(@PathVariable("id") Long id) {
        String principal = SecurityContextHolder.getContext().getAuthentication().getName();
        UserDto user = userService.findUserByPrincipal(principal).get();
        user.getSessions().remove(id);
        return userService.update(user);
    }

    @PostMapping(value = "/notification/delete/{id}")
    public UserDto deleteNotification(@PathVariable("id") Long id) {
        String principal = SecurityContextHolder.getContext().getAuthentication().getName();
        UserDto user = userService.findUserByPrincipal(principal).get();
        user.deleteNotification(id);
        return userService.update(user);
    }
}
