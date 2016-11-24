/** @jsx element */
import { render, tree } from 'deku'
import element from 'virtual-element'
import itemSelection from 'item-selection'

const lithuanianIslands = [
  'Bažnytėlė Island', 'Briedžiai Island', 'Jonava Neris Island',
  'Kiaulės Nugara', 'Kiemas Island', 'Kubiliai Island',
  'Nemunas Island', 'Ragininkai Island', 'Rusnė Island',
  'Pilis Island', 'Triušiai Island', 'Vytinė',
  'Žingelinė', 'Žvėrynas Neris Island'
]

const List = {
  // initialise the selection. nothing is selected by default.
  initialState (props) {
    return {
      selection: itemSelection(props.items)
    }
  },
  render ({ props, state }, setState) {
    const selection = state.selection
    const onMouseDown = index => e => {
      // these events map straight to the different itemSelection methods.
      // because the itemSelection is immutable, and all methods return new
      // instances, we can pass the new selection straight to setState and
      // rerender.
      if (e.shiftKey) {
        setState({ selection: selection.selectRange(index) })
      } else if (e.ctrlKey) {
        setState({ selection: selection.selectToggle(index) })
      } else {
        setState({ selection: selection.select(index) })
      }
      // prevent the browser from selecting a text range, too.
      e.preventDefault()
    }
    return (
      <div>
        {/* retrieve all selected items using .get(), or selected indices using .getIndices(). */}
        <p>Selected: {selection.get().join(', ') || 'None! click some items below:'}</p>
        <ul class='list'>
          {props.items.map((island, i) => {
            // check if an item is selected using .isSelected(). .isSelected() uses
            // `===` to check if the given item is in the selection, so it might give a
            // false positive if your list contains the same string twice, for example.
            // you can also use .isSelectedIndex(i) in that case, because indices are
            // always unique.
            const selected = selection.isSelected(island)
            return (
              <li
                class={`list-item ${selected ? 'is-selected' : ''}`}
                onMouseDown={onMouseDown(i)}
              >
                {island}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

render(
  tree(<List items={lithuanianIslands} />),
  document.querySelector('#example')
)
