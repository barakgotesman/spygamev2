import { useEffect } from 'react'

type DocumentMeta = { title: string; description: string }

/** Sets the tab title and meta description for the current page (the app is client-rendered). */
export function useDocumentMeta({ title, description }: DocumentMeta): void {
  useEffect(() => {
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}
