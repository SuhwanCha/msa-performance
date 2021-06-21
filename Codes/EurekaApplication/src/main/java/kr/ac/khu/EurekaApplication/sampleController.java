package kr.ac.khu.EurekaApplication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")

public class sampleController {
    @Autowired

    @GetMapping("/ping")
    public String callServiceB() throws InterruptedException {
        Thread.sleep(30);
        return "pong";
    }

}
