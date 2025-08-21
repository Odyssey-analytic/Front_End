---
sidebar_position: 2
---

# REST Adapter

The `RESTAdapter` is the default implementation for handling communication with your analytics server. It uses a standard RESTful approach to send and receive data via HTTP requests.

## 📝 Overview

The `RESTAdapter` is responsible for the initial communication with the server to fetch the session configuration. It implements the `IGatewayPort` interface, which defines the methods for sending and fetching data from a remote server.

Key features of the `RESTAdapter` include:
* **Standard HTTP Communication**: Uses `HttpClient` to perform POST and GET requests.
* **JSON Serialization**: Automatically serializes and deserializes data to and from JSON format.
* **Authentication**: Supports passing an access token for authenticated requests.

## 🚀 Usage

The `RESTAdapter` is initialized in your `Bootstrapper` script. You must provide the base URL of your analytics server when creating an instance of the adapter.

## ⚙️ Methods

The `RESTAdapter` implements the following methods from the `IGatewayPort` interface:

### `SendAsync(GatewayPayload payload)`

Sends data to the server using an HTTP POST request. This is typically used for actions that modify data on the server.

* **Parameters**: `payload` (GatewayPayload) - The data to send, including the endpoint, data dictionary, and access token.
* **Returns**: `Task<bool>` - A boolean indicating whether the request was successful.

### `FetchAsync(GatewayPayload payload)`

Fetches data from the server using an HTTP GET request. This is used during session initialization to retrieve configuration details.

* **Parameters**: `payload` (GatewayPayload) - The request payload, including the endpoint and access token.
* **Returns**: `Task<IGatewayPortResponse>` - An object containing the response data and status code.

## 🛠️ Customization

You might need to create a custom gateway adapter if your server:
* Uses a different communication protocol (e.g., GraphQL, WebSockets).
* Requires custom headers for all requests.
* Has a unique authentication mechanism that isn't compatible with the default implementation.

To create a custom gateway adapter, you need to create a new class that implements the `IGatewayPort` interface. You would then update your `Bootstrapper` to use your custom adapter instead of the default `RESTAdapter`.