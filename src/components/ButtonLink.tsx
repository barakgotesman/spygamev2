import { Link, type LinkProps } from 'react-router'
import { buttonStyles } from './Button'

type ButtonLinkProps = LinkProps & { variant?: 'pink' | 'ink' | 'paper' | 'ghost' }

/** A router link that looks like a `Button`, for calls to action that navigate. */
export function ButtonLink({ variant = 'paper', className = '', ...props }: ButtonLinkProps): React.JSX.Element {
  return <Link className={buttonStyles(variant, className)} {...props} />
}
