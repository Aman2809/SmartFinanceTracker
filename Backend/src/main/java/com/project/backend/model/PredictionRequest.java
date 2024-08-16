package com.project.backend.model;

public class PredictionRequest {
    private String text;

    public PredictionRequest(String text) {
        this.text = text;
    }

    // Getter and Setter
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
