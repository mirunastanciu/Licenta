package com.test.app;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication(scanBasePackages = {"com.test.app"})
@PropertySource("classpath:application.properties")
@EnableAutoConfiguration
public class Start {

	public static void main(String[] args) {
		SpringApplication.run(Start.class, args);
	}
	
}
