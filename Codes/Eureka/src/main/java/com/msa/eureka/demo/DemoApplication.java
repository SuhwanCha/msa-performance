package com.msa.eureka.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableEurekaServer
public class DemoApplication {

	public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
	}

}
