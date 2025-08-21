---
sidebar_position: 1
---

# Session Handler

The `SessionHandler` is the main entry point for interacting with the Odyssey Analytics SDK. It manages the entire lifecycle of an analytics session, from initialization to termination.

## Initialization

The `SessionHandler` is initialized in the `Bootstrapper` script when your game starts. This process involves:
* **Initializing Adapters**: The `SessionHandler` takes several adapters as dependencies, which handle logging, data storage, and network communication.
* **Fetching Configuration**: It communicates with your analytics server to fetch the necessary configuration, including the message broker credentials and a list of available queues.

## Session Lifecycle

* **`InitializeSessionAsync()`**: This method should be called once at the start of your game. It authenticates with the server, fetches the configuration, and connects to the message broker.
* **`StartSessionAsync(string platform)`**: Call this method to signal the start of a user session. It sends a `SessionStartEvent` to the server.
* **`EndSessionAsync()`**: Call this method when the user session ends (e.g., when the game is closed). It sends a `SessionEndEvent`.

## Event Tracking

The `SessionHandler` provides methods for tracking various types of events:
* **`SendBusinessEventAsync()`**: For tracking in-app purchases and other business-related events.
* **`SendErrorEventAsync()`**: For logging errors and exceptions.
* **`SendProgressionEventAsync()`**: For tracking player progression through levels or quests.
* **`SendQualityEventAsync()`**: For monitoring performance metrics like FPS and memory usage.
* **`SendResourceEventAsync()`**: For tracking changes in virtual currency or other in-game resources.