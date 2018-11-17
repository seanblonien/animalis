package petfinder.site.common.user;

import alloy.elasticsearch.ElasticSearchClientProvider;
import org.elasticsearch.action.update.UpdateRequest;
import org.elasticsearch.action.update.UpdateResponse;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import petfinder.site.common.notification.NotificationDto;
import petfinder.site.common.pet.PetDto;
import petfinder.site.common.session.SessionDto;
import petfinder.site.elasticsearch.NotificationElasticsearchRepository;
import petfinder.site.elasticsearch.PetElasticsearchRepository;
import petfinder.site.elasticsearch.SessionElasticsearchRepository;
import petfinder.site.elasticsearch.UserElasticSearchRepository;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.elasticsearch.common.xcontent.XContentFactory.jsonBuilder;

@Repository
public class UserDao {
    @Autowired
    private UserElasticSearchRepository userRepository;

    @Autowired
    private ElasticSearchClientProvider elasticSearchClientProvider;

    @Autowired
    private PetElasticsearchRepository petRepository;

    @Autowired
    private SessionElasticsearchRepository sessionRepository;

    @Autowired
    private NotificationElasticsearchRepository notificationRepository;

    public void save(UserAuthenticationDto userAuthentication) {
        userRepository.save(userAuthentication);
    }

    public void update(UserDto user) throws IOException {
        UpdateRequest updateRequest = buildUserFields(user);
        UpdateResponse response = elasticSearchClientProvider.getClient().update(updateRequest);
        System.out.println("Elasticsearch user update response: " + response);
    }

    public Optional<UserAuthenticationDto> findUserByPrincipal(String principal) {
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        String queryString = String.format("user.principal=\"%s\"", principal.replace("\"", ""));
        searchSourceBuilder.query(QueryBuilders.queryStringQuery(queryString));

        return userRepository.search(searchSourceBuilder).stream().findFirst();
    }

    private UpdateRequest buildUserFields(UserDto user) throws IOException{
        UpdateRequest updateRequest = new UpdateRequest();

        updateRequest.index("petfinder-users");
        updateRequest.type("doc");
        updateRequest.id(user.getPrincipal());
        updateRequest.doc(jsonBuilder()
                .startObject()
                    .startObject("user")
                        .field("principal", user.getPrincipal())
                        .field("attributes", user.getAttributes())
                        .field("roles", user.getRoles())
                        .field("address", user.getAddress())
                        .field("pets", user.getPets())
                        .field("sessions", user.getSessions())
                        .field("notifications", user.getNotifications())
                    .endObject()
                .endObject());

        return updateRequest;
    }

    public List<Optional<PetDto>> findPets(UserDto user) {
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        String queryString = String.format("userPrincipal=\"%s\"", user.getPrincipal().replace("\"", ""));
        searchSourceBuilder.query(QueryBuilders.queryStringQuery(queryString));

        List<Long> userPets = user.getPets();
        return userPets != null ? userPets.stream()
                .map(id -> petRepository.find(id))
                .collect(Collectors.toList()) : null;
    }

    public List<Optional<SessionDto>> findSessions(UserDto user) {
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        String queryString = String.format("userPrincipal=\"%s\"", user.getPrincipal().replace("\"", ""));
        searchSourceBuilder.query(QueryBuilders.queryStringQuery(queryString));

        List<Long> userSessions = user.getSessions();
        return userSessions != null ? userSessions.stream()
                .map(id -> sessionRepository.find(id))
                .collect(Collectors.toList()) : null;
    }

    public List<Optional<NotificationDto>> findNotifications(UserDto user) {
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        String queryString = String.format("userPrincipal=\"%s\"", user.getPrincipal().replace("\"", ""));
        searchSourceBuilder.query(QueryBuilders.queryStringQuery(queryString));

        List<Long> userNotifications = user.getNotifications();
        return userNotifications != null ? userNotifications.stream()
                .map(id -> notificationRepository.find(id))
                .collect(Collectors.toList()) : null;
    }

    public void delete(UserService.PrincipalRequest request) {
        userRepository.delete(request.getPrincipal());
    }
}
