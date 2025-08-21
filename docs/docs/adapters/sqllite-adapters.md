---
sidebar_position: 4
---

# SQLite Adapter

The `SqliteAdapter` is the default implementation for local data storage in the Odyssey Analytics SDK. It utilizes SQLite, a lightweight, serverless, and self-contained SQL database engine, to cache analytics events on the user's device. This ensures that no data is lost, even if the device is offline when events are generated.

## 📝 Overview

The `SqliteAdapter` is responsible for all database operations, including creating the database, writing new events, reading cached events, and deleting events that have been successfully sent to the server. It implements the `IDatabasePort` interface, which defines the contract for a local data storage solution.

Key features include:
* **Persistent Caching**: Events are stored in a local SQLite database, so they are not lost if the application is closed.
* **Offline Support**: Allows your game to continue tracking events even without an internet connection.
* **Automatic Database Initialization**: The adapter automatically creates the database and the necessary tables if they don't already exist.

## 🚀 Usage

The `SqliteAdapter` is initialized in your `Bootstrapper` script. You must provide a path to the database file when creating an instance. It's recommended to use `Application.persistentDataPath` to ensure the database is stored in a writable location on all platforms.

## ⚙️ Methods

The `SqliteAdapter` implements the following methods from the `IDatabasePort` interface:

### `Write<T>(string key, T value)`

Writes an event to the database. If the event already has an ID, it will be updated; otherwise, a new record will be inserted.

* **Parameters**:
    * `key` (string) - The key to associate with the event (typically the event ID).
    * `value` (T) - The event to write.

### `Read<T>(string key)`

Reads a single event from the database based on its key.

* **Parameters**: `key` (string) - The key of the event to read.
* **Returns**: `T` - The event associated with the key, or `null` if not found.

### `ReadAll<T>()`

Reads all events of a given type from the database.

* **Returns**: `IEnumerable<T>` - A collection of all events of the specified type.

### `Delete<T>(string key)`

Deletes an event from the database.

* **Parameters**: `key` (string) - The key of the event to delete.

## 🛠️ Customization

While SQLite is a robust and reliable choice for local storage, you may want to create a custom database adapter in certain scenarios, such as:

* **Using a Different Database**: If your project already uses a different local database solution (e.g., Realm, LiteDB), you can create an adapter for it to avoid including multiple database libraries.
* **Simple File-Based Storage**: For very simple use cases, you might prefer to store cached events in a plain text or JSON file.
* **Encrypted Storage**: If you need to encrypt the cached data for security reasons, you can create a custom adapter that handles encryption and decryption.

To create a custom database adapter, you need to implement the `IDatabasePort` interface. You would then update your `Bootstrapper` to use your custom adapter instead of the default `SqliteAdapter`.