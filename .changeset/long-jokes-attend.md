---
"@allayjs/logger": minor
---

feat: add logger functionality to the application

- Add define_config.ts for defining logger configuration
- Add logger.ts for creating logger instances
- Add logger_manager.ts for managing multiple loggers
- Add pino.ts for creating pino logger instances
- Update index.ts to export new modules
- This feature allows the application to have robust logging capabilities.

feat(types.ts): add new types file for logger configuration and options

This commit introduces a new types.ts file that contains type definitions and interfaces for logger configuration and options. This will help in maintaining type safety and code readability.
