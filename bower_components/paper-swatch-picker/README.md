
<!---

This README is automatically generated from the comments in these files:
paper-swatch-picker.html

Edit those files, and our readme bot will duplicate them over here!
Edit this file, and the bot will squash your changes :)

The bot does some handling of markdown. Please file a bug if it does the wrong
thing! https://github.com/PolymerLabs/tedium/issues

-->

[![Build status](https://travis-ci.org/PolymerElements/paper-swatch-picker.svg?branch=master)](https://travis-ci.org/PolymerElements/paper-swatch-picker)

_[Demo and API docs](https://elements.polymer-project.org/elements/paper-swatch-picker)_


## &lt;paper-swatch-picker&gt;

This is a simple color picker element that will allow you to choose one
of the Material Design colors from a list of available swatches.

Example:

```html
<paper-swatch-picker></paper-swatch-picker>

<paper-swatch-picker color="{{selectedColor}}"></paper-swatch-picker>
```

You can configure the color palette being used using the `colorList` array and
the `columnCount` property, which specifies how many "generic" colours (i.e. columns
in the picker) you want to display.

```html
<paper-swatch-picker column-count=5 color-list='["#65a5f2", "#83be54", "#f0d551", "#e5943c", "#a96ddb"]'></paper-swatch-picker>
```

### Styling

The following custom properties and mixins are available for styling:

| Custom property | Description | Default |
| --- | --- | --- |
| `--paper-swatch-picker-color-size` | The size of each of the color boxes | `20px` |
| `--paper-swatch-picker-icon-size` | The size of the color picker icon | `24px` |
| `--paper-swatch-picker-icon` | Mixin applied to the color picker icon | `{}` |


