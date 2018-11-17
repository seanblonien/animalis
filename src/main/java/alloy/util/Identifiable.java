package alloy.util;

public interface Identifiable extends Momento<Long> {
    String DEFAULT_FIELD_NAME = "id";

    Long getId();

    default Long getMomento() {
        return this.getId();
    }
}
