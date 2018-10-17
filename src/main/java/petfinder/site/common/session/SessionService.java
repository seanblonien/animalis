package petfinder.site.common.session;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SessionService {
    @Autowired
    private SessionDao sessionDao;

    public Optional<SessionDto> findSession(Long id) {
        return sessionDao.findSession(id);
    }

    public void save(SessionDto session) {
        sessionDao.save(session);
    }

    public SessionDto update(SessionDto session) {
        sessionDao.save(session);
        return session;
    }
}
