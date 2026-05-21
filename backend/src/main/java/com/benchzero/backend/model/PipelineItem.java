package com.benchzero.backend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PipelineItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String clientName;
    private String missionTitle;
    private String status; // "ENDING_SOON", "CV_SENT", "INTERVIEW_SCHEDULED", "NEGOTIATION"
    private Integer matchScore;
    private Double potentialRevenue;
    private String velocity; // "Low", "Med", "High"
    
    // Consultant info
    private Long consultantId;
    private String consultantName;
    private String consultantTitle;
    private String avatarUrl;
    
    private Double dailyRate;
    private String currency; // "EUR", "TND"
    private String info; // e.g. "Mission ends in 12 days" or "Sent: Yesterday"
    
    private Boolean aiSuggested; // Is this suggestion AI highlighted?
    private String onBenchText; // e.g. "ON BENCH 5D"
}
