# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

IoT Sandbox (SmartConfig Studio) - An interactive IoT device configuration system for managing smart systems. Built with Angular 16, NgRx for state management, and Angular Material for UI components.

## Commands

```bash
npm install          # Install dependencies
npm start            # Start dev server at http://localhost:4200
npm run build        # Production build to dist/iot-sandbox
npm test             # Run Karma/Jasmine tests
npm run extract-i18n # Extract i18n strings to src/i18n
```

## Architecture

### Module Structure
- **AppModule** (`src/app/app.module.ts`) - Root module, configures NgRx store and effects
- **CoreModule** (`src/app/core/`) - Contains models, services, and NgRx store
- **SharedModule** (`src/app/shared/`) - Shared pipes (translate pipe) and components
- **SandboxModule** (`src/app/features/sandbox/`) - Main feature module, lazy-loadable

### State Management (NgRx)
The app uses NgRx with two state slices defined in `src/app/core/store/app.reducer.ts`:
- **DeviceState** - Manages device list, loading state, and errors. Actions handle CRUD, position updates, threshold changes, and simulation.
- **ConfigState** - Manages configuration metadata and persistence

Store structure:
```
src/app/core/store/
├── app.reducer.ts           # Root reducer combining slices
├── device/
│   ├── device.actions.ts    # Device action creators
│   ├── device.reducer.ts    # Device state reducer
│   ├── device.selectors.ts  # Device state selectors
│   └── device.effects.ts    # Device side effects
└── config/
    ├── config.actions.ts
    ├── config.reducer.ts
    ├── config.selectors.ts
    └── config.effects.ts
```

### Device System
Device types and templates are defined in `src/app/core/models/device.model.ts`:
- DeviceType enum: FAN, LIGHT_SENSOR, SMOKE_SENSOR, PUMP, BURNER, ULTRASONIC_SENSOR, LAMP, ENGINE, CONTACTOR
- Each device type has a template with maxCount limits (e.g., FAN max 2, BURNER max 1)
- Devices have thresholds (min/max or triggerValue) that control activation during simulation

### Internationalization
Custom i18n implementation in `src/app/core/services/i18n.service.ts`:
- Supports Russian (ru), English (en), Armenian (hy)
- Translations stored inline in the service, not in external JSON files
- Language preference persisted to localStorage under key `iot_sandbox_language`
- Use the `translate` pipe from SharedModule in templates

### Sandbox Feature Components
Located in `src/app/features/sandbox/components/`:
- **workspace** - Main drag-drop area for device placement
- **device-panel** - Available devices sidebar
- **device-card** - Individual device representation
- **device-settings-dialog** - Modal for device threshold configuration
- **simulation-panel** - Controls for simulating sensor values
- **config-form** - Configuration name/description form
- **template-selector** - Preset configuration templates (Greenhouse, Warehouse, Kitchen)

### Styling
- SCSS stylesheets (configured in angular.json schematics)
- Angular Material with indigo-pink prebuilt theme
- Component prefix: `app`
