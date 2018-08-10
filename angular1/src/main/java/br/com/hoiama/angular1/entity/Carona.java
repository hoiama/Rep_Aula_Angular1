package br.com.hoiama.angular1.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table (name="Carona")
@Data
@Getter
@Setter
public class Carona {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int idCarona;

    @Column(name = "NomeCondutor")
    private String noneCondutor;

    @Column(name="destinoCondutor")
    private String destinoCondutor;


    public int getIdCarona() {
        return idCarona;
    }

    public void setIdCarona(int idCarona) {
        this.idCarona = idCarona;
    }

    public String getNoneCondutor() {
        return noneCondutor;
    }

    public void setNoneCondutor(String noneCondutor) {
        this.noneCondutor = noneCondutor;
    }

    public String getDestinoCondutor() {
        return destinoCondutor;
    }

    public void setDestinoCondutor(String destinoCondutor) {
        this.destinoCondutor = destinoCondutor;
    }
}
