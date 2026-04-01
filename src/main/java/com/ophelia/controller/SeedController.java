package com.ophelia.controller;

import com.ophelia.model.SeedDto;
import com.ophelia.service.SeedService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/seeds")
public class SeedController {
    private final SeedService seedService;

    public SeedController(SeedService seedService) {
        this.seedService = seedService;
    }

    @GetMapping("/sample")
    public SeedDto sample() {
        return seedService.sample();
    }

    @GetMapping("/canonical")
    public Map<String, Object> canonical() {
        return seedService.canonicalIndex();
    }

    @GetMapping("/substrate")
    public Map<String, Object> substrate() {
        return seedService.substrate();
    }

    @GetMapping("/operational")
    public Map<String, Object> operational() {
        return seedService.operationalIndex();
    }

    @GetMapping("/health")
    public Map<String, Object> health() {
        return seedService.healthCheck();
    }

    @GetMapping("/integrity")
    public Map<String, Object> integrity() {
        return seedService.integrity();
    }
}
