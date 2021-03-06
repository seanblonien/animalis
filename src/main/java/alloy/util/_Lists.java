package alloy.util;

import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableList.Builder;
import com.google.common.collect.Lists;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.stream.Collectors;

public class _Lists {
    public static <T> List<T> mutableList(Iterable<? extends T> targets) {
        return Lists.newArrayList(targets);
    }

    public static <T> List<T> list(List<T> targets) {
        if (targets instanceof ImmutableList) {
            return targets;
        }

        return ImmutableList.copyOf(targets);
    }

    @SafeVarargs
    public static <T> List<T> mutableList(T... targets) {
        if (targets == null) {
            return Lists.newArrayList();
        }
        return Lists.newArrayList(targets);
    }

    public static <T> List<T> list(Collection<T> elements) {
        return ImmutableList.copyOf(elements);
    }

    @SafeVarargs
    public static <T> List<T> list(T... targets) {
        if (targets == null) {
            return ImmutableList.of();
        }
        return ImmutableList.copyOf(targets);
    }

    public static <T> List<T> list(T first, List<T> other) {
        return ImmutableList.<T>builder().add(first).addAll(other).build();
    }

    @SafeVarargs
    public static <T> List<T> concat(List<? extends T>... lists) {
        Builder<T> builder = ImmutableList.builder();
        for (List<? extends T> list : lists) {
            builder.addAll(list);
        }

        return builder.build();
    }

    public static <T, N> List<N> mapIndexed(Collection<T> iterable, BiFunction<T, Integer, N> mapper) {
        return _Streams.mapIndexed(iterable, mapper).collect(Collectors.toList());
    }

    public static <T> Optional<T> last(List<T> list) {
        if (list == null || list.isEmpty()) {
            return Optional.empty();
        }

        return Optional.of(list.get(list.size() - 1));
    }

    public static <T> List<T> removeAll(List<T> elements, T remove) {
        return elements.stream().filter(element -> !element.equals(remove)).collect(_Collectors.toList());
    }
}
