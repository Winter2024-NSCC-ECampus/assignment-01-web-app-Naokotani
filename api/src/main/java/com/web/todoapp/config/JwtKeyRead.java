package com.web.todoapp.config;

import java.nio.file.Files;
import java.nio.file.Paths;

public class JwtKeyRead {
    private static final String SECRET_KEY_PATH = "/app/jwt-secret.key";

    public static String getSecretKey() {
        try {
            return new String(Files.readAllBytes(Paths.get(SECRET_KEY_PATH)));
        } catch (Exception e) {
            throw new RuntimeException(e + "Failed to get JWT key");
        }
    }
}
