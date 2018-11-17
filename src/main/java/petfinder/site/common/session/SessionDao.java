package petfinder.site.common.session;

import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import petfinder.site.elasticsearch.SessionElasticsearchRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class SessionDao {
    @Autowired
    private SessionElasticsearchRepository sessionElasticsearchRepository;

    public void save(SessionDto session) {
        sessionElasticsearchRepository.save(session);
    }

    public Optional<SessionDto> findSession(Long id) {
        return sessionElasticsearchRepository.find(id);
    }

    public Optional<SessionDto> findSessions(SessionService.SessionQuery query) {
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        String queryString = String.format("sessionType=\"%s\"", query.getSessionTypes().get(0).replace("\"", ""));
        searchSourceBuilder.query(QueryBuilders.queryStringQuery(queryString));

        return sessionElasticsearchRepository.search(searchSourceBuilder).stream().findFirst();
    }

    public List<Optional<SessionDto>> findAllSessions() {
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(QueryBuilders.matchAllQuery());

        List<SessionDto> sessionList = new ArrayList<>(sessionElasticsearchRepository.search(searchSourceBuilder));

        List<Optional<SessionDto>> optSessionList = new ArrayList<>();
        for(SessionDto s : sessionList){
            optSessionList.add(Optional.ofNullable(s).filter(sf -> !sf.isEmpty()));
        }

        return optSessionList;
    }

    public void delete(Long id) {
        sessionElasticsearchRepository.delete(id);
    }
}
