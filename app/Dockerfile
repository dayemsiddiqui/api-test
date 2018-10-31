FROM alpine:3.7
# Set the working directory to /app
WORKDIR /app
# Copy the current directory contents into the container at /app
COPY . /app

# Install latest version of node
RUN apk add --update nodejs nodejs-npm

# Install any node dependencies
RUN cd frontend/
RUN npm install
# Install build client side server
RUN npm run build
RUN cd ..
# Install any node dependencies
RUN npm install
RUN npm run start


EXPOSE 8080