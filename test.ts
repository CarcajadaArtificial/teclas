//                                          _____       _
//                                         |_   _|__ __| |_
//                                           | |/ -_|_-<  _|
//                                           |_|\___/__/\__|
//
////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Welcome to the unit testing module. Some aspects of this library are strictly client-specific,
 * because of these, some functionalities must be mucked up, like user agents and keyboard events.
 *
 * @module
 */
import { assertEquals } from 'jsr:@std/assert';
import { isMacOS } from './mod.ts';
const originalNavigator = globalThis.navigator;

// =====================================================================================================
// isMacOS();
// =====================================================================================================
const mockUserAgent = (ua: string) => {
  Object.defineProperty(globalThis, 'navigator', {
    value: {
      userAgent: ua,
    },
    writable: true,
    configurable: true,
  });
};

const testCasesIsMacOS = [
  {
    name: 'returns true for Safari on macOS',
    ua:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15',
    expected: true,
  },
  {
    name: 'returns true for Chrome on macOS',
    ua:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
    expected: true,
  },
  {
    name: 'returns false for Windows 10 with Edge',
    ua:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246',
    expected: false,
  },
  {
    name: 'returns false for Android Device',
    ua:
      'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
    expected: false,
  },
  {
    name: 'returns false for iPhone',
    ua:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/19E241 Safari/604.1',
    expected: false,
  },
];

Deno.test('isMacOS function tests with sub-tests', async (t) => {
  for (const testCase of testCasesIsMacOS) {
    await t.step(testCase.name, () => {
      // Mock the navigator.userAgent
      mockUserAgent(testCase.ua);

      // Execute the function
      const result = isMacOS();

      // Assert the expected outcome
      assertEquals(
        result,
        testCase.expected,
        `Failed for test case: ${testCase.name}`,
      );

      // Restore the original navigator after each test case
      Object.defineProperty(globalThis, 'navigator', {
        value: originalNavigator,
        writable: true,
        configurable: true,
      });
    });
  }
});
