package ac.kr.khu.ZuulApplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableDiscoveryClient
@EnableZuulProxy
public class ZuulApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZuulApplication.class, args);
	}
//	@Bean
//	public PreZuulFilter preFilter() {
//		return new PreZuulFilter();
//	}
//
//	@Bean
//	public PostZuulFilter postFilter() {
//		return new PostZuulFilter();
//	}

}
