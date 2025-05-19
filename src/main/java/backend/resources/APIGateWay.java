package backend.resources;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableDiscoveryClient
public class APIGateWay {
    
    public static void main(String[] args) {
        SpringApplication.run(APIGateWay.class, args);
    }

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
            .route("cliente_service", r -> r
                .path("/api/clientes/**")
                .uri("http://bd-ferremas-clientes.crwi4crvnqsy.us-east-1.rds.amazonaws.com:8081"))
            .route("producto_service", r -> r
                .path("/api/productos/**")
                .uri("http://bd-ferremas-productos.crwi4crvnqsy.us-east-1.rds.amazonaws.com:8084"))
            .route("carrito_service", r -> r
                .path("/api/carritos/**")
                .uri("http://bd-ferremas-clientes.crwi4crvnqsy.us-east-1.rds.amazonaws.com:8081"))
            .route("admin_service", r -> r
                .path("/api/admin/**")
                .uri("http://bd-ferremas-admin.crwi4crvnqsy.us-east-1.rds.amazonaws.com:8082"))
            .build();
    }
}