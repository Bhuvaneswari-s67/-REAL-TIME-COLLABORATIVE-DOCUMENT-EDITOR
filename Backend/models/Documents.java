package com.example.Doc_EditorApplication.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@Table(name = "documents")
@NoArgsConstructor
@AllArgsConstructor
public class Documents {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String title;

        @Lob
        @Column(columnDefinition = "TEXT")
        private String contentJson;

        private boolean favourite;
}
