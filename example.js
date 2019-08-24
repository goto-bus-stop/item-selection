import React from 'react'
import ReactDOM from 'react-dom'
import itemSelection from 'item-selection'

const lithuanianIslands = [
  'Bažnytėlė Island', 'Briedžiai Island', 'Jonava Neris Island',
  'Kiaulės Nugara', 'Kiemas Island', 'Kubiliai Island',
  'Nemunas Island', 'Ragininkai Island', 'Rusnė Island',
  'Pilis Island', 'Triušiai Island', 'Vytinė',
  'Žingelinė', 'Žvėrynas Neris Island'
]

function List ({ items }) {
  const [selection, updateSelection] = React.useState(() => itemSelection(items))

  function onMouseDown (index) {
    return (event) => {
      // these events map straight to the different itemSelection methods.
      // because the itemSelection is immutable, and all methods return new
      // instances, we can pass the new selection straight to setState and
      // rerender.
      if (event.shiftKey) {
        updateSelection((selection) => selection.selectRange(index))
      } else if (event.ctrlKey) {
        updateSelection((selection) => selection.selectToggle(index))
      } else {
        updateSelection((selection) => selection.select(index))
      }
      // prevent the browser from selecting a text range, too.
      event.preventDefault()
    }
  }

  function ListItem ({ island, index }) {
    // check if an item is selected using .isSelected(). .isSelected() uses // `===` to check if the given item is in the selection, so it might give a
    // false positive if your list contains the same string twice, for example.
    // you can also use .isSelectedIndex(i) in that case, because indices are
    // always unique.
    const selected = selection.isSelected(island)
    const className = `list-item ${selected ? 'is-selected' : ''}`
    return (
      <li
        className={className}
        onMouseDown={onMouseDown(index)}
      >
        {island}
      </li>
    )
  }

  // retrieve all selected items using .get(), or selected indices using .getIndices()
  const selectionString = selection.get().join(', ') || 'None! click some items below:'
  return (
    <div>
      <p>Selected: {selectionString}</p>
      <ul className='list'>
        {items.map((island, index) => <ListItem island={island} index={index} />)}
      </ul>
    </div>
  )
}

ReactDOM.render(
  <List items={lithuanianIslands} />,
  document.querySelector('#example')
)
