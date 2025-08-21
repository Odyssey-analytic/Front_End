---
sidebar_position: 4
---

# IConnectablePublisher

The `IConnectablePublisher` interface defines the contract for managing the connection to a message broker. It is typically implemented by the same class that implements `IMessagePublisherPort`.

## Methods

### `ConnectAsync(string host, string username, string password, string vhost = null, int port = 5672)`

Establishes a connection to the message broker using the provided credentials. This is called by the `SessionHandler` during initialization.

* **Parameters**:
    * `host` (string): The hostname of the message broker.
    * `username` (string): The username for authentication.
    * `password` (string): The password for authentication.
    * `vhost` (string): The virtual host to connect to (optional).
    * `port` (int): The port number (optional).

### `CloseAsync()`

Closes the connection to the message broker. This should be called when the session ends to release resources.