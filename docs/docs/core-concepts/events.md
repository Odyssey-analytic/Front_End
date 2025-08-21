---
sidebar_position: 2
---

# Events

The Odyssey Analytics SDK allows you to track a variety of events to get a comprehensive view of your game's performance and player behavior. All events inherit from the base `AnalyticsEvent` class.

## Event Types

### BusinessEvent

Used for tracking business-related events, such as in-app purchases.

* **Parameters**: `cartType`, `itemType`, `itemId`, `amount`, `currency`

### ErrorEvent

Used for logging errors and exceptions that occur in your game.

* **Parameters**: `severityLevel`, `message`

### ProgressionEvent

Used for tracking player progression.

* **Parameters**: `progressionStatus`, `progression01`, `progression02`, `progression03`, `value`

### QualityEvent

Used for tracking performance metrics.

* **Parameters**: `fps`, `memoryUsage`

### ResourceEvent

Used for tracking changes in in-game resources, like virtual currency.

* **Parameters**: `flowType`, `itemType`, `itemId`, `amount`, `resourceCurrency`

### SessionEndEvent

Automatically sent when a user's session ends.

### SessionStartEvent

Automatically sent when a user's session begins.

* **Parameters**: `platform`