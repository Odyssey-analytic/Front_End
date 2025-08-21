---
sidebar_position: 5
---

# Custom Adapters

The Odyssey Analytics SDK's adapter-based architecture makes it easy to extend and customize its functionality. You can create your own custom adapters to replace the default implementations for logging, network communication, and data storage.

## Why Create a Custom Adapter?

There are several reasons why you might want to create a custom adapter:

* **Integration with Existing Systems**: If your project already has a logging, networking, or database solution, you can create an adapter to integrate the SDK with your existing infrastructure.
* **Using Different Services**: You might want to use a different message broker than RabbitMQ, a different REST client, or a different local database than SQLite.
* **Adding Custom Functionality**: You can create custom adapters to add new features, such as data encryption, request retries with exponential backoff, or event batching.

## How to Create a Custom Adapter

The process for creating a custom adapter is straightforward:

1.  **Implement the Corresponding Interface**: Each adapter type has an interface that defines its contract. You'll need to create a new class that implements the appropriate interface.
    * **Logger**: `ILogger`
    * **Gateway**: `IGatewayPort`
    * **Message Publisher**: `IMessagePublisherPort` and `IConnectablePublisher`
    * **Database**: `IDatabasePort`

2.  **Implement the Required Methods**: Your custom adapter must implement all the methods defined in the interface.

3.  **Update the Bootstrapper**: In your `Bootstrapper.cs` script, replace the default adapter with an instance of your custom adapter when initializing the `SessionHandler`.

By leveraging the power of custom adapters, you can ensure that the Odyssey Analytics SDK fits perfectly into your project's architecture and meets all of your analytics needs.