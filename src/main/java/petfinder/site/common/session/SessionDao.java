package petfinder.site.common.session;

import alloy.elasticsearch.ElasticSearchClientProvider;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import petfinder.site.elasticsearch.SessionElasticsearchRepository;

import java.util.*;

@Repository
public class SessionDao {
    @Autowired
    private SessionElasticsearchRepository sessionElasticsearchRepository;

    @Autowired
    private ElasticSearchClientProvider elasticSearchClientProvider;

    public Optional<SessionDto> findSession(Long id) {
        return sessionElasticsearchRepository.find(id);
    }

    public Optional<SessionDto> findSessions(SessionService.SessionQuery query) {
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        String queryString = String.format("sessionType=\"%s\"", query.getSessionTypes().get(0).replace("\"", ""));
        System.out.println("searching for sessions");
        searchSourceBuilder.query(QueryBuilders.queryStringQuery(queryString));

        return sessionElasticsearchRepository.search(searchSourceBuilder).stream().findFirst();
    }

    public List<Optional<SessionDto>> findAllSessions() {
        SearchRequest searchRequest = new SearchRequest();
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(QueryBuilders.matchAllQuery());
        System.out.println("searching for sessions");

        List<SessionDto> sessionList = new ArrayList<>(sessionElasticsearchRepository.search(searchSourceBuilder));

        List<Optional<SessionDto>> optSessionList = new ArrayList<>();
        for(SessionDto s : sessionList){
            optSessionList.add(Optional.ofNullable(s).filter(sf -> !sf.isEmpty()));
        }

        // outputs all the sessions
        //System.out.println(Arrays.toString(optSessionList.toArray()));

        return optSessionList;
    }

    public Optional<SessionDto> findSessionLowTech(Long id) {
        RestHighLevelClient client = elasticSearchClientProvider.getClient();
        // Use the client to make your search and manually parse the results
        return Optional.empty();
    }

    public void save(SessionDto session) {
        sessionElasticsearchRepository.save(session);
    }
}
