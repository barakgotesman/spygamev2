import { useI18n } from '../i18n/useI18n'

/** The developer credit, printed like a postage stamp with a postmark over its corner. */
export function CreditStamp({ className = '' }: { className?: string }): React.JSX.Element {
  const { m } = useI18n()
  return (
    <div className={`flex justify-center ${className}`}>
      <div className="relative -rotate-2 rounded-sm border-[3px] border-dashed border-ink bg-paper px-4 py-2 text-center">
        <p className="print text-[0.65rem]">{m.footer.builtBy}</p>
        <a
          className="display text-lg underline decoration-[3px] decoration-pink underline-offset-4"
          href="https://www.linkedin.com/in/barak-gotesman-04424015b/"
          target="_blank"
          rel="noreferrer"
        >
          <bdi>{m.footer.author}</bdi>
        </a>
        <span
          aria-hidden
          dir="ltr"
          className="print absolute -end-5 -bottom-4 grid size-11 rotate-12 place-items-center rounded-full border-[3px] border-ink/50 text-[0.6rem] text-ink/60"
        >
          v1.0
        </span>
      </div>
    </div>
  )
}
