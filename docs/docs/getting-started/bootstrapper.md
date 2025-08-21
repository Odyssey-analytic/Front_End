---
sidebar_position: 2
---

# The Bootstrapper: Initializing the SDK

The Bootstrapper is the most critical component for integrating the Odyssey Analytics SDK into your Unity project. It acts as the central entry point that initializes, configures, and manages the lifecycle of the analytics session, ensuring that it's available throughout your entire game.

## 📝 Overview

In simple terms, the Bootstrapper is a Unity script attached to a persistent GameObject. Its primary responsibilities are:

* **Initialization on Startup**: It runs as soon as the game starts to set up the entire analytics system.
* **Adapter Configuration**: It's where you decide which adapters (for logging, networking, database, etc.) the SDK will use. You instantiate the default adapters or your custom ones here.
* **SessionHandler Creation**: It creates the main `SessionHandler` object, which is the core component you'll interact with to send events.
* **Persistence**: It ensures that the analytics system is not destroyed when you switch between different scenes in your game.

## 🛠️ How to Implement the Bootstrapper

Setting up the bootstrapper involves creating a GameObject in your first scene and attaching the initialization script to it.

1.  **Create an Empty GameObject**: In the first scene of your game (e.g., a splash screen or main menu), create a new empty GameObject and name it something descriptive, like `AnalyticsBootstrapper`.
2.  **Create the C# Script**: Create a new C# script, name it `Bootstrapper.cs`, and attach it to the `AnalyticsBootstrapper` GameObject.
3.  **Populate the Script**: The logic inside this script is where the SDK comes to life.

## ⚙️ The Initialization Process Explained

Inside the `Awake` method of your `Bootstrapper.cs` script, you'll perform a sequence of crucial steps:

1.  **Ensure Persistence**: The first thing you should do is call `DontDestroyOnLoad(gameObject)`. This Unity function prevents the `AnalyticsBootstrapper` GameObject from being destroyed when a new scene is loaded, making the SDK available globally.

2.  **Instantiate Adapters**: This is where you configure the SDK's behavior. You need to create an instance of each required adapter. For a standard setup, you would instantiate the default adapters provided by the SDK:
    * `RESTAdapter`: For communicating with your server's REST API. You must provide your server's base URL here.
    * `RabbitMQAdapter`: For sending event messages.
    * `SqliteAdapter`: For caching events locally when the user is offline. You should provide a path for the database file, typically using `Application.persistentDataPath`.
    * `DefaultLogger`: For printing SDK logs to the Unity console.

3.  **Create the SessionHandler**: Once all the adapters are instantiated, you create the central `SessionHandler` object. You pass all the adapter instances you just created, along with your project-specific authentication token, into its constructor. This links all the components together.

4.  **Initialize the Session**: With the `SessionHandler` created, you make an asynchronous call to its `InitializeSessionAsync()` method. This is the final step that kicks everything off. The `SessionHandler` will use the `RESTAdapter` to contact your server, authenticate using your token, and fetch the necessary configuration to connect to the message broker.

## 🚀 Utilizing the SDK from Other Scripts

Because the `Bootstrapper` makes the `SessionHandler` instance `public` and `static`, and because the `AnalyticsBootstrapper` GameObject persists across all scenes, you can easily access the SDK from anywhere in your game's code.

To send an event from any other script (e.g., a `PlayerController` or `GameManager`), you simply reference the static `sessionHandler` from the `Bootstrapper` class. For example, to track when a player starts a level, your code would look something like this:

`Bootstrapper.sessionHandler.SendProgressionEventAsync("Start", "Level1", "", "", 0);`

This clean, centralized approach makes integrating analytics into your game logic simple and maintainable.