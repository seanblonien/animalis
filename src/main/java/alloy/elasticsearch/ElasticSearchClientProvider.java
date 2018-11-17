package alloy.elasticsearch;

import org.elasticsearch.client.RestHighLevelClient;

public interface ElasticSearchClientProvider {
    RestHighLevelClient getClient();
}
