# Changelog

## Roadmap

- Implement an `else` scenario for the `handleKeyboard()` function.
- Include unit testing for the module's functions. Compromises with mockups of
  certain functionalities must be done.
- Key secuence detection (e.g. Cmd+K then Cmd+C).
- Asynchronous callback support.
- Custom key aliases to the Key object.
- Event throttling/debouncing.
- Key hold detection.

## v1.0.8

- Changed `iKeystroke` to `Keystroke`.

## v1.0.7

- Added unit tests for the `isMacOS()` function.

## v1.0.6

- Added a fix to an explict return error.

## v1.0.5

- Added the type `CheckKeypress` to represent the function.
- Updated the module's documentation.
- Updated the project's README.

## v1.0.4

- Added a Readme file.

## v1.0.3

- Added a fix to an explict return error.

## v1.0.2

- Added the `Event` interface to prevent having dependencies.

## v1.0.1

- Renamed `main.ts` to `mod.ts`

## v1.0.0

- Migrated the functionality from the Lunchbox project.
- Added boilerplate Deno configuration.
- Added a `.gitignore`.
- Added a GitHub action for publishing to jsr.
