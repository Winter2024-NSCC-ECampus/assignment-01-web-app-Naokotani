# Stage 1: Build the application using Maven
FROM maven:3.9-eclipse-temurin-23 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven project files (pom.xml) to the container
COPY pom.xml .

# Download dependencies without the actual application files (useful for caching dependencies)
RUN mvn dependency:go-offline

# Copy the rest of the application code to the container
COPY src /app/src

# Build the application (this will create the JAR file)
RUN mvn clean package -DskipTests

# Stage 2: Create the runtime image
FROM eclipse-temurin:23
#
# Install OpenSSL to generate a secure JWT secret key
RUN apt-get update && apt-get install -y openssl

RUN mkdir -p /app
# Generate the JWT secret key and store it in a file
RUN openssl rand -base64 32 > /app/jwt-secret.key

# Copy the JAR file built in the previous stage
COPY --from=build /app/target/*.jar app.jar

# Set the entry point to run the JAR file
CMD ["java", "-jar", "app.jar"]
