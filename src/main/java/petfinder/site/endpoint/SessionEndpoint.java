package petfinder.site.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import petfinder.site.common.session.SessionDto;
import petfinder.site.common.session.SessionService;

import java.util.List;
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

    @GetMapping(value = "/all", produces = "application/json")
    public List<Optional<SessionDto>> getSessions() {
        System.out.println("Finding all sessions in backend");
        return sessionService.findAllSessions();
    }

    @GetMapping(produces = "application/json")
    public Optional<SessionDto> getSessions(@RequestBody SessionService.SessionQuery query) {
        System.out.println("Finding sessions according to filter in backend");
        return sessionService.findSessions(query);
    }

    @PostMapping(produces = "application/json")
    public SessionDto saveSession(@RequestBody SessionDto session) {
        System.out.println("Saving session...");
        System.out.println(session.toString());
        sessionService.save(session);
        return session;
    }

    @PostMapping(value = "/update")
    public SessionDto updateSession(@RequestBody SessionDto session) {
        System.out.println("Got to update session endpoint");
        return sessionService.update(session);
    }
}
