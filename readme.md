# item-selection

[![Greenkeeper badge](https://badges.greenkeeper.io/goto-bus-stop/item-selection.svg)](https://greenkeeper.io/)

Manage multi-`<select>` style selections in arrays.

## Usage

[Demo](https://goto-bus-stop.github.io/item-selection) - [Demo source code](./example.js)

```js
import itemSelection from 'item-selection'

const sourceList = [ 'a', 'b', 'c', 'd' ]

let selection = itemSelection(sourceList)

// Methods behave similarly to selection operations in a <select multiple>, or
// eg. your average file manager:

selection = selection.select(0) // like clicking
selection.get() // ['a']
selection = selection.selectRange(2) // like shift+clicking
selection.get() // ['a', 'b', 'c']
selection = selection.selectToggle(1) // like ctrl+clicking
selection.get() // ['a', 'c']
```

An `itemSelection` is immutable by default, i.e. it returns a new selection
object. Use `import itemSelection from 'item-selection/mutable'` if you want to
mutate the current selection object instead.

## API

### selection = itemSelection(sourceList)

Creates a new selection manager object.

**All mutation methods return a new selection manager object by default. If you
want to mutate and reuse the same object, use
`import itemSelection from 'item-selection/mutable'`.**

### selection = selection.select(index)

Creates a selection with _just_ the item at the given `index` selected. Akin to
clicking an item in a `<select multiple>` element.

If you want to _add_ an item to the selection, use [`selection.add(index)`](#selection--selection-addindex)
instead.

Also sets the initial range index to `index`.

### selection = selection.deselect(index)

Deselects the item at `index`.

### selection = selection.selectToggle(index)

Selects or deselects the item at `index`. Akin to Ctrl+clicking.

Also sets the initial range index to `index` if a new item was selected.
Otherwise, unsets the initial range index.

### selection = selection.selectRange(start, end)

Selects the given range. Inclusive. (NB: That's different from what Array.slice
does!)

### selection = selection.selectRange(index)

Selects a range based on the initial range index and the `index`. Akin to
Shift+clicking. Previously selected items that fall _outside_ the range will be
deselected.

If the initial range index was not set using `select(index)` or
`selectToggle(index)`, `selectRange` only selects the given index.

### selection = selection.selectAll()

Adds all items to the selection.

### selection = selection.add(index)

Adds the item at `index` to the selection.

Also sets the initial range index to `index`.

### selection = selection.remove(index)

Removes the item at `index` from the selection.

### selection = selection.clear()

Deselect all items.

### selectedItems = selection.get()

Get an array of the selected _items_.

### selectedIndices = selection.getIndices()

Get an array of the selected indices.

### selection = selection.set(indices)

Set a custom array of selected indices.

## Licence

[MIT](./LICENSE)
