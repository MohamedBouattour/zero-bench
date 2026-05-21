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
public class Consultant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String title;
    private String skills; // e.g. "React, Node.js, AWS"
    private Integer yoe; // Years of Experience
    private String benchStatus; // e.g. "Ends in 8 days", "Bench: 5d"
    private Double dailyRate;
    private String currency; // "EUR" or "TND"
    private String riskLevel; // "CRITICAL", "MEDIUM", "STABLE"
    private String avatarUrl;

    // Skill proficiency levels (1-5, or 0 for gap)
    private Integer reactProficiency;
    private Integer nodeProficiency;
    private Integer devopsProficiency;
    private Integer awsProficiency;
    private Integer symfonyProficiency;
    
    // Upskilling suggestion
    private String upskillingTarget; // e.g. "AWS Cloud Practitioner"
    private String upskillingImpact; // e.g. "+85% Placeability"
}
