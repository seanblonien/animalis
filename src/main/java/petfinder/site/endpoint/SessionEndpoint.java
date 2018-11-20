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

    @PostMapping(produces = "application/json")
    public void saveSession(@RequestBody SessionDto session) {
        sessionService.save(session);
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public Optional<SessionDto> getSession(@PathVariable("id") String id) {
        return sessionService.findSession(Long.parseLong(id));
    }

    @GetMapping(produces = "application/json")
    public Optional<SessionDto> getSessions(@RequestBody SessionService.SessionQuery query) {
        System.out.println("Finding sessions according to filter in backend");
        return sessionService.findSessions(query);
    }

    @GetMapping(value = "/all", produces = "application/json")
    public List<Optional<SessionDto>> getSessions() {
        return sessionService.findAllSessions();
    }

    @PostMapping(value = "/update")
    public void updateSession(@RequestBody SessionDto session) {
        sessionService.save(session);
    }

    @PostMapping(value = "/delete/{id}")
    public void deleteSession(@PathVariable("id") String id) {
        sessionService.deleteSession(Long.parseLong(id));
    }
}
