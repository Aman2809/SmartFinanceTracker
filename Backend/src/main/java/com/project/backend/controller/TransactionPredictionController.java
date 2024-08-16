package com.project.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.model.PredictionRequest;
import com.project.backend.model.PredictionResponse;
import com.project.backend.services.PythonService;

@RestController
@RequestMapping("/api/v1/predict")
public class TransactionPredictionController {

    private final PythonService pythonService;

    public TransactionPredictionController(PythonService pythonService) {
        this.pythonService = pythonService;
    }

    @PostMapping("/transaction")
    public ResponseEntity<PredictionResponse> predictTransaction(@RequestBody PredictionRequest request) {
        // Call the Python NLP model via the PythonService
        PredictionResponse response = pythonService.predictTransaction(request.getText());
        return ResponseEntity.ok(response);
    }
}
