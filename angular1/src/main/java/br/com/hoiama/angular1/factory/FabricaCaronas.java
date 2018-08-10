package br.com.hoiama.angular1.factory;

import br.com.hoiama.angular1.entity.Carona;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class FabricaCaronas {

    public ArrayList<Carona> getListaCaronas() {
        Carona carona1 = new Carona();
        carona1.setDestinoCondutor("são leopoldo");
        carona1.setNoneCondutor("hoiama");

        Carona carona2 = new Carona();
        carona2.setDestinoCondutor("Novo hamburgo");
        carona2.setNoneCondutor("thiado");

        Carona carona3 = new Carona();
        carona3.setDestinoCondutor("Novo hamburgo");
        carona3.setNoneCondutor("thiado");

        Carona carona4 = new Carona();
        carona4.setDestinoCondutor("Novo hamburgo");
        carona4.setNoneCondutor("thiado");

        Carona carona5 = new Carona();
        carona5.setDestinoCondutor("Novo hamburgo");
        carona5.setNoneCondutor("thiado");

        ArrayList<Carona> listCaronas = new ArrayList<Carona>();
        listCaronas.add(carona1);
        listCaronas.add(carona2);
        listCaronas.add(carona3);
        listCaronas.add(carona4);
        listCaronas.add(carona5);
        return listCaronas;
    }


}
