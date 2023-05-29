import type { RootStore } from "../../store"

export function formSelector(state: RootStore) {
    return state.form
}