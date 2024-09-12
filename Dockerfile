# Use an official base image
FROM debian:bookworm-slim

# Set environment variables
ENV DEBIAN_FRONTEND=noninteractive

# Update and install required packages
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    software-properties-common \
    python3 \
    python3-pip \
    nodejs \
    npm \
    php-cli \
    g++ \
    golang \
    git \
    markdown \
    openjdk-17-jdk \
    && apt-get clean

# Set up Go environment
ENV GOPATH=/go
ENV PATH=$PATH:/usr/local/go/bin:$GOPATH/bin

# Set environment variables for Java
ENV JAVA_HOME="/usr/lib/jvm/java-17-openjdk-amd64"
ENV PATH="$JAVA_HOME/bin:${PATH}"

# Install Python packages
RUN pip3 install --break-system-packages markdown

# Create a working directory
WORKDIR /app

# Copy the application code into the container
COPY . /app

# Install application dependencies
RUN npm install

# Build the Next.js application
RUN npm run build

# Expose port for the application
EXPOSE 3000

# Debug information
RUN java -version && javac -version && ls -la /usr/lib/jvm

# Default command to run the application
CMD ["npm", "start"]
