import { atom } from 'jotai'

export const dashboardMenu = atom<boolean>(false)

export const blogFormPreview = atom<boolean>(false)

export const searchInputAtom = atom<string>('')

export const searchLoadingAtom = atom<boolean>(false)
