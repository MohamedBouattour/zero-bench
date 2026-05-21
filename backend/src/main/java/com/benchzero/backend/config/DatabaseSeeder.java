package com.benchzero.backend.config;

import com.benchzero.backend.model.Consultant;
import com.benchzero.backend.model.PipelineItem;
import com.benchzero.backend.repository.ConsultantRepository;
import com.benchzero.backend.repository.PipelineItemRepository;
import java.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    private ConsultantRepository consultantRepository;

    @Autowired
    private PipelineItemRepository pipelineItemRepository;

    @Override
    public void run(String... args) throws Exception {
        seedConsultants();
        seedPipelineItems();
    }

    private void seedConsultants() {
        if (consultantRepository.count() > 0) {
            return;
        }

        Consultant c1 = new Consultant(null, "Amine K.", "Senior Java Developer", 
            "Java, Spring Boot, React, DevOps, AWS", 8, "Ends in 8 days", 650.0, "EUR", "CRITICAL",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDZ9DAidqYrmpKxqUc_bC79jp7qCeI8jZgrqS-Huk4EiM5DnPzonvdkyWAGWHjGzvds9oF4jfzredCPJFPCV2DqlDoL4wj246KZDa-i8bTllIebwf_MpLkdSPJO4r3MQMjE0gd4s2Dz_YqUzEAYAo3t4EKpWSMYfP8Jp0rGqwg0rBxaCfr337f-z6j_yoDowWeUtCX9eqYtfm9bKbK-Wmld04BYX3-lWpLKHRDS49OMMqcuTAFCKzfma_jhERwe_XAeQOjzg04YjSv1",
            3, 3, 2, 3, 0, null, null);

        Consultant c2 = new Consultant(null, "Sami B.", "DevOps Engineer", 
            "DevOps, AWS, K8s, Docker", 5, "Ends in 25 days", 700.0, "EUR", "MEDIUM",
            null, 0, 0, 4, 4, 0, null, null);

        Consultant c3 = new Consultant(null, "Fatma T.", "React Developer", 
            "React, Redux, Node.js", 3, "Ends in 45 days", 500.0, "EUR", "STABLE",
            null, 4, 2, 0, 1, 0, null, null);

        Consultant c4 = new Consultant(null, "Mehdi Z.", "Data Scientist", 
            "Python, AWS, PyTorch, SQL", 6, "Ends in 5 days", 750.0, "EUR", "CRITICAL",
            null, 1, 0, 1, 3, 0, null, null);

        Consultant c5 = new Consultant(null, "Amine Benali", "Fullstack Developer", 
            "React, Node.js, AWS", 6, "Bench: 14d", 600.0, "EUR", "CRITICAL",
            null, 5, 4, 0, 2, 0, "AWS Cloud Practitioner", "+85% Placeability");

        Consultant c6 = new Consultant(null, "Sarah Mansour", "DevOps Specialist", 
            "React, Node.js, DevOps, AWS", 7, "Ends in 5d", 720.0, "EUR", "CRITICAL",
            null, 2, 1, 5, 4, 0, "React Advanced", "+60% Placeability");

        Consultant c7 = new Consultant(null, "Jean Dupont", "Senior Java Dev", 
            "Java, Spring Boot, SQL", 10, "Ends in 12 days", 650.0, "EUR", "CRITICAL",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAxGSoYfWCYxrR7-rTwtQogXLit61CBwmS__j6g-i2rk64ZJVfJc7Swnmum_x1ln26NCZzps3QkEH9DhKzVZXlZ0P18e5eqc2NW16IX8kQb6BVNe4pmYHGlUiP3kYrJ_afCsMmOawfA1Ky1Lwn4H3-ATWZGTMR1a5kE6Qc_YOsTTvd4-aB-eyMjOMrJKfUSQbv9xxQQglwi15jVAiF4QLz5ZN6k-DBU4KC6YOG8epIfL7Zgr2r26Rge9eIwpxk_C6sZ7SLbnWx2x4D-",
            2, 1, 2, 2, 0, null, null);

        Consultant c8 = new Consultant(null, "Alice Martin", "Data Scientist", 
            "Python, Scala, Spark", 5, "Ends in 20 days", 800.0, "EUR", "MEDIUM",
            null, 0, 0, 0, 3, 0, null, null);

        Consultant c9 = new Consultant(null, "Marc Leroy", "DevOps Engineer", 
            "DevOps, AWS, Terraform", 5, "Bench: 5d", 720.0, "EUR", "CRITICAL",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAjrW6-EY-3jE4N_miCTcVUZ1jRM7U8AflGUvcAMPrN3rEHg6LXkIZF_tsVv2DoP6J9Yve8m6Nm54ElVexaYUPrZpKWAYQMVIZFGVua2ObaaV-cusPrg9utKkGHqL2zqoeaPPfYA6a65_yplAhRe-25vIYSwcpXg16s0kqgLY6rIZcz7Dt-N0X_dC_ZJMxeQhfmpJWu0ae-DkAJGuEDjboEqSQRlK4Yy4EeufTY9VoWCoxwVaBDtvIlrLTCuo05tJv9I3eENG0GrYWX",
            1, 0, 4, 4, 0, null, null);

        Consultant c10 = new Consultant(null, "Sophie Blanc", "UX/UI Designer", 
            "Figma, React, Tailwind", 4, "Available next week", 550.0, "EUR", "MEDIUM",
            null, 3, 0, 0, 0, 0, null, null);

        Consultant c11 = new Consultant(null, "Sarah Jenkins", "Senior Fullstack Developer", 
            "React, Node.js, AWS", 8, "Bench: 12 days", 680.0, "EUR", "CRITICAL",
            null, 4, 4, 1, 3, 0, null, null);

        Consultant c12 = new Consultant(null, "Marcus Chen", "Cloud Architect", 
            "AWS, Azure, K8s", 9, "Bench: 4 days", 850.0, "EUR", "CRITICAL",
            null, 0, 0, 5, 5, 0, null, null);

        Consultant c13 = new Consultant(null, "Elena Rodriguez", "Product Owner", 
            "Agile, Jira, Product Roadmap", 6, "Available next week", 650.0, "EUR", "MEDIUM",
            null, 0, 0, 0, 0, 0, null, null);

        consultantRepository.saveAll(Arrays.asList(c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13));
    }

    private void seedPipelineItems() {
        if (pipelineItemRepository.count() > 0) {
            return;
        }

        // We lookup some IDs to reference (Amine K = 1, Mehdi Z = 4, Jean Dupont = 7, Alice Martin = 8, Marc Leroy = 9, Sophie Blanc = 10)
        
        PipelineItem p1 = new PipelineItem(null, "TechCorp SA", "Senior Java Dev", "ENDING_SOON", 90, 29000.0, "Low",
            7L, "Jean Dupont", "Senior Java Dev",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAxGSoYfWCYxrR7-rTwtQogXLit61CBwmS__j6g-i2rk64ZJVfJc7Swnmum_x1ln26NCZzps3QkEH9DhKzVZXlZ0P18e5eqc2NW16IX8kQb6BVNe4pmYHGlUiP3kYrJ_afCsMmOawfA1Ky1Lwn4H3-ATWZGTMR1a5kE6Qc_YOsTTvd4-aB-eyMjOMrJKfUSQbv9xxQQglwi15jVAiF4QLz5ZN6k-DBU4KC6YOG8epIfL7Zgr2r26Rge9eIwpxk_C6sZ7SLbnWx2x4D-",
            650.0, "EUR", "Mission ends in 12 days", false, null);

        PipelineItem p2 = new PipelineItem(null, "FinBank", "Data Scientist", "ENDING_SOON", 85, 35000.0, "Med",
            8L, "Alice Martin", "Data Scientist", null,
            800.0, "EUR", "Mission ends in 20 days", false, null);

        PipelineItem p3 = new PipelineItem(null, "CloudSys Inc", "DevOps Engineer", "CV_SENT", 95, 14400.0, "High",
            9L, "Marc Leroy", "DevOps Engineer",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAjrW6-EY-3jE4N_miCTcVUZ1jRM7U8AflGUvcAMPrN3rEHg6LXkIZF_tsVv2DoP6J9Yve8m6Nm54ElVexaYUPrZpKWAYQMVIZFGVua2ObaaV-cusPrg9utKkGHqL2zqoeaPPfYA6a65_yplAhRe-25vIYSwcpXg16s0kqgLY6rIZcz7Dt-N0X_dC_ZJMxeQhfmpJWu0ae-DkAJGuEDjboEqSQRlK4Yy4EeufTY9VoWCoxwVaBDtvIlrLTCuo05tJv9I3eENG0GrYWX",
            720.0, "EUR", "Sent: Yesterday", true, "ON BENCH 5D");

        PipelineItem p4 = new PipelineItem(null, "RetailGroup", "UX/UI Designer", "INTERVIEW_SCHEDULED", 89, 11000.0, "High",
            10L, "Sophie Blanc", "UX/UI Designer", null,
            550.0, "EUR", "Oct 25, 14:00", false, null);

        pipelineItemRepository.saveAll(Arrays.asList(p1, p2, p3, p4));
    }
}
