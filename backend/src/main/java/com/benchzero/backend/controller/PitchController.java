package com.benchzero.backend.controller;

import com.benchzero.backend.model.Consultant;
import com.benchzero.backend.repository.ConsultantRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pitches")
@CrossOrigin(origins = "*")
public class PitchController {

    @Autowired
    private ConsultantRepository consultantRepository;

    @PostMapping("/generate")
    public ResponseEntity<PitchResponse> generatePitch(@RequestBody PitchRequest request) {
        if (request.getConsultantId() == null || request.getJobDescription() == null) {
            return ResponseEntity.badRequest().build();
        }

        return consultantRepository.findById(request.getConsultantId())
                .map(c -> {
                    PitchResponse response = computePitch(c, request.getJobDescription());
                    return ResponseEntity.ok(response);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    private PitchResponse computePitch(Consultant c, String jd) {
        String jdLower = jd.toLowerCase();
        
        // Analyze skills
        List<String> matchedSkills = new ArrayList<>();
        String[] skillsList = c.getSkills().split(",");
        for (String skill : skillsList) {
            String cleanSkill = skill.trim();
            if (jdLower.contains(cleanSkill.toLowerCase())) {
                matchedSkills.add(cleanSkill);
            }
        }

        // Base match score is influenced by YOE and matching skills
        int baseScore = 70 + (c.getYoe() > 5 ? 10 : 5);
        int matchCount = matchedSkills.size();
        int finalScore = Math.min(98, baseScore + (matchCount * 5));

        // Generate executive summary
        String summary = String.format(
            "%s is a highly pragmatic %s with %d years of experience driving successful technology implementations. " +
            "With a strong core background in %s, they bring immediate value and a proven track record to your squad. " +
            "Given their specific experience in %s, they are perfectly positioned to hit the ground running on the requirements in this mission.",
            c.getName(), c.getTitle(), c.getYoe(), c.getSkills(), 
            matchedSkills.isEmpty() ? "modern delivery practices" : String.join(" and ", matchedSkills)
        );

        // Generate alignments
        List<PitchResponse.Alignment> alignments = new ArrayList<>();
        
        // Standard alignments based on JD keywords or default values
        if (jdLower.contains("modern") || jdLower.contains("legacy") || jdLower.contains("migration")) {
            alignments.add(new PitchResponse.Alignment(
                "Modernization & Migration",
                "Proven capability to refactor complex applications and modernize systems, minimizing downtime and optimizing codebase maintainability."
            ));
        }
        
        if (jdLower.contains("cloud") || jdLower.contains("aws") || jdLower.contains("azure") || jdLower.contains("devops")) {
            alignments.add(new PitchResponse.Alignment(
                "Cloud & Infrastructure Automation",
                String.format("Hands-on cloud expertise including architecture design, resource scaling, and implementing infrastructure as code on platforms like %s.", 
                    c.getSkills().contains("AWS") ? "AWS" : "modern cloud environments")
            ));
        }

        if (jdLower.contains("agile") || jdLower.contains("team") || jdLower.contains("lead") || jdLower.contains("squad")) {
            alignments.add(new PitchResponse.Alignment(
                "Agile Delivery & Squad Collaboration",
                "Experienced collaborator in high-performance Agile sprints. Ready to act as a technical guide and collaborate seamlessly across product teams."
            ));
        }

        // Add a default skill alignment if none matched
        if (alignments.isEmpty()) {
            alignments.add(new PitchResponse.Alignment(
                "Core Professional Alignment",
                String.format("Demonstrates expert proficiency in %s, aligned with the core requirements of this client mission.", c.getSkills())
            ));
        } else if (matchedSkills.size() > 0) {
            alignments.add(new PitchResponse.Alignment(
                "Key Technology Fit: " + String.join(", ", matchedSkills),
                String.format("Direct alignment between the consultant's active skills and the core tech stack highlighted in the job description.")
            ));
        }

        return new PitchResponse(summary, alignments, finalScore);
    }

    // DTO classes
    public static class PitchRequest {
        private Long consultantId;
        private String jobDescription;

        public Long getConsultantId() { return consultantId; }
        public void setConsultantId(Long consultantId) { this.consultantId = consultantId; }

        public String getJobDescription() { return jobDescription; }
        public void setJobDescription(String jobDescription) { this.jobDescription = jobDescription; }
    }

    public static class PitchResponse {
        private String executiveSummary;
        private List<Alignment> keyAlignments;
        private int matchScore;

        public PitchResponse(String executiveSummary, List<Alignment> keyAlignments, int matchScore) {
            this.executiveSummary = executiveSummary;
            this.keyAlignments = keyAlignments;
            this.matchScore = matchScore;
        }

        public String getExecutiveSummary() { return executiveSummary; }
        public List<Alignment> getKeyAlignments() { return keyAlignments; }
        public int getMatchScore() { return matchScore; }

        public static class Alignment {
            private String requirement;
            private String explanation;

            public Alignment(String requirement, String explanation) {
                this.requirement = requirement;
                this.explanation = explanation;
            }

            public String getRequirement() { return requirement; }
            public String getExplanation() { return explanation; }
        }
    }
}
