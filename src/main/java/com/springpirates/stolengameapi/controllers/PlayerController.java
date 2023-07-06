package com.springpirates.stolengameapi.controllers;

import com.springpirates.stolengameapi.models.Player;
import com.springpirates.stolengameapi.services.PlayerService;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping(path = "/api/v1/player")
public class PlayerController {

    @Autowired
    PlayerService playerService;

    @GetMapping
    public List<Player> getAllPlayers() {
        return playerService.getAllPlayers();
    }

    @GetMapping(path = "{id}")
    public Player getSpecificPlayer(@PathVariable(name = "id") String id) {
        Player playerFound = null;
        if (Strings.isNotBlank(id)){
            playerFound = playerService.getSpecificPlayer(id);
        }
        return playerFound;
    }

    @PostMapping
    public Player createPlayer(@RequestBody Player incomingPlayer) {
        return playerService.createPlayer(incomingPlayer);
    }

    @PutMapping(path = "{id}")
    public Player updatePlayer(@PathVariable(name = "id") String id, @RequestBody Player incomingUpdatedPlayer) {
        return playerService.updatePlayer(id, incomingUpdatedPlayer);
    }

    @DeleteMapping(path = "{id}")
    public Player deletePlayer(@PathVariable(name = "id") String id) {
        return playerService.deletePlayer(id);
    }
}
