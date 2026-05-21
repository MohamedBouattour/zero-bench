package com.benchzero.backend.controller;

import com.benchzero.backend.model.Consultant;
import com.benchzero.backend.repository.ConsultantRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/consultants")
@CrossOrigin(origins = "*")
public class ConsultantController {

    @Autowired
    private ConsultantRepository consultantRepository;

    @GetMapping
    public List<Consultant> getAllConsultants() {
        return consultantRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Consultant> getConsultantById(@PathVariable Long id) {
        return consultantRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Consultant createConsultant(@RequestBody Consultant consultant) {
        // Calculate risk level based on benchStatus if not specified
        if (consultant.getRiskLevel() == null) {
            if (consultant.getBenchStatus() != null && 
               (consultant.getBenchStatus().contains("days") || consultant.getBenchStatus().contains("d"))) {
                String daysStr = consultant.getBenchStatus().replaceAll("[^0-9]", "");
                if (!daysStr.isEmpty()) {
                    int days = Integer.parseInt(daysStr);
                    if (days <= 15) {
                        consultant.setRiskLevel("CRITICAL");
                    } else if (days <= 30) {
                        consultant.setRiskLevel("MEDIUM");
                    } else {
                        consultant.setRiskLevel("STABLE");
                    }
                } else {
                    consultant.setRiskLevel("MEDIUM");
                }
            } else {
                consultant.setRiskLevel("STABLE");
            }
        }
        return consultantRepository.save(consultant);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Consultant> updateConsultant(@PathVariable Long id, @RequestBody Consultant details) {
        return consultantRepository.findById(id)
                .map(c -> {
                    c.setName(details.getName());
                    c.setTitle(details.getTitle());
                    c.setSkills(details.getSkills());
                    c.setYoe(details.getYoe());
                    c.setBenchStatus(details.getBenchStatus());
                    c.setDailyRate(details.getDailyRate());
                    c.setCurrency(details.getCurrency());
                    c.setRiskLevel(details.getRiskLevel());
                    c.setReactProficiency(details.getReactProficiency());
                    c.setNodeProficiency(details.getNodeProficiency());
                    c.setDevopsProficiency(details.getDevopsProficiency());
                    c.setAwsProficiency(details.getAwsProficiency());
                    c.setSymfonyProficiency(details.getSymfonyProficiency());
                    c.setUpskillingTarget(details.getUpskillingTarget());
                    c.setUpskillingImpact(details.getUpskillingImpact());
                    if (details.getAvatarUrl() != null) {
                        c.setAvatarUrl(details.getAvatarUrl());
                    }
                    return ResponseEntity.ok(consultantRepository.save(c));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConsultant(@PathVariable Long id) {
        return consultantRepository.findById(id)
                .map(c -> {
                    consultantRepository.delete(c);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
