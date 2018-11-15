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

    @GetMapping(value = "/public/{principal}", produces = "application/json")
    public Optional<UserDto> getUser(@PathVariable("principal") String principal) {
        String decodedPrincipal = principal.replace("*", ".");
        System.out.println("Getting user with principal " + decodedPrincipal);
        System.out.println(userService.findUserByPrincipal(decodedPrincipal).get().toString());
        return userService.findUserByPrincipal(decodedPrincipal);
    }

    @GetMapping(value = "/confirmPassword/{pass}", produces = "application/json")
    public boolean confirmPassword(@PathVariable("pass") String pass) {
        System.out.println("Confirming password " + pass);
        return userService.confirmPassword(pass);
    }

    @PostMapping(value = "/register")
    public UserDto register(@RequestBody RegistrationRequest request) {
        return userService.register(request);
    }

    @PostMapping(value = "/update")
    public UserDto update(@RequestBody RegistrationRequest request) {
        System.out.println("Got to update user endpoint with request...");
        System.out.println(request.toString());
        UserDto myUser = userService.constructUser(request);
        return userService.update(myUser);
    }

    @PostMapping(value = "/sendEmailRegister")
    public void sendEmailReg() throws UnirestException {
        // Get current user
        String principal = SecurityContextHolder.getContext().getAuthentication().getName();
        UserDto user = userService.findUserByPrincipal(principal).get();
        String subject = "Thanks for registering!";
        String text = "Hello " + principal + "!!\nThanks for registering on our website!!  ";

        // If a user is a certain role :
        if(user.getRoles().contains("SITTER") && user.getRoles().contains("OWNER"))
            text += "Be sure to check out and bid on posts!";
        else if(user.getRoles().contains("OWNER"))
            text += "Now you're ready to make a post!";
        else if(user.getRoles().contains("SITTER"))
            text += "Now you're able to create and bid on posts! Goodluck!";

        // Send email and display confirmation to system
        System.out.println(MGEmail.sendSimpleMessage(subject, text, user.getPrincipal()));
    }

    @PostMapping(value = "/sendEmailPost")
    public void sendEmailPost() throws UnirestException {
        // Get current user
        String currUser = SecurityContextHolder.getContext().getAuthentication().getName();
        UserDto user = userService.findUserByPrincipal(currUser).get();
        String subject = "New Bid!!";
        String text = "Hello " + currUser + "!!" +
                      "\n A new sitter has applied for your post : " + " CURR POSTING HERE" +
                      " Check it out! \n " + "LINK HERE" + "\n";

        // Send email and display confirmation to system
        System.out.println(MGEmail.sendSimpleMessage(subject, text, user.getPrincipal()));

    }

    @PostMapping(value = "/delete")
    public void delete(@RequestBody UserService.PrincipalRequest request) {
        userService.delete(request);
    }

    @PostMapping(value = "/pet/delete/{id}")
    public UserDto deletePet(@PathVariable("id") Long id) {
        System.out.println("Deleting pet with id: " + id);
        String principal = SecurityContextHolder.getContext().getAuthentication().getName();
        UserDto user = userService.findUserByPrincipal(principal).get();
        user.getPets().remove(id);
        return userService.update(user);
    }

    @PostMapping(value = "/sessions/delete/{id}")
    public UserDto deleteSession(@PathVariable("id") Long id) {
        System.out.println("Deleting session with id: " + id);
        String principal = SecurityContextHolder.getContext().getAuthentication().getName();
        UserDto user = userService.findUserByPrincipal(principal).get();
        user.getSessions().remove(id);
        return userService.update(user);
    }

    @GetMapping(value = "/pet")
    public List<Optional<PetDto>> getPets() {
        String principal = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("Getting pets from user " + principal);
        UserDto user = userService.findUserByPrincipal(principal).get();
        return userService.findPets(user);
    }

    @GetMapping(value = "/sessions")
    public List<Optional<SessionDto>> getSessions() {
        String principal = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("Getting sessions from user " + principal);
        UserDto user = userService.findUserByPrincipal(principal).get();
        return userService.findSessions(user);
    }

    @PostMapping(value = "/pet/{id}")
    public UserDto addPet(@PathVariable("id") Long id) {
        String principal = SecurityContextHolder.getContext().getAuthentication().getName();
        UserDto user = userService.findUserByPrincipal(principal).get();
        System.out.println("Adding pet with id " + id);
        user.addPet(id);
        System.out.println("User has pets: " + user.getPets().toString());
        return userService.update(user);
    }

    @PostMapping(value = "/notification/add/{id}")
    public UserDto addNotification(@PathVariable("id") Long id) {
        String principal = SecurityContextHolder.getContext().getAuthentication().getName();
        UserDto user = userService.findUserByPrincipal(principal).get();
        user.addNotification(id);
        return userService.update(user);
    }

    @PostMapping(value = "/notification/delete/{id}")
    public UserDto deleteNotification(@PathVariable("id") Long id) {
        String principal = SecurityContextHolder.getContext().getAuthentication().getName();
        UserDto user = userService.findUserByPrincipal(principal).get();
        user.deleteNotification(id);
        return userService.update(user);
    }

    @PostMapping(value = "/sessions/{id}")
    public UserDto addSession(@PathVariable("id") Long id) {
        String principal = SecurityContextHolder.getContext().getAuthentication().getName();
        UserDto user = userService.findUserByPrincipal(principal).get();
        System.out.println("Adding session with id " + id);
        user.addSession(id);
        System.out.println("User has sessions: " + user.getSessions().toString());
        return userService.update(user);
    }
}
