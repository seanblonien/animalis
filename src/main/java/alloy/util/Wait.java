package alloy.util;

import java.time.Duration;

public class Wait {
    public static final Duration DEFAULT_WAIT = Duration.ofMillis(250);

    public static void await() {
        await(DEFAULT_WAIT);
    }

    public static void await(Duration duration) {
        _Exceptions.propagate(() -> Thread.sleep(duration.toMillis()));
    }
}
