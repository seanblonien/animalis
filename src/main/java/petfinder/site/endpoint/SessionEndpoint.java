package petfinder.site.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import petfinder.site.common.session.SessionDto;
import petfinder.site.common.session.SessionService;

import java.util.Optional;

@RestController
@RequestMapping("/api/sessions")
public class SessionEndpoint {
    @Autowired
    private SessionService sessionService;

    @GetMapping(value = "/{id}", produces = "application/json")
    public Optional<SessionDto> getSession(@PathVariable("id") String id) {
        return sessionService.findSession(Long.parseLong(id));
    }

    @PostMapping(produces = "application/json")
    public SessionDto saveSession(@RequestBody SessionDto session) {
        System.out.println("Saving session...");
        sessionService.save(session);
        return session;
    }

    @PostMapping(value = "/update")
    public SessionDto updateSession(@RequestBody SessionDto session) {
        System.out.println("Got to update session endpoint");
        return sessionService.update(session);
    }
}
