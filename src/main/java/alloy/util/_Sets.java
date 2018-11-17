package alloy.util;

import com.google.common.collect.ImmutableSet;
import com.google.common.collect.Sets;

import java.util.Collection;
import java.util.Set;

public class _Sets {
    @SafeVarargs
    public static <T> ImmutableSet<T> set(T... targets) {
        return ImmutableSet.copyOf(targets);
    }

    public static <T> Set<T> set(Collection<T> collection) {
        return ImmutableSet.copyOf(collection);
    }

    public static <T> Set<T> mutableSet() {
        return Sets.newHashSet();
    }

    public static <T> Set<T> mutableSortedSet() {
        return Sets.newLinkedHashSet();
    }
}
