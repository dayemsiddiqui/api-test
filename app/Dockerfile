FROM alpine:3.7
# Set the working directory to /app
WORKDIR /app
# Copy the current directory contents into the container at /app
COPY . /app

# Install latest version of node
RUN apk add --update nodejs nodejs-npm

# Install any node dependencies on client
RUN cd frontend/ && npm install && npm run build

# Install any node dependencies for server 
RUN npm install


EXPOSE 8000

CMD [ "npm", "run", "start" ]