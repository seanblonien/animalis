package petfinder.site.common.MailGun;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

public class MGEmail {

    public static String sendComplexMessage(String subject, String text, String to) throws UnirestException {
        HttpResponse<String> request = Unirest.post("https://api.mailgun.net/v3/sandbox09c88aedd74442ee8b26eb12f2f025a6.mailgun.org/messages")
                .basicAuth("api", "9d8cee7e65b579a52d1e37783f58abdf-a3d67641-58a139e2")
                .queryString("from", "donotreply@tempeturs.com")
                .queryString("to", to)
                .queryString("subject", subject)
                .queryString("text", text)
                .asString();
        return request.getBody();
    }
}
