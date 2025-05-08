## Description

PiSync is a lightweight service that helps PiBook and PiBox devices sync offline learning data (like videos watched, notes taken, assignments completed) to the cloud when internet connectivity is available. The goal is to make sure students can learn offline, and once they get internet access, all progress is safely synced without manual effort.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

# PiSync Backend

## Overview

The PiSync backend is a NestJS application designed to handle synchronization events from multiple devices. It provides RESTful APIs to manage and retrieve synchronization data.

## API Routes

### 1. **POST /api/sync-event**

- **Description**: Create a new synchronization event.
- **Request Body**:
  ```json
  {
    "device_id": "string",
    "timestamp": "2025-05-08T10:34:43.000Z", // ISO 8601 date string
    "total_files_synced": 100, // integer
    "total_errors": 0, // integer
    "internet_speed": 50 // integer, representing speed
  }
  ```

### 2. **GET /api/sync-event/device/:id/sync-history**

- **Description**: Retrieve the synchronization history for a specific device.
- **Parameters**:
  - `:id` - The ID of the device whose sync history you want to retrieve.

### 3. **GET /api/sync-event/devices/repeated-failures**

- **Description**: Get devices with repeated synchronization failures.

## Autocannon Test Results

The performance test using `autocannon` for the `/api/sync-event` endpoint over 30 seconds with 100 concurrent connections yielded the following results:

- **Average Requests per Second**: 11,566
- **Average Latency**: 8.09 ms
- **Total Requests**: 347,000
- **Non-2xx Responses**: 346,969

These results indicate that the endpoint is not currently handling requests successfully, as all responses were non-2xx.

## Optimization for 100k Devices

To optimize the system for handling 100,000 devices, consider the following strategies:

1. **Scalability**:

   - **Horizontal Scaling**: Deploy multiple instances of the application behind a load balancer to distribute the load.
   - **Database Optimization**: Use a distributed database system or sharding to handle large volumes of data efficiently.

2. **Performance**:

   - **Caching**: Implement caching strategies (e.g., Redis) to reduce database load and improve response times.
   - **Asynchronous Processing**: Use message queues (e.g., RabbitMQ, Kafka) for processing tasks asynchronously to improve throughput.

3. **Monitoring and Logging**:

   - **Real-time Monitoring**: Implement monitoring tools (e.g., Prometheus, Grafana) to track system performance and identify bottlenecks.
   - **Detailed Logging**: Use structured logging to capture detailed information about requests and errors for debugging and analysis.

4. **Code Optimization**:
   - **Efficient Algorithms**: Review and optimize algorithms for processing synchronization data.
   - **Reduce Latency**: Minimize network latency by optimizing API endpoints and reducing payload sizes.

By implementing these strategies, the system can be better equipped to handle the demands of 100,000 devices efficiently.

## Plans and Roadmap for Optimization and Scaling

### Current State

The PiSync backend is currently capable of handling a high number of requests per second, as demonstrated by the `autocannon` test results. However, this performance is achieved under conditions where the API is not loaded with heavy tasks. As the complexity and load of tasks increase, the current architecture may not sustain the same level of scalability.

### Roadmap for Optimization and Scaling

#### Short-term Goals

1. **Code Optimization**:

   - **Refactor Code**: Simplify and optimize existing code to improve performance.
   - **Reduce Payload Sizes**: Optimize API responses to minimize data transfer and improve latency.

2. **Database Optimization**:

   - **Indexing**: Ensure that database queries are optimized with proper indexing.
   - **Connection Pooling**: Configure database connection pooling to handle multiple concurrent connections efficiently.

3. **Caching**:
   - **Implement Caching**: Use Redis or similar caching solutions to store frequently accessed data and reduce database load.

#### Medium-term Goals

1. **Asynchronous Processing**:

   - **Message Queues**: Introduce message queues (e.g., RabbitMQ, Kafka) to handle background tasks and offload processing from the main application.

2. **Monitoring and Logging**:

   - **Implement Monitoring Tools**: Use tools like Prometheus and Grafana to monitor system performance and identify bottlenecks.
   - **Structured Logging**: Implement structured logging to capture detailed information about requests and errors for analysis.

3. **Load Testing**:
   - **Conduct Load Testing**: Regularly perform load testing to identify performance bottlenecks and optimize accordingly.

#### Long-term Goals

1. **Microservices Architecture**:

   - **Decompose into Microservices**: Transition to a microservices architecture to improve scalability and maintainability. Each service can be independently developed, deployed, and scaled.
   - **Service Discovery and Management**: Implement service discovery and management tools (e.g., Kubernetes) to orchestrate microservices.

2. **Horizontal Scaling**:

   - **Deploy Multiple Instances**: Use a load balancer to distribute traffic across multiple instances of the application.
   - **Cloud Infrastructure**: Leverage cloud infrastructure (e.g., AWS, Azure) for auto-scaling and resource management.

3. **Database Sharding**:

   - **Implement Sharding**: Distribute database load by sharding data across multiple database instances.

4. **API Gateway**:
   - **Introduce an API Gateway**: Use an API gateway to manage and route requests to different microservices, providing a single entry point for clients.

## Conclusion

By following this roadmap, the PiSync backend can be optimized and scaled to handle increased load and complexity, ensuring it remains performant and reliable as the number of devices and tasks grows. Transitioning to a microservices architecture and leveraging cloud infrastructure will be key to achieving long-term scalability and flexibility.
