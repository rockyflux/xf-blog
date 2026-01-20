---
name: explaining-code
description: Explains code with visual diagrams and analogies. Use when explaining how code works, teaching about a codebase, or when the user asks "how does this work?"
---

When explaining code, always include:

1. **Start with an analogy**: Compare the code to something from everyday life
2. **Draw a diagram**: Use ASCII art to show the flow, structure, or relationships
3. **Walk through the code**: Explain step-by-step what happens
4. **Highlight a gotcha**: What's a common mistake or misconception?

Keep explanations conversational. For complex concepts, use multiple analogies.

## Example Structure

```
Code Function
    │
    ├── Input Processing
    │   ├── Validation ── Error Handling
    │   └── Transformation
    │
    ├── Core Logic
    │   ├── Algorithm A ── Optimization
    │   └── Algorithm B ── Fallback
    │
    └── Output
        ├── Formatting ── Success
        └── Logging ── Debug Info
```

## Common Patterns

**Factory Pattern** = Restaurant Kitchen
- Chef (factory) creates different dishes (objects) based on orders
- Each dish follows a recipe (interface) but implementation varies
- Customer gets finished dish without knowing cooking details

**Observer Pattern** = Newspaper Subscription
- Newspaper (subject) maintains subscriber list
- When new edition arrives, notifies all subscribers
- Subscribers receive updates automatically

## Gotchas to Watch For

- **Null pointer exceptions**: Like trying to open a door that doesn't exist
- **Race conditions**: Multiple cooks fighting over the same ingredient
- **Memory leaks**: Dirty dishes piling up in the sink
- **Off-by-one errors**: Recipe says "add 2 cups" but you add 3