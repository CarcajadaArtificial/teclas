# ⌨️ Teclas

[![JSR](https://jsr.io/badges/@carcajada/teclas)](https://jsr.io/@carcajada/teclas)
[![JSR](https://jsr.io/badges/@carcajada/teclas/score)](https://jsr.io/@carcajada/teclas)

`` Hello ( ´ ω ` )ノﾞ `` Welcome to ⌨️ Teclas, here you can <ins>easily</ins> and <ins>precisely</ins> **handle keystrokes** on event listeners.

### Ideas behind this library

Handling keyboard events is a fairly common software requirement. When listening to keystrokes, one could handle them directly inline in the jsx code, this is unadvisable because HTML-like code is one of the least readables in my opinion. A better way would be to abstract the common keystroke event handlers and import them anywhere they're used. After this implementation one might want to add or change the existing keystrokes for extendibility and maintainability, this module is the result of exactly that.

### Usage

Let's say we want to handle complex keyboard interactions for this component:

```tsx
function example() {
  return <div tabIndex={0} onKeyUp={handleKeyUp}>Press keys inside this box</div>;
}
```

#### Before 

```tsx
function handleKeyUp(event) {
  const isMac = /Mac/.test(navigator.userAgent);

  if (event.key === 'Enter') {
    console.log('Enter key pressed');
  } else if (
    (event.ctrlKey || event.metaKey) &&
    event.key === 'Enter'
  ) {
    console.log('Control + Enter or Meta + Enter pressed');
  } else if (
    (event.ctrlKey || event.metaKey) &&
    event.shiftKey &&
    event.key === 'Enter'
  ) {
    console.log('Control + Shift + Enter or Meta + Shift + Enter pressed');
  }
}
```

#### After

```tsx
const handleKeyUp = handleKeyboard([
  {
    keys: [Key.Enter],
    cb: console.log('Enter key pressed')
  },
  {
    keys: [Key.mod1],
    cb: console.log('Control + Enter or Meta + Enter pressed'),
  },
  {
    keys: [Key.mod1, Key.Shift, Key.Enter],
    cb: console.log('Control + Shift + Enter or Meta + Shift + Enter pressed'),
  },
])
```

### Features

- Detects individual key presses (e.g., Enter, Escape, Shift, etc.).
- Handles different behavior for modifier keys on Windows and macOS.
- Supports complex keystroke combinations with optional exclusion of other keys.
- Provides utility functions to improve keyboard event handling and enhance user experience.

