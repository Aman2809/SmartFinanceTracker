package com.project.backend.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class PredictionRequest {
    private String text;

    @JsonCreator
    public PredictionRequest(@JsonProperty("text") String text) {
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
