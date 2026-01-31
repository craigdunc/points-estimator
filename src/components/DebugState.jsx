import React from 'react'
import { useSaveSlots } from '../state/useSaveSlots'

export default function DebugState() {
  const { slots, activeSlotId, current } = useSaveSlots()

  // Also read raw localStorage so you can compare
  const raw = localStorage.getItem('qff_save_slots')

  return (
    <div className="p-4 bg-gray-100 text-xs font-mono overflow-auto">
      <strong>Active Slot ID:</strong> {activeSlotId}
      <hr className="my-2" />
      <strong>Current State:</strong>
      <pre>{JSON.stringify(current, null, 2)}</pre>
      <hr className="my-2" />
      <strong>All Slots:</strong>
      <pre>{JSON.stringify(slots, null, 2)}</pre>
      <hr className="my-2" />
      <strong>Raw localStorage:</strong>
      <pre>{raw}</pre>
    </div>
  )
}