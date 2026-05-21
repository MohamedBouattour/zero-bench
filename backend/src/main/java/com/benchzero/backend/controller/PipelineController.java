package com.benchzero.backend.controller;

import com.benchzero.backend.model.PipelineItem;
import com.benchzero.backend.repository.PipelineItemRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pipelines")
@CrossOrigin(origins = "*")
public class PipelineController {

    @Autowired
    private PipelineItemRepository pipelineItemRepository;

    @GetMapping
    public List<PipelineItem> getAllPipelineItems() {
        return pipelineItemRepository.findAll();
    }

    @PostMapping
    public PipelineItem createPipelineItem(@RequestBody PipelineItem item) {
        if (item.getPotentialRevenue() == null && item.getDailyRate() != null) {
            // Assume 20 billable days in a month for potential revenue calculations
            item.setPotentialRevenue(item.getDailyRate() * 20);
        }
        return pipelineItemRepository.save(item);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<PipelineItem> updatePipelineItemStatus(
            @PathVariable Long id, 
            @RequestParam String status) {
        return pipelineItemRepository.findById(id)
                .map(item -> {
                    item.setStatus(status.toUpperCase());
                    
                    // Simple adjustment of info text if status changes to represent progress
                    if (status.equalsIgnoreCase("CV_SENT")) {
                        item.setInfo("Sent: Just now");
                    } else if (status.equalsIgnoreCase("INTERVIEW_SCHEDULED")) {
                        item.setInfo("Interview being scheduled");
                    } else if (status.equalsIgnoreCase("NEGOTIATION")) {
                        item.setInfo("Contract in negotiation");
                    }
                    
                    return ResponseEntity.ok(pipelineItemRepository.save(item));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PipelineItem> updatePipelineItem(
            @PathVariable Long id, 
            @RequestBody PipelineItem details) {
        return pipelineItemRepository.findById(id)
                .map(item -> {
                    item.setClientName(details.getClientName());
                    item.setMissionTitle(details.getMissionTitle());
                    item.setStatus(details.getStatus());
                    item.setMatchScore(details.getMatchScore());
                    item.setPotentialRevenue(details.getPotentialRevenue());
                    item.setVelocity(details.getVelocity());
                    item.setConsultantId(details.getConsultantId());
                    item.setConsultantName(details.getConsultantName());
                    item.setConsultantTitle(details.getConsultantTitle());
                    item.setAvatarUrl(details.getAvatarUrl());
                    item.setDailyRate(details.getDailyRate());
                    item.setCurrency(details.getCurrency());
                    item.setInfo(details.getInfo());
                    item.setAiSuggested(details.getAiSuggested());
                    item.setOnBenchText(details.getOnBenchText());
                    return ResponseEntity.ok(pipelineItemRepository.save(item));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePipelineItem(@PathVariable Long id) {
        return pipelineItemRepository.findById(id)
                .map(item -> {
                    pipelineItemRepository.delete(item);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
