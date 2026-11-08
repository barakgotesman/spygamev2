export function Footer({ className = '' }: { className?: string }): React.JSX.Element {
  return (
    <footer className={`print pt-2 text-center text-xs ${className}`}>
      Printed by{' '}
      <a
        className="underline decoration-2 underline-offset-4"
        href="https://www.linkedin.com/in/barak-gotesman-04424015b/"
        target="_blank"
        rel="noreferrer"
      >
        Barak Gotesman
      </a>
      {' · v1.0'}
    </footer>
  )
}
