import { useI18n } from '../i18n/useI18n'

export function Footer({ className = '' }: { className?: string }): React.JSX.Element {
  const { m } = useI18n()
  return (
    <footer className={`print pt-2 text-center text-xs ${className}`}>
      {m.footer.postedBy}{' '}
      <a
        className="underline decoration-2 underline-offset-4"
        href="https://www.linkedin.com/in/barak-gotesman-04424015b/"
        target="_blank"
        rel="noreferrer"
      >
        {m.footer.author}
      </a>
      {' · v1.0'}
    </footer>
  )
}
