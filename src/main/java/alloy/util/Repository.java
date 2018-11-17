package alloy.util;

import java.util.Optional;

public interface Repository<T, I> {
    Optional<T> find(I id);

    T save(T item);
}
