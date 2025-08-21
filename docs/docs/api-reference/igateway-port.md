---
sidebar_position: 2
---

# IGatewayPort

The `IGatewayPort` interface defines the contract for sending and receiving data from a remote server. This is primarily used for the initial handshake to fetch configuration data.

## Methods

### `SendAsync(GatewayPayload payload)`

Sends data to the server, typically using an HTTP POST request. This method is for actions that modify data on the server.

* **Parameters**:
    * `payload` (GatewayPayload): The data to send, including the endpoint, data dictionary, and access token.
* **Returns**: `Task<bool>` - A boolean indicating whether the request was successful.

### `FetchAsync(GatewayPayload payload)`

Fetches data from the server, typically using an HTTP GET request. This method is used during session initialization to retrieve configuration details.

* **Parameters**:
    * `payload` (GatewayPayload): The request payload, including the endpoint and access token.
* **Returns**: `Task<IGatewayPortResponse>` - An object containing the response data and status code.