---
sidebar_position: 5
---

# IDatabasePort

The `IDatabasePort` interface defines the contract for a local data storage solution. This is used for caching analytics events, ensuring data is not lost when the user is offline.

## Methods

### `Write<T>(string key, T value)`

Writes or updates an event in the local database.

* **Parameters**:
    * `key` (string): The unique key to associate with the event.
    * `value` (T where T : AnalyticsEvent): The event data to write.

### `Read<T>(string key)`

Reads a single event from the database using its key.

* **Parameters**:
    * `key` (string): The key of the event to retrieve.
* **Returns**: `T` - The event associated with the key, or `null` if not found.

### `ReadAll<T>()`

Reads all events of a given type from the database. This is used to retrieve cached events when the connection is re-established.

* **Returns**: `IEnumerable<T>` - A collection of all events of the specified type.

### `Delete<T>(string key)`

Deletes an event from the database, typically after it has been successfully sent to the server.

* **Parameters**:
    * `key` (string): The key of the event to delete.