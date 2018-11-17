package alloy.util;

import java.util.Map;

public interface Serializer<T> {
    Map<String, Object> serialize(T element);

    T deserialize(Map<String, Object> map);
}
