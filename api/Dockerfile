# Stage 1: Build the application using Maven
FROM maven:3.9-eclipse-temurin-23 AS build

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline

COPY src /app/src

RUN mvn clean package -DskipTests

FROM eclipse-temurin:23

RUN apt-get update && apt-get install -y openssl

RUN mkdir -p /app

RUN openssl rand -base64 32 > /app/jwt-secret.key

COPY --from=build /app/target/*.jar app.jar

CMD ["java", "-jar", "app.jar"]
