package petfinder.site.elasticsearch;

import alloy.elasticsearch.ElasticSearchClientProvider;
import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class PetfinderElasticSearchClientProvider implements ElasticSearchClientProvider {
    private RestHighLevelClient client;

    @Value("${elastic-search.host}")
    private String elasticSearchHost;

    @Value("${elastic-search.port}")
    private int elasticSearchPort;

    @Value("${elastic-search.scheme}")
    private String elasticSearchScheme;

    @Value("${elastic-search.user-name}")
    private String elasticSearchUserName;

    @Value("${elastic-search.password}")
    private String elasticSearchPassword;

    @PostConstruct
    private void initialize() {
        RestClientBuilder builder = RestClient.builder(new HttpHost(elasticSearchHost, elasticSearchPort, elasticSearchScheme));
        if (elasticSearchUserName != null) {
            CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
            credentialsProvider.setCredentials(AuthScope.ANY, new UsernamePasswordCredentials(elasticSearchUserName, elasticSearchPassword));

            builder.setHttpClientConfigCallback(httpClientBuilder -> httpClientBuilder.setDefaultCredentialsProvider(credentialsProvider));
        }

        client = new RestHighLevelClient(builder);
    }

    public RestHighLevelClient getClient() {
        return client;
    }
}
