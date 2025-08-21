---
sidebar_position: 3
---

# RabbitMQ Adapter

The `RabbitMQAdapter` is the default implementation for publishing analytics events to a message broker. It is specifically designed to work with RabbitMQ, a widely-used open-source message broker that provides reliable and scalable message queuing.

## 📝 Overview

The `RabbitMQAdapter` is responsible for sending analytics events to the appropriate queues on your RabbitMQ server. It implements both the `IMessagePublisherPort` and `IConnectablePublisher` interfaces, which define the contracts for publishing messages and managing the connection to the broker.

Key features include:
* **Reliable Messaging**: Leverages RabbitMQ's robust messaging capabilities to ensure that your analytics events are delivered.
* **Asynchronous Publishing**: Publishes messages asynchronously to avoid blocking the main thread of your game.
* **Automatic Recovery**: The adapter is configured to automatically recover the connection if it's lost.

## 🚀 Usage

The `RabbitMQAdapter` is initialized in your `Bootstrapper` script. It does not require any parameters in its constructor, as the connection details are provided via the `ConnectAsync` method, which is called internally by the `SessionHandler`.

## ⚙️ Methods

The `RabbitMQAdapter` implements the following methods from the `IMessagePublisherPort` and `IConnectablePublisher` interfaces:

### `ConnectAsync(string host, string username, string password, string vhost = null, int port = 5672)`

Establishes a connection to the RabbitMQ server. This method is called by the `SessionHandler` after it fetches the connection details from your analytics server.

* **Parameters**:
    * `host` (string) - The hostname of the RabbitMQ server.
    * `username` (string) - The username for authentication.
    * `password` (string) - The password for authentication.
    * `vhost` (string) - The virtual host to connect to (optional).
    * `port` (int) - The port number (optional).

### `PublishMessage<T>(T analyticsEvent)`

Publishes an analytics event to the appropriate queue on the RabbitMQ server. The queue name is determined by the `QueueName` property of the `analyticsEvent`.

* **Parameters**: `analyticsEvent` (T) - The event to publish.
* **Returns**: `Task<T>` - The published event.

### `CloseAsync()`

Closes the connection to the message broker. This is typically called when the game is closed or the session ends.

## 🛠️ Customization

You might want to create a custom message publisher adapter if you are:

* Using a different message broker (e.g., Kafka, Azure Service Bus).
* Need to implement a custom message serialization format.
* Want to add custom logic to the message publishing process, such as batching events before sending them.

To create a custom message publisher, you'll need to implement both the `IMessagePublisherPort` and `IConnectablePublisher` interfaces and then update your `Bootstrapper` to use your custom adapter.