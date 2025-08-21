---
sidebar_position: 1
---

# ILogger

The `ILogger` interface defines the contract for logging messages, warnings, and errors from the SDK. This allows you to create custom logging implementations that can integrate with your game's existing logging system or send logs to third-party services.

## Methods

### `Log(string message)`

Logs a standard informational message. This is useful for tracking the flow of your analytics events and for general debugging purposes.

* **Parameters**:
    * `message` (string): The informational message to log.

### `Warn(string message)`

Logs a warning message. This is intended for non-critical issues that you want to be aware of but that do not prevent the SDK from functioning.

* **Parameters**:
    * `message` (string): The warning message to log.

### `Error(string message, Exception ex = null)`

Logs an error message. This should be used for critical issues that may prevent the SDK from functioning correctly. You can also pass an optional `Exception` object to include the stack trace and other details in the log.

* **Parameters**:
    * `message` (string): The error message to log.
    * `ex` (Exception): The exception to include in the log (optional).