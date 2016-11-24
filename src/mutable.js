import { ItemSelection } from './immutable'

class MutableItemSelection extends ItemSelection {
  set (selection, lastIndex) {
    this.selection = selection
    this.lastIndex = lastIndex
    return this
  }
}

export default function mutableItemSelection (items, selection, lastIndex) {
  return new MutableItemSelection(items, selection, lastIndex)
}

export { MutableItemSelection }
