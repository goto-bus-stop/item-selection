import itemSelection from './'
import test from 'ava'

const items = []
while (items.length < 20) items.push({ idx: items.length })

test('.select() should select a single item', t => {
  t.same(
    itemSelection(items)
      .select(5)
      .select(7)
      .get(),
      [ items[7] ]
  )
  t.end()
})

test('.select() should reset the selection', t => {
  t.same(
    itemSelection(items)
      .selectRange(3, 7)
      .select(11)
      .get(),
    [ items[11] ]
  )
  t.end()
})

test('.selectToggle() should select multiple items', t => {
  t.same(
    itemSelection(items)
      .selectToggle(5)
      .selectToggle(7)
      .get(),
    [ items[5], items[7] ]
  )
  t.end()
})

test('.selectToggle() should deselect a previously selected item', t => {
  t.same(
    itemSelection(items)
      .selectToggle(5)
      .selectToggle(8)
      .selectToggle(11)
      .selectToggle(5)
      .get(),
    [ items[8], items[11] ]
  )
  t.end()
})

test('.selectRange(start, end) should select an inclusive range', t => {
  t.same(
    itemSelection(items)
      .selectRange(3, 17)
      .get(),
    items.slice(3, 18)
  )
  t.end()
})

test('.selectRange(start, end) should select reverse ranges', t => {
  t.same(
    itemSelection(items)
      .selectRange(17, 3)
      .get(),
    items.slice(3, 18)
  )
  t.end()
})

test('.selectRange(index) should select a range based on a previous .select()', t => {
  t.same(
    itemSelection(items)
      .selectToggle(18)
      .select(3)
      .selectRange(12)
      .get(),
    items.slice(3, 13)
  )
  t.end()
})

test('.selectRange(index) should select a range based on a previous .selectToggle()', t => {
  t.same(
    itemSelection(items)
      .selectToggle(7)
      .selectRange(18)
      .get(),
    items.slice(7, 19)
  )
  t.end()
})

test('.selectRange() should reset the selection', t => {
  t.same(
    itemSelection(items)
      .select(1)
      .selectRange(11, 12)
      .get(),
    [ items[11], items[12] ]
  )
  t.end()
})

test('.selectRange() + .selectToggle()', t => {
  t.same(
    itemSelection(items)
      .select(1)
      .selectRange(3)
      .selectToggle(5)
      .get(),
    [ ...items.slice(1, 4), items[5] ]
  )
  t.end()
})

test('Deselecting an item should remove the range starting point', t => {
  t.same(
    itemSelection(items)
      .selectToggle(7)
      .selectToggle(7)
      .selectRange(0)
      .get(),
    [ items[0] ]
  )
  t.end()
})
