import { ButtonLink } from '../components/ButtonLink'
import { Postcard } from '../components/Postcard'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useI18n } from '../i18n/useI18n'

export function NotFoundPage(): React.JSX.Element {
  const { m } = useI18n()
  useDocumentMeta(m.meta.notFound)

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-8">
      <Postcard className="-rotate-2">
        <div className="halftone grid place-items-center bg-yellow px-6 py-10">
          <p aria-hidden className="display -rotate-3 text-[8rem] leading-[0.8] text-pink [text-shadow:5px_5px_0_var(--color-ink)]">
            ?
          </p>
        </div>
        <div className="px-5 py-5">
          <h1 className="display text-4xl">{m.notFound.title}</h1>
          <p className="mt-2 text-lg leading-snug">{m.notFound.body}</p>
        </div>
      </Postcard>
      <div className="flex flex-wrap justify-center gap-3">
        <ButtonLink to="/" variant="paper">
          {m.notFound.home}
        </ButtonLink>
        <ButtonLink to="/play" variant="pink">
          {m.notFound.play}
        </ButtonLink>
      </div>
    </div>
  )
}
