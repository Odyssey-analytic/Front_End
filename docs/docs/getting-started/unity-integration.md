---
sidebar_position: 1
---

# Unity Integration Guide

This guide provides a step-by-step walkthrough for integrating the Odyssey Analytics SDK into your Unity project.

## Step 1: Project Setup

1.  **Create a New Unity Project**: Open Unity Hub and create a new project, or open an existing one.
2.  **Set .NET Compatibility Level**:
    * Go to **Edit > Project Settings > Player**.
    * Under **Other Settings**, find **Api Compatibility Level**.
    * Select **.NET 4.x**.

## Step 2: Import the SDK

1.  **Download the SDK**: Get the latest release of the Odyssey Analytics SDK.
2.  **Add DLLs to Your Project**:
    * Create a `Plugins` folder in your `Assets` directory if you don't already have one.
    * Copy the following DLLs into `Assets/Plugins`:
        * `odysseyAnalytics.Core.dll`
        * `odysseyAnalytics.Adapters.Logger.dll`
        * `odysseyAnalytics.Adapters.REST.dll`
        * `odysseyAnalytics.Adapters.RabbitMQ.dll`
        * `odysseyAnalytics.Adapters.Sqlite.dll`
3.  **Create a `link.xml` File**:
    * In your `Assets` folder, create a file named `link.xml`.
    * Add the following to prevent code stripping:
        ```xml
        <linker>
            <assembly fullname="odysseyAnalytics.Core" preserve="all"/>
            <assembly fullname="odysseyAnalytics.Adapters.Logger" preserve="all"/>
            <assembly fullname="odysseyAnalytics.Adapters.REST" preserve="all"/>
            <assembly fullname="odysseyAnalytics.Adapters.RabbitMQ" preserve="all"/>
            <assembly fullname="odysseyAnalytics.Adapters.Sqlite" preserve="all"/>
        </linker>
        ```

## Step 3: Create the Bootstrapper

1.  **Create a C# Script**: In `Assets/Scripts`, create a new script named `Bootstrapper`.
2.  **Add the Following Code**: This script initializes the SDK and ensures it persists across scenes.

    ```csharp
    using UnityEngine;
    using odysseyAnalytics.Core.Application.Session;
    using odysseyAnalytics.Core.Ports;
    using odysseyAnalytics.Adapters.Logger;
    using odysseyAnalytics.Adapters.REST;
    using odysseyAnalytics.Adapters.RabbitMQ;
    using odysseyAnalytics.Adapters.Sqlite;

    public class Bootstrapper : MonoBehaviour
    {
        public static SessionHandler sessionHandler;

        void Awake()
        {
            DontDestroyOnLoad(gameObject);

            // Initialize adapters
            IGatewayPort gatewayPort = new RESTAdapter("YOUR_BASE_URL");
            IMessagePublisherPort messagePublisher = new RabbitMQAdapter();
            IConnectablePublisher connection = (IConnectablePublisher)messagePublisher;
            ILogger logger = new DefaultLogger();
            IDatabasePort databasePort = new SqliteAdapter(Application.persistentDataPath + "/analytics.db");

            // Initialize SessionHandler
            sessionHandler = new SessionHandler(gatewayPort, messagePublisher, connection, logger, databasePort, "YOUR_TOKEN");

            // Initialize the session
            sessionHandler.InitializeSessionAsync();
        }
    }
    ```

    **Note**: Replace `"YOUR_BASE_URL"` and `"YOUR_TOKEN"` with your actual API endpoint and token.

## Step 4: Track Events

You can now track events from any script in your project.

```csharp
// Example of starting a session
Bootstrapper.sessionHandler.StartSessionAsync("Unity");

// Example of sending a business event
Bootstrapper.sessionHandler.SendBusinessEventAsync("purchase", "gem_pack", "gp_100", 1, "USD");
```