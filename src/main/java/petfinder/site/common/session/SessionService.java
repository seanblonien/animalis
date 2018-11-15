package petfinder.site.common.session;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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

    public Optional<SessionDto> findSessions(SessionQuery query) {
        return sessionDao.findSessions(query);
    }

    public List<Optional<SessionDto>> findAllSessions() {
        return sessionDao.findAllSessions();
    }

    public static class SessionQuery {
        private List<String> sessionTypes;
        private List<String> petSpecies;
        private String dateRangeStart;
        private String dateRangeEnd;
        private String timeRangeStart;
        private String timeRangeEnd;
        private Double distance;

        public List<String> getSessionTypes() {
            return sessionTypes;
        }

        public void setSessionTypes(List<String> sessionTypes) {
            this.sessionTypes = sessionTypes;
        }

        public List<String> getPetSpecies() {
            return petSpecies;
        }

        public void setPetSpecies(List<String> petSpecies) {
            this.petSpecies = petSpecies;
        }

        public String getDateRangeStart() {
            return dateRangeStart;
        }

        public void setDateRangeStart(String dateRangeStart) {
            this.dateRangeStart = dateRangeStart;
        }

        public String getDateRangeEnd() {
            return dateRangeEnd;
        }

        public void setDateRangeEnd(String dateRangeEnd) {
            this.dateRangeEnd = dateRangeEnd;
        }

        public String getTimeRangeStart() {
            return timeRangeStart;
        }

        public void setTimeRangeStart(String timeRangeStart) {
            this.timeRangeStart = timeRangeStart;
        }

        public String getTimeRangeEnd() {
            return timeRangeEnd;
        }

        public void setTimeRangeEnd(String timeRangeEnd) {
            this.timeRangeEnd = timeRangeEnd;
        }

        public Double getDistance() {
            return distance;
        }

        public void setDistance(Double distance) {
            this.distance = distance;
        }

        @Override
        public String toString() {
            return "SessionQuery{" +
                    "sessionTypes=" + sessionTypes +
                    ", petSpecies=" + petSpecies +
                    ", dateRangeStart='" + dateRangeStart + '\'' +
                    ", dateRangeEnd='" + dateRangeEnd + '\'' +
                    ", timeRangeStart='" + timeRangeStart + '\'' +
                    ", timeRangeEnd='" + timeRangeEnd + '\'' +
                    ", distance=" + distance +
                    '}';
        }
    }
}
