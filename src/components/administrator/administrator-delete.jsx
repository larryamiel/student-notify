import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import React from 'react'

export default function AdministratorDelete({ open, toggle, onConfirm, onCancel }) {
  return (
    <Dialog size="xs" open={open} handler={toggle}>
      <DialogHeader>Delete Confimation</DialogHeader>

      <DialogBody>
        Are you sure you want to delete this administrator? This action cannot be undone.
      </DialogBody>

      <DialogFooter>
        <Button
          onClick={onCancel}
          variant="text"
          color="gray"
          className="mr-1"
        >
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
          color="red"
        >
          Delete
        </Button>
      </DialogFooter>
    </Dialog>
  )
};