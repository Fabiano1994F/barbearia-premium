"use client"

import * as React from "react"

type Toast = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactElement
  variant?: "default" | "destructive"
}

type State = {
  toasts: Toast[]
}

type Action =
  | { type: "ADD_TOAST"; toast: Toast }
  | { type: "DISMISS_TOAST"; toastId?: string }
  | { type: "REMOVE_TOAST"; toastId?: string }

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 5000

let count = 0
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

let memoryState: State = { toasts: [] }
const listeners: Array<(state: State) => void> = []

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "DISMISS_TOAST":
      return {
        toasts: state.toasts.filter(
          (t) => t.id !== action.toastId
        ),
      }

    case "REMOVE_TOAST":
      return {
        toasts: state.toasts.filter(
          (t) => t.id !== action.toastId
        ),
      }

    default:
      return state
  }
}

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => listener(memoryState))
}

function toast(props: Omit<Toast, "id">) {
  const id = genId()

  dispatch({
    type: "ADD_TOAST",
    toast: {
      id,
      ...props,
    },
  })

  setTimeout(() => {
    dispatch({ type: "REMOVE_TOAST", toastId: id })
  }, TOAST_REMOVE_DELAY)

  return {
    id,
    dismiss: () => dispatch({ type: "DISMISS_TOAST", toastId: id }),
  }
}

export function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) listeners.splice(index, 1)
    }
  }, [])

  return {
    toast,
    toasts: state.toasts,
  }
}
