package br.com.hoiama.angular1.entity.repository;

import br.com.hoiama.angular1.entity.Carona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaronaRepository extends JpaRepository<Carona, Integer> {
}
