package petfinder.site.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import petfinder.site.common.notification.NotificationDto;
import petfinder.site.common.notification.NotificationService;

import java.util.Optional;

@RestController
@RequestMapping(value = "/api/notifications")
public class NotificationEndpoint {
    @Autowired
    private NotificationService notificationService;

    @PostMapping(produces = "application/json")
    public void saveNotification(@RequestBody NotificationDto notification) {
        notificationService.save(notification);
        notificationService.addNotification(notification.getId(), notification.getPrimaryPrincipal());
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public Optional<NotificationDto> getNotification(@PathVariable("id") String id) {
        return notificationService.findNotification(Long.parseLong(id));
    }

    @PostMapping(value = "/update")
    public void updateNotification(@RequestBody NotificationDto notification) {
        notificationService.save(notification);
    }

    @PostMapping(value = "/delete/{id}")
    public void deleteNotification(@PathVariable("id") String id) {
        notificationService.deleteNotification(Long.parseLong(id));
    }
}
