const itemSelection = require('./').default
const test = require('tape')

const items = []
while (items.length < 20) items.push({ idx: items.length })

test('.select() should select a single item', t => {
  t.plan(1)
  t.deepEqual(
    itemSelection(items)
      .select(5)
      .select(7)
      .get(),
    [ items[7] ]
  )
})

test('.select() should reset the selection', t => {
  t.plan(1)
  t.deepEqual(
    itemSelection(items)
      .selectRange(3, 7)
      .select(11)
      .get(),
    [ items[11] ]
  )
})

test('.selectToggle() should select multiple items', t => {
  t.plan(1)
  t.deepEqual(
    itemSelection(items)
      .selectToggle(5)
      .selectToggle(7)
      .get(),
    [ items[5], items[7] ]
  )
})

test('.selectToggle() should deselect a previously selected item', t => {
  t.plan(1)
  t.deepEqual(
    itemSelection(items)
      .selectToggle(5)
      .selectToggle(8)
      .selectToggle(11)
      .selectToggle(5)
      .get(),
    [ items[8], items[11] ]
  )
})

test('.selectRange(start, end) should select an inclusive range', t => {
  t.plan(1)
  t.deepEqual(
    itemSelection(items)
      .selectRange(3, 17)
      .get(),
    items.slice(3, 18)
  )
})

test('.selectRange(start, end) should select reverse ranges', t => {
  t.plan(1)
  t.deepEqual(
    itemSelection(items)
      .selectRange(17, 3)
      .get(),
    items.slice(3, 18)
  )
})

test('.selectRange(index) should select a range based on a previous .select()', t => {
  t.plan(1)
  t.deepEqual(
    itemSelection(items)
      .selectToggle(18)
      .select(3)
      .selectRange(12)
      .get(),
    items.slice(3, 13)
  )
})

test('.selectRange(index) should select a range based on a previous .selectToggle()', t => {
  t.plan(1)
  t.deepEqual(
    itemSelection(items)
      .selectToggle(7)
      .selectRange(18)
      .get(),
    items.slice(7, 19)
  )
})

test('.selectRange() should reset the selection', t => {
  t.plan(1)
  t.deepEqual(
    itemSelection(items)
      .select(1)
      .selectRange(11, 12)
      .get(),
    [ items[11], items[12] ]
  )
})

test('.selectRange() + .selectToggle()', t => {
  t.plan(1)
  t.deepEqual(
    itemSelection(items)
      .select(1)
      .selectRange(3)
      .selectToggle(5)
      .get(),
    [ ...items.slice(1, 4), items[5] ]
  )
})

test('Deselecting an item should remove the range starting point', t => {
  t.plan(1)
  t.deepEqual(
    itemSelection(items)
      .selectToggle(7)
      .selectToggle(7)
      .selectRange(0)
      .get(),
    [ items[0] ]
  )
})
