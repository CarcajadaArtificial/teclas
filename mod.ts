//                                    _____ ___ ___ _      _   ___
//                                   |_   _| __/ __| |    /_\ / __|
//                                     | | | _| (__| |__ / _ \\__ \
//                                     |_| |___\___|____/_/ \_\___/
//
////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * `` Hello ( ´ ω ` )ノﾞ `` Welcome to Teclas! This module allows you to easily and precisely handle
 * keystrokes on event listeners. Handling keyboard events is a common requirement in software
 * development, but managing them inline within JSX code can make the code less readable and harder to
 * maintain. Teclas provides an abstraction for common keystroke event handlers, enabling you to import
 * and reuse them anywhere in your application. This enhances extensibility and maintainability,
 * especially when you need to add or modify existing keystrokes. With Teclas, you can detect
 * individual key presses, handle different behaviors for modifier keys on Windows and macOS, and
 * support complex keystroke combinations with ease.
 *
 * @module
 */

// =====================================================================================================
// Global Functions
// =====================================================================================================
/**
 * Determines if the current operating system is macOS.
 *
 * This utility function checks the user agent string of the browser to identify if the user is running
 * macOS. This is particularly useful for handling `onkeydown` events where keyboard key differences
 * between Windows and macOS need to be taken into account.
 *
 * In keyboard event handling, the 'Control' key and 'Meta' key behave differently across operating
 * systems:
 * - On Windows: 'Control' is typically used for shortcuts.
 * - On macOS: 'Command' (Meta) is used in place of 'Control' for most shortcuts.
 *
 * @example
 * ```ts
 * const handleKeyDown = (event: Event) => {
 *   const isMac = isMacOS();
 *   if (event.key === 'Control' && !isMac) {
 *     // Handle Control key for Windows
 *   } else if (event.key === 'Meta' && isMac) {
 *     // Handle Command key for macOS
 *   }
 * };
 * ```
 *
 * @returns {boolean}
 *  True if the current OS is macOS, false otherwise.
 */
const isMacOS = (): boolean => /Mac/.test(globalThis.navigator.userAgent);

// =====================================================================================================
// Types
// =====================================================================================================
/**
 * Interface representing a keyboard event with a 'key' property.
 */
export interface Event {
  key: string;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * Interface representing a keystroke combination and its associated callback. Contains an array of
 * keys to be pressed, an array of keys to be excluded, and a callback function to be executed when the
 * keystroke combination is detected.
 */
export interface iKeystroke {
  keys: ((ev: Event) => boolean)[];
  except: ((ev: Event) => boolean)[];
  cb: (ev: Event) => void;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * Type alias for a function that takes an Event and returns a boolean.
 * Used to check if a certain keystroke condition is met.
 */
export type CheckKeypress = (ev: Event) => boolean;

// =====================================================================================================
// Exports
// =====================================================================================================
/**
 * Function to check if a given keystroke combination is detected. It verifies that all keys in the
 * `keys` array are pressed and all keys in the `except` array are not pressed.
 *
 * @param {iKeystroke} keystroke
 *  The keystroke combination to check.
 *
 * @param {Event} ev
 *  The keyboard event to evaluate.
 *
 * @returns {boolean}
 *  True if the keystroke combination is detected, false otherwise.
 */
export const checkKeystroke = (keystroke: iKeystroke, ev: Event): boolean =>
  keystroke.keys.reduce<boolean>(
    (accumulator, currentValue) => accumulator && currentValue(ev),
    true,
  ) && keystroke.except.reduce<boolean>(
    (accumulator, currentValue) => accumulator && !currentValue(ev),
    true,
  );

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * Function to handle keyboard events based on an array of keystroke combinations. It checks each
 * keystroke combination and executes the associated callback if the combination is detected.
 *
 * @param {iKeystroke[]} keystrokes
 *  An array of keystroke combinations to handle.
 *
 * @returns
 *  A function that processes keyboard events.
 */
export function handleKeyboard(keystrokes: iKeystroke[]): (ev: Event) => void {
  return (ev: Event) => {
    keystrokes.forEach((keystroke) => {
      if (checkKeystroke(keystroke, ev)) {
        keystroke.cb(ev);
      }
    });
  };
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * A utility object to easily check if certain keys are being pressed during `onkeydown` events. This
 * object provides methods to check for common special keys like Enter, Backspace, Shift, etc., and
 * also includes methods to handle modifier keys specific to different operating systems (Windows and
 * macOS).
 *
 * Each method takes an `Event` object and returns a boolean indicating whether the
 * corresponding key is being pressed.
 */
export const Key: Record<string, CheckKeypress> = {
  /** Checks if the Enter key is pressed. */
  Enter: (ev) => ev.key === 'Enter',

  /** Checks if the Backspace key is pressed. */
  Backspace: (ev) => ev.key === 'Backspace',

  /** Checks if the Shift key is pressed. */
  Shift: (ev) => ev.key === 'Shift',

  /** Checks if the Escape key is pressed. */
  Escape: (ev) => ev.key === 'Escape',

  /** Checks if the Tab key is pressed. */
  Tab: (ev) => ev.key === 'Tab',

  /** Checks if the Control key is pressed (Windows). */
  Control: (ev) => ev.key === 'Control',

  /** Checks if the Meta key is pressed (Windows). */
  Meta: (ev) => ev.key === 'Meta',

  /** Checks if the Alt key is pressed. */
  Alt: (ev) => ev.key === 'Alt',

  /** Checks if the Spacebar is pressed. */
  Spacebar: (ev) => ev.key === ' ',

  /** Checks if the Arrow Up key is pressed. */
  Up: (ev) => ev.key === 'ArrowUp',

  /** Checks if the Arrow Down key is pressed. */
  Down: (ev) => ev.key === 'ArrowDown',

  /** Checks if the Arrow Left key is pressed. */
  Left: (ev) => ev.key === 'ArrowLeft',

  /** Checks if the Arrow Right key is pressed. */
  Right: (ev) => ev.key === 'ArrowRight',

  /**
   * Checks if the Control key (Windows) is pressed.
   *
   * @see {@link isMacOS}
   */
  CtrlWin: (ev) => ev.key === 'Control' && !isMacOS(),

  /**
   * Checks if the Windows key is pressed.
   *
   * @see {@link isMacOS}
   */
  WindowsKey: (ev) => ev.key === 'Meta' && !isMacOS(),

  /**
   * Checks if the Control key (macOS) is pressed.
   *
   * @see {@link isMacOS}
   */
  CtrlMac: (ev) => ev.key === 'Control' && isMacOS(),

  /**
   * Checks if the Command key (macOS) is pressed.
   *
   * @see {@link isMacOS}
   */
  Command: (ev) => ev.key === 'Meta' && isMacOS(),

  /**
   * Checks if either Control (Windows) or Meta (macOS) key is pressed.
   *
   * @see {@link isMacOS}
   */
  mod1: (ev) =>
    (ev.key === 'Control' && !isMacOS()) || (ev.key === 'Meta' && isMacOS()),

  /**
   * Checks if either Control (macOS) or Meta (Windows) key is pressed.
   *
   * @see {@link isMacOS}
   */
  mod2: (ev) =>
    (ev.key === 'Control' && isMacOS()) || (ev.key === 'Meta' && !isMacOS()),
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Created by: Oscar Alfonso Guerrero - @CarcajadaArtificial
