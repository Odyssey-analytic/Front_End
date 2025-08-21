---
sidebar_position: 1
---

# DefaultLogger Adapter

The `DefaultLogger` is the out-of-the-box logging solution provided with the Odyssey Analytics SDK. It's a straightforward logger designed to output messages directly to the console, making it an invaluable tool for debugging your analytics integration within the Unity Editor and standalone builds.

## 📝 Overview

The `DefaultLogger` is built to be lightweight and easy to use, providing essential logging functionalities without requiring any complex setup. It implements the `ILogger` interface, ensuring that it can be seamlessly swapped with a custom logging solution if needed.

The key features of the `DefaultLogger` are:
* **Simplicity**: No configuration is required to start using it.
* **Platform Agnostic**: It works in both the Unity Editor and standalone builds by using `Debug.Log` for Unity environments and `Console.WriteLine` otherwise.
* **Essential Logging Levels**: It provides methods for logging informational messages, warnings, and errors.

## 🚀 Usage

The `DefaultLogger` is the default logging adapter and is initialized within the `Bootstrapper` script. To use it, you would create an instance of the `DefaultLogger` class and pass it to the `SessionHandler` constructor inside your `Bootstrapper.cs` file.

Once initialized, the SDK will use the `DefaultLogger` to output all internal logs, warnings, and errors, which will be visible in the Unity console.

## ⚙️ Methods

The `DefaultLogger` implements the following methods from the `ILogger` interface:

### `Log(string message)`

Logs a standard informational message. This is useful for tracking the flow of your analytics events and debugging your implementation.

* **Parameters**: `message` (string) - The informational message to log.

### `Warn(string message)`

Logs a warning message. This is intended for non-critical issues that you want to be aware of.

* **Parameters**: `message` (string) - The warning message to log.

### `Error(string message, Exception ex = null)`

Logs an error message. This should be used for critical issues that may prevent the SDK from functioning correctly. You can also pass an optional `Exception` object to include the stack trace in the log.

* **Parameters**:
    * `message` (string) - The error message to log.
    * `ex` (Exception) - The exception to include in the log (optional).

## 🛠️ Customization

While the `DefaultLogger` is sufficient for many use cases, you may want to implement your own custom logger to better suit your project's needs. For example, you might want to:

* Write logs to a file for persistent storage.
* Send logs to a third-party logging service like Sentry or Loggly.
* Filter logs based on their severity level to reduce noise in the console.
* Integrate with your game's existing logging system.

To create a custom logger, you need to create a new class that implements the `ILogger` interface and then use an instance of that class when initializing the `SessionHandler` in your `Bootstrapper` script.