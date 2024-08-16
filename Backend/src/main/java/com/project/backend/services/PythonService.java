package com.project.backend.services;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.project.backend.model.PredictionRequest;
import com.project.backend.model.PredictionResponse;

import org.springframework.http.ResponseEntity;

@Service
public class PythonService {

    private final RestTemplate restTemplate;

    public PythonService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public PredictionResponse predictTransaction(String text) {
        // Define the URL of the Python NLP model
        String url = "http://localhost:5000/predict";

        // Create a request object
        PredictionRequest request = new PredictionRequest(text);

        // Send a POST request to the Python model and get the response
        ResponseEntity<PredictionResponse> responseEntity =
            restTemplate.postForEntity(url, request, PredictionResponse.class);

        // Return the response body
        return responseEntity.getBody();
    }
}
