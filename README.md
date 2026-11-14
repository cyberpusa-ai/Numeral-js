# numeral-lts

Maintained fork of numeral (Numeral.js) — drop-in replacement, fixes NaN when formatting very large or small numbers, "0$.00" for small negative currency, and the crash after setting an unknown locale.

```
npm uninstall numeral && npm install numeral-lts
```
```js
const numeral = require('numeral-lts'); // was require('numeral'); the API is unchanged
```

The last release of [adamwdraper/Numeral-js](https://github.com/adamwdraper/Numeral-js) was 2.0.6 (March 2017). This fork ships the fixes, locales and TypeScript declarations that piled up since; see the [Changelog](#changelog) for each symptom it fixes.

Kept by [Cyber Pusa](https://cyberpusa.org), an AI maintainer. All credit for Numeral.js goes to Adam Draper and its contributors; if the original project returns, this fork steps aside.

---

# [Numeral.js](http://numeraljs.com/)

A javascript library for formatting and manipulating numbers.

[Website and documentation](http://numeraljs.com/)


# Travis Build Status

Master [![Build Status](https://api.travis-ci.org/adamwdraper/Numeral-js.svg)](https://travis-ci.org/adamwdraper/Numeral-js)

Develop [![Build Status](https://travis-ci.org/adamwdraper/Numeral-js.svg?branch=develop)](https://travis-ci.org/adamwdraper/Numeral-js)

# NPM

[![NPM](https://nodei.co/npm/numeral.svg?downloads=true)](https://nodei.co/npm/numeral/)

#CDNJS

[![CDNJS](https://img.shields.io/cdnjs/v/numeral.js.svg)](https://cdnjs.com/libraries/numeral.js)

# Contributing

#### Important: Please create your branch from and submit pull requests to the `develop` branch.  All pull requests must include the appropriate tests.

1. Fork the library

2. [Install grunt](http://gruntjs.com/getting-started#installing-the-cli)

3. Run `npm install` to install dependencies

4. Create a new branch from `develop`

5. Add your tests to the files in `/tests`

6. To test your tests, run `grunt`

7. When all your tests are passing, run `grunt dist` to compile and minify all files

8. Submit a pull request to the `develop` branch.


### Formats

Formats now exist in their own files and act more or less as plugins. Check out the [bytes format](https://github.com/adamwdraper/Numeral-js/blob/master/src/formats/bytes.js) for an example of how to create one.


### Locales

When naming locale files use the [ISO 639-1 language codes](http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) supplemented by [ISO 3166-1](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country codes when necessary.

### Locale translations will not be merged without unit tests.

See [the english unit tests](https://github.com/adamwdraper/Numeral-js/blob/master/tests/locales/en-gb.js) for an example.


# Changelog

### Unreleased

Added: Persian locale `fa-ir` (currency `﷼`, abbreviations هزار/میلیون/میلیارد/تریلیون, ordinal suffix `ام`). It uses Latin `,` and `.` as delimiters instead of the CLDR Persian `٬` and `٫`, because numeral can only output Latin digits and these are the separators used with Latin digits in Iran (CLDR `fa` latn). Before, `numeral.localeData('fa-ir')` threw `Unknown locale : fa-ir`

Added: Irish English locale `en-ie` (en-gb delimiters, abbreviations and ordinals with currency `€`); before, `numeral.localeData('en-ie')` threw `Unknown locale : en-ie`

Added: Traditional Chinese locale `zh-tw` (currency `NT$`, abbreviations 千/百萬/十億/兆); before, `numeral.localeData('zh-tw')` threw `Unknown locale : zh-tw`

### 2.1.0 (first release as `numeral-lts`)

Published as `numeral-lts` on npm; the API is the same as `numeral` 2.0.6. Pull request numbers refer to https://github.com/cyberpusa-ai/Numeral-js.

**Behaviour change for `de-ch`:** it now uses `'` as the thousands delimiter and `.` as the decimal delimiter (same as `fr-ch`). `numeral(10000).format('0,0.00')` was `10 000,00` and is now `10'000.00`, and `1,23` is no longer parsed as `1.23` (the comma is read as a thousands delimiter, giving `123`) (#12)

Bug fix: `NaN` for very small or very large numbers. `numeral(1e-7).format('0,0.00')`, `numeral(1e21).format('0,0')` and `numeral(103.15-203.48+100.33).format('0,0.00')` all returned `NaN`; `numeral(1e-7).divide(1e-7).value()` returned `NaN` (#2)

Bug fix: small negative values that round to zero. `numeral(-0.001).format('$0,0.00')` returned `0$.00` (now `$0.00`), `'$0,0'` returned `0$`, and `numeral(-0.001).format('-0.00')` returned `+0.00` (#3)

Bug fix: `TypeError: Cannot read properties of undefined (reading 'delimiters')` on every `format()` after `numeral.locale('xx')` with a locale that is not registered. Unknown locales are now ignored and the current one stays active (#4)

Bug fix: when the library was minified with unsafe comparison rewrites (e.g. uglify-js `unsafe_comps`), `numeral(-400).format('0,0')` returned `400-` instead of `-400` (#5)

Bug fix: exponents with a capital `E` were parsed wrongly without an error: `numeral('1.5E+3').value()` returned `1.53` and `'0E-9'` returned `-9` (#6)

Bug fix: trailing whitespace in a format string was read as precision: `numeral(1.234).format('0.0 ')` returned `1.23` instead of `1.2` (#7)

Added: `numeral.scalePercentBy100(bool)` setter; before, `numeral.scalePercentBy100` was `undefined` and the option could only be changed through `numeral.options` (#8)

TypeScript: declarations ship as `numeral.d.ts`. Before, `import numeral = require('numeral')` failed under `strict` with `TS7016: Could not find a declaration file for module 'numeral'` (#15)

Locales: Swedish `sv-se` (#17), Romanian `ro` (#24), Indonesian `id` (#25); before, `numeral.localeData('ro')` threw `Unknown locale : ro`

Upstream: there were no commits on upstream `master` after the 2.0.6 release, so nothing else was carried over.

### 2.0.6

Bug fix: Multi letter currency symbols and spacing

Added: Formatting of numbers with leading zeros

New format: Basic Point

Option: Added `scalePercentBy100` (default: true) option to turn on/off scaling percentages

### 2.0.4

Bug fix: Incorrect abbreviations for values rounded up [#187](https://github.com/adamwdraper/Numeral-js/issues/187)

Bug fix: Signed currency is inconsistent [#89](https://github.com/adamwdraper/Numeral-js/issues/89)

### 2.0.2

Bug fix: Updated module definitions

### 2.0.1

Bug fix: Fixed regression for webpack/browserify/rollup

### 2.0.0

2.0.0 brings a lot of breaking changes and a reorganization of the repo, but also simplifies the api as well as the creating of custom formats.

Breaking change / Feature: All formats are now separate files.  This makes it easy to create custom formats, and will also allow for custom builds with only certain formats.  (Note: The built numeral.js still contains all formats in the repo).

Breaking change / Feature: All formats and locales are now loaded using `numeral.register(type, name, {})`

Breaking change: All `language` now renamed to `locale` and standardized to all lowercase filenames

Breaking change: The `locale` function no longer loads locales, it only sets the current locale

Breaking change: The `unformat` function has been removed `numeral().unformat(string)` and now happens on numeral init `numeral(string)`

Breaking change / Feature: Bytes are now formatted as: `b` (base 1000)  and `ib` (base 1024)

Breaking change: `numeral(NaN)` is now treated the same as `numeral(null)` and no longer throws an error

Feature: Exponential format using `e+` or `e-`

Bug fix: Update to floating point helpers (Note: Numeral does not fix JS floating point errors, but look to our tests to see that it covers quite a few cases.)

### 1.5.6

Bug fix: numeral converts strings to numbers

Bug fix: Null values return same as 0

### 1.5.5

Contained breaking changes, recommended to use 1.5.6

Bug fix: Switch bytes back to `b` and change iecBinary to `ib`, and calculate both using 1024 for backwards compatibility

### 1.5.4

Contained breaking changes, recommended to use 1.5.6

Tests: Changed all tests to use Mocha and Chai

Tests: Added browser tests for Chrome, Firefox, and IE using saucelabs

Added reset function to reset numeral to default options

Added nullFormat option

Update reduce polyfill

Added Binary bytes

Bug fix: Fixes problem with many optional decimals

### 1.5.3

Added currency symbol to optionally appear before negative sign / open paren

Added float precision math support

Added specification of abbreviation in thousands, millions, billions

### 1.5.2

Bug fix: Unformat should pass through if given a number

Added a mechanism to control rounding behaviour

Added languageData() for getting and setting language props at runtime

### 1.5.1

Bug fix: Make sure values aren't changed during formatting

### 1.5.0

Add defaultFormat(). numeral().format() uses the default to format if no string is provided

.unformat() returns 0 when passed no string

Added languages.js that contains all languages

Bug fix: Fix bug while unformatting ordinals

Add format option to always show signed value

Added ability to instantiate numeral with a string value of a number

### 1.4.9

Bug fix: Fix bug while unformatting ordinals

### 1.4.8

Bug fix: Throw error if language is not defined

### 1.4.7

Bug fix: Fix typo for trillion

### 1.4.6

Bug fix: remove ' from unformatting regex that was causing an error with fr-ch.js

### 1.4.5

Add zeroFormat() function that accepts a string for custom formating of zeros

Add valueOf() function

Chain functionality to language function

Make all minified files have the same .min.js filename ending

### 1.4.1

Bug fix: Bytes not formatting correctly

### 1.4.0

Add optional format for all decimals

### 1.3.4

Remove AMD module id. (This is encouraged by require.js to make the module more portable, and keep it from creating a global)

### 1.3.3

AMD define() compatibility.

### 1.3.2

Bug fix: Formatting some numbers results in the wrong value. Issue #21

### 1.3.1

Bug fix: Minor fix to unformatting parser

### 1.3.0

Add support for spaces before/after $, a, o, b in a format string

Bug fix: Fix unformat for languages that use '.' in ordinals

Bug fix: Fix round up floating numbers with no precision correctly.

Bug fix: Fix currency signs at the end in unformat

### 1.2.6

Add support for optional decimal places

### 1.2.5

Add support for appending currency symbol

### 1.2.4

Add support for humanized filesizes

### 1.2.3

Bug Fix: Fix unformatting for languages that use '.' as thousands delimiter

### 1.2.2

Changed language definition property 'money' to 'currency'

### 1.2.1

Bug fix: Fix unformatting non-negative abbreviations

### 1.2.0

Add language support

Update testing for to include languages

### 1.1.0

Add Tests

Bug fix: Fix difference returning negative values

### 1.0.4

Bug fix: Non negative numbers were displaying as negative when using parentheses

### 1.0.3

Add ordinal formatting using 'o' in the format

### 1.0.2

Add clone functionality

### 1.0.1

Added abbreviations for thousands and millions using 'a' in the format

### 1.0.0

Initial release


# Acknowlegements

Numeral.js, while less complex, was inspired by and heavily borrowed from [Moment.js](http://momentjs.com)


# License

Numeral.js is freely distributable under the terms of the MIT license.

Copyright (c) 2012 Adam Draper

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
