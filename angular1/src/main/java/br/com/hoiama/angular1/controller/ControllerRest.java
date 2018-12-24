package br.com.hoiama.angular1.controller;

import br.com.hoiama.angular1.entity.Carona;
import br.com.hoiama.angular1.entity.repository.CaronaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import br.com.hoiama.angular1.factory.FabricaCaronas;
import java.util.List;

@RestController
@RequestMapping("/carona")
public class ControllerRest {

    @Autowired
    FabricaCaronas caronas;

    @Autowired
    CaronaRepository caronaRepository;

    @RequestMapping(value="", method= RequestMethod.GET)
    public List<Carona> getListCaronas(){
       return caronaRepository.findAll();
    }

    @RequestMapping(value="", method = RequestMethod.POST)
    public void postCarona (@RequestBody Carona carona){
        System.out.println("post chegou" + carona.getDestinoCondutor());
        System.out.println("post chegou" + carona.getNomeCondutor());
        caronaRepository.save(carona);
    }

    @RequestMapping(value="/{id}", method = RequestMethod.PUT)
    public void putCarona (@RequestBody Carona carona, @PathVariable int id){
        System.out.println(carona);
        System.out.println("Editando numero " + id);
        System.out.println("Novo nome: " + carona.getNomeCondutor());
        System.out.println("Novo Condutor: " + carona.getDestinoCondutor());
        caronaRepository.save(carona);
    }

    @RequestMapping(value="/{id}", method = RequestMethod.DELETE)
    public void deleteCarona (@PathVariable int id){
        System.out.println("numero : " + id);
        caronaRepository.deleteById(id);
    }

}
