package petfinder.site.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import petfinder.site.common.notification.NotificationDto;
import petfinder.site.common.notification.NotificationService;

import java.util.Optional;

@RestController
@RequestMapping(value = "/api/notification")
public class NotificationEndpoint {
    @Autowired
    private NotificationService notificationService;

    @PostMapping(produces = "application/json")
    public NotificationDto saveNotification(@RequestBody NotificationDto notification) {
        System.out.println("Saving notification...");
        notificationService.save(notification);
        return notification;
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public Optional<NotificationDto> getNotification(@PathVariable("id") String id) {
        return notificationService.findNotification(Long.parseLong(id));
    }
}
