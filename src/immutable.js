function range (start, end) {
  if (start > end) {
    [start, end] = [end, start]
  }

  const list = []
  for (let i = start; i < end; i++) {
    list.push(i)
  }
  return list
}

const includes = (arr, item) => arr.indexOf(item) !== -1

const cmp = (a, b) => {
  if (a > b) return 1
  if (a < b) return -1
  return 0
}

class ItemSelection {
  constructor (items, selection = [], lastIndex = null) {
    if (!Array.isArray(items)) {
      throw new TypeError('Expected an array')
    }
    this.items = items
    this.selection = selection
    this.lastIndex = lastIndex
  }

  getIndices () {
    return this.selection.slice().sort(cmp)
  }

  get () {
    return this.getIndices().map(index => this.items[index])
  }

  set (selection, lastIndex) {
    return new ItemSelection(this.items, selection, lastIndex)
  }

  isSelectedIndex (index) {
    return includes(this.selection, index)
  }

  isSelected (item) {
    return includes(this.get(), item)
  }

  clear () {
    return this.set([], null)
  }

  add (index) {
    return this.set([ ...this.selection, index ], this.lastIndex)
  }

  remove (index) {
    return this.set(this.selection.filter(idx => idx !== index), null)
  }

  select (index) {
    return this.set([ index ], index)
  }

  deselect (index) {
    return this.remove(index)
  }

  selectRange (index, end = null) {
    if (end !== null) {
      return this.set(range(index, end), null)
    }
    if (typeof this.lastIndex !== 'number') {
      return this.select(index)
    }
    return this.set(range(this.lastIndex, index), this.lastIndex)
  }

  selectToggle (index) {
    if (this.isSelectedIndex(index)) {
      return this.remove(index)
    }
    return this.set([ ...this.selection, index ], index)
  }

  selectAll () {
    return this.set(this.items.map((item, index) => index), null)
  }
}

export default function itemSelection (items, selection, lastIndex) {
  return new ItemSelection(items, selection, lastIndex)
}

export { ItemSelection }
