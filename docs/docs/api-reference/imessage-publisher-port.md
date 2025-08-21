---
sidebar_position: 3
---

# IMessagePublisherPort

The `IMessagePublisherPort` interface defines the contract for publishing analytics events to a message broker. This is the primary interface for sending event data after the session has been initialized.

## Methods

### `PublishMessage<T>(T analyticsEvent)`

Publishes an analytics event to the message broker. The implementation should handle the serialization of the event and sending it to the correct queue or topic.

* **Parameters**:
    * `analyticsEvent` (T where T : AnalyticsEvent): The event to publish.
* **Returns**: `Task<T>` - The published event, allowing for potential modifications or confirmations from the publisher.