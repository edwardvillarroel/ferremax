package backend.resources;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class CORSConfig {
    
    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.setAllowedOrigins(Arrays.asList(
            "http://localhost:3000",
            "http://bd-ferremas-clientes.crwi4crvnqsy.us-east-1.rds.amazonaws.com:8081",
            "http://bd-ferremas-productos.crwi4crvnqsy.us-east-1.rds.amazonaws.com:3307",
            "http://bd-ferremas-admin.crwi4crvnqsy.us-east-1.rds.amazonaws.com:3306"
        )); 
        corsConfig.setMaxAge(8600L);
        corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        corsConfig.setAllowedHeaders(Arrays.asList(
            "Content-Type", 
            "Authorization", 
            "Access-Control-Allow-Origin",
            "Access-Control-Allow-Credentials"
        ));
        corsConfig.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);
        
        return new CorsWebFilter(source);
    }
}
