package com.example.Doc_EditorApplication.controllers;

import com.example.Doc_EditorApplication.models.Documents;
import com.example.Doc_EditorApplication.repository.DocumentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class DocController {

        private final DocumentRepo documentRepo;

        @GetMapping
        public List<Documents> getAllDocuments() {
            return documentRepo.findAll();
        }

        @GetMapping("/{id}")
         public ResponseEntity<Documents> getDocumentById(@PathVariable Long id) {
          return documentRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
        }


    @PostMapping
        public Documents createDocument(@RequestBody Documents documents) {
            return documentRepo.save(documents);
        }

    @PutMapping("/{id}")
    public ResponseEntity<Documents> updateDocument(@PathVariable Long id, @RequestBody Documents updatedDoc) {
        return documentRepo.findById(id).map(doc -> {
            doc.setTitle(updatedDoc.getTitle());
            doc.setContentJson(updatedDoc.getContentJson());
            doc.setFavourite(updatedDoc.isFavourite());
            Documents saved = documentRepo.save(doc);
            return ResponseEntity.ok(saved);
        }).orElse(ResponseEntity.notFound().build());
    }


    @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteDocument(@PathVariable Long id) {
            if (documentRepo.existsById(id)) {
                documentRepo.deleteById(id);
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.notFound().build();
        }
    }


