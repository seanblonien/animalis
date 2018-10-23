package petfinder.site.common.MailGun;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

public class MGEmail {

    public static String sendSimpleMessage(String subject, String text, String to) throws UnirestException {
        HttpResponse<String> request = Unirest.post("https://api.mailgun.net/v3/mg.michaelibanez.org/messages")
                .basicAuth("api", "9d8cee7e65b579a52d1e37783f58abdf-a3d67641-58a139e2")
                .queryString("from", "donotreply@tempeturs.com")
                .queryString("to", to)
                .queryString("subject", subject)
                .queryString("text", text)
                .asString();
                // Or as .asJSon(), using string for readability purposes
        return request.getBody();
    }

    public static JsonNode sendHTMLMessage(String subject, String text, String to) throws UnirestException {
        HttpResponse<JsonNode> request = Unirest.post("https://api.mailgun.net/v3/mg.michaelibanez.org/messages")
                .basicAuth("api", "9d8cee7e65b579a52d1e37783f58abdf-a3d67641-58a139e2")
                .queryString("from", "donotreply@tempeturs.com")
                .queryString("to", to)
                .queryString("subject", subject)
                .queryString("text", text)
                .field("html", "<html> <bold> Welcome!! </bold> </html>")
                .asJson();

        return request.getBody();
    }
}
