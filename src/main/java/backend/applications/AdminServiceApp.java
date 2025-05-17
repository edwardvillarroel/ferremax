package backend.applications;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class AdminServiceApp{
    
    public static void main(String[] args) {
        SpringApplication.run(AdminServiceApp.class, args);
    }
}