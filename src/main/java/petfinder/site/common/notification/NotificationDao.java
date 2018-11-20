package petfinder.site.common.notification;

import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import petfinder.site.common.user.UserAuthenticationDto;
import petfinder.site.common.user.UserDto;
import petfinder.site.elasticsearch.NotificationElasticsearchRepository;
import petfinder.site.elasticsearch.UserElasticSearchRepository;

import java.util.Optional;

@Repository
public class NotificationDao {
    @Autowired
    private NotificationElasticsearchRepository notificationElasticsearchRepository;

    @Autowired
    private UserElasticSearchRepository userRepository;

    public Optional<UserAuthenticationDto> findUserByPrincipal(String principal) {
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        String queryString = String.format("user.principal=\"%s\"", principal.replace("\"", ""));
        searchSourceBuilder.query(QueryBuilders.queryStringQuery(queryString));

        return userRepository.search(searchSourceBuilder).stream().findFirst();
    }

    public void addNotification(Long id, String principal) {
        UserAuthenticationDto myUser = findUserByPrincipal(principal).get();
        myUser.getUser().addNotification(id);
        userRepository.save(myUser);
    }

    public Optional<NotificationDto> findNotification(Long id) {
        return notificationElasticsearchRepository.find(id);
    }

    public void save(NotificationDto notification) {
        notificationElasticsearchRepository.save(notification);
    }

    public void delete(Long id) {
        notificationElasticsearchRepository.delete(id);
    }
}
