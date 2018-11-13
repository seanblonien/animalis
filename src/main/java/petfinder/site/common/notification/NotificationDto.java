package petfinder.site.common.notification;

import alloy.util.Identifiable;

public class NotificationDto implements Identifiable {
    private Long id;
    private String notificationType;
    private String otherUserPrincipal;
    private String dataBody;
    private Boolean hasBeenRead;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNotificationType() {
        return notificationType;
    }

    public void setNotificationType(String notificationType) {
        this.notificationType = notificationType;
    }

    public String getOtherUserPrincipal() {
        return otherUserPrincipal;
    }

    public void setOtherUserPrincipal(String otherUserPrincipal) {
        this.otherUserPrincipal = otherUserPrincipal;
    }

    public String getDataBody() {
        return dataBody;
    }

    public void setDataBody(String dataBody) {
        this.dataBody = dataBody;
    }

    public Boolean getHasBeenRead() {
        return hasBeenRead;
    }

    public void setHasBeenRead(Boolean hasBeenRead) {
        this.hasBeenRead = hasBeenRead;
    }

    @Override
    public String toString() {
        return "NotificationRequest{" +
                "id=" + id +
                ", notificationType='" + notificationType + '\'' +
                ", otherUserPrincipal='" + otherUserPrincipal + '\'' +
                ", dataBody='" + dataBody + '\'' +
                ", hasBeenRead=" + hasBeenRead +
                '}';
    }
}
