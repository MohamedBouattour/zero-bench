package com.benchzero.backend.repository;

import com.benchzero.backend.model.PipelineItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PipelineItemRepository extends JpaRepository<PipelineItem, Long> {
}
