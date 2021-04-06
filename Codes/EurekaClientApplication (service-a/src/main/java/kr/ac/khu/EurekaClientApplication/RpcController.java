package kr.ac.khu.EurekaClientApplication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api")
public class RpcController {

    @Autowired
    private RestTemplate restTemplate;

    private static final String SERVICE_NAME = "node-msa-example";

    @GetMapping("/rpc/test")
    public String callServiceB() {
        ResponseEntity<String> ackMessage;
        String apiPath = "/";

        ackMessage = restTemplate.getForEntity("http://" + SERVICE_NAME + apiPath, String.class);

        return "Service-A: inst001 to " + " > " + ackMessage.getBody();
    }

}
