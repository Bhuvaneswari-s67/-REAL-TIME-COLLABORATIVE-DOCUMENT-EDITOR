package com.example.Doc_EditorApplication.repository;

import com.example.Doc_EditorApplication.models.Documents;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentRepo extends JpaRepository <Documents, Long> {


    }


