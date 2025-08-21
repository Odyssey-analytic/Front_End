---
sidebar_position: 3
---

# Adapters Overview

The Odyssey Analytics SDK is designed with a flexible adapter-based architecture. This allows you to easily customize and extend the SDK's functionality to fit your project's specific needs.

## What Are Adapters?

Adapters are responsible for handling specific tasks within the SDK, such as logging, data storage, and network communication. The SDK provides default implementations for these adapters, but you can also create your own custom adapters.

## Core Adapters

The SDK uses the following core adapters:

* **Logger Adapter**: Handles logging of messages, warnings, and errors.
* **REST Adapter**: Manages communication with your analytics server via a RESTful API.
* **RabbitMQ Adapter**: Publishes analytics events to a RabbitMQ message broker.
* **SQLite Adapter**: Provides local data storage for caching events.

By default, the SDK is configured to use these adapters, but you can easily swap them out for your own custom implementations. See the **Adapters** section for more details on how to use and customize each adapter.