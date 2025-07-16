package com.example.Doc_EditorApplication.controllers;

import com.example.Doc_EditorApplication.models.Documents;
import com.example.Doc_EditorApplication.repository.DocumentRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class DocWebSocketController {

    private final DocumentRepo documentRepo;

    @MessageMapping("/edit/{id}")
    @SendTo("/topic/changes/{id}")
    public String handleEdit(@DestinationVariable Long id, String changeJson) {
        log.info("Saving and broadcasting change to document ID {}: {}", id, changeJson);

        Documents doc = documentRepo.findById(id).orElseThrow();
        doc.setContentJson(changeJson);
        documentRepo.save(doc);

        return changeJson;
    }
}
