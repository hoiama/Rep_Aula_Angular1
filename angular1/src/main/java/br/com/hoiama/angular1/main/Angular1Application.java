package br.com.hoiama.angular1.main;

import br.com.hoiama.angular1.controller.ControllerIndex;
import br.com.hoiama.angular1.entity.Carona;
import br.com.hoiama.angular1.entity.repository.CaronaRepository;
import br.com.hoiama.angular1.factory.FabricaCaronas;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackageClasses = {ControllerIndex.class, FabricaCaronas.class})
@EntityScan (basePackageClasses = {Carona.class})
@EnableJpaRepositories (basePackageClasses = {CaronaRepository.class})
public class Angular1Application {

	public static void main(String[] args) {
		SpringApplication.run(Angular1Application.class, args);
	}
}
