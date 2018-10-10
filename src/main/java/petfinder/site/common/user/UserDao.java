package petfinder.site.common.user;

import alloy.elasticsearch.ElasticSearchClientProvider;
import org.elasticsearch.action.update.UpdateRequest;
import org.elasticsearch.action.update.UpdateResponse;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.script.Script;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import petfinder.site.common.pet.PetDto;
import petfinder.site.elasticsearch.PetElasticsearchRepository;
import petfinder.site.elasticsearch.UserElasticSearchRepository;
import petfinder.site.elasticsearch.UserPetElasticsearchRepository;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.elasticsearch.common.xcontent.XContentFactory.jsonBuilder;

/**
 * Created by jlutteringer on 8/23/17.
 */
@Repository
public class UserDao {
	@Autowired
	private UserElasticSearchRepository userRepository;

	@Autowired
	private UserPetElasticsearchRepository userPetRepository;

	@Autowired
	private ElasticSearchClientProvider elasticSearchClientProvider;

	@Autowired
	private PetElasticsearchRepository petRepository;

	public Optional<UserAuthenticationDto> findUserByPrincipal(String principal) {
		SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

		String queryString = String.format("user.principal=\"%s\"", principal.replace("\"", ""));
		searchSourceBuilder.query(QueryBuilders.queryStringQuery(queryString));

		return userRepository.search(searchSourceBuilder).stream().findFirst();
	}

	public void save(UserAuthenticationDto userAuthentication) {
		userRepository.save(userAuthentication);
	}

	public void delete(UserService.DeleteRequest request) {
		userRepository.delete(request.getPrincipal());
	}

	public void delete(UserService.PetDeleteRequest request) {
		userPetRepository.delete(request.getPetId());
	}

	public void update(UserDto user) throws IOException {
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
					.endObject()
				.endObject());
		UpdateResponse response = elasticSearchClientProvider.getClient().update(updateRequest);
		System.out.println("response: " + response);
	}

	public List<UserPetDto> findPets(UserDto user) {
		SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

		String queryString = String.format("userPrincipal=\"%s\"", user.getPrincipal().replace("\"", ""));
		searchSourceBuilder.query(QueryBuilders.queryStringQuery(queryString));

		return userPetRepository.search(searchSourceBuilder);
//		List<UserPetDto> userPets = userPetRepository.search(searchSourceBuilder);
//		return userPets.stream()
//				.map(userPet -> petRepository.find(userPet.getPetId()).get())
//				.collect(Collectors.toList());
	}

	public UserPetDto save(UserPetDto userPetDto) {
		return userPetRepository.save(userPetDto);
	}
}