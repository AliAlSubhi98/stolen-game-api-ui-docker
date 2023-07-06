package com.springpirates.stolengameapi;

import org.apache.catalina.core.ApplicationContext;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import java.util.Arrays;

@SpringBootApplication
public class StolenGameApiApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(StolenGameApiApplication.class, args);
		String[] namesOfInstances = context.getBeanDefinitionNames();

//		 System.out.println("=================================");
//		 for (String currName: namesOfInstances) {
//		 	System.out.println(currName);
//		 }
	}

}
