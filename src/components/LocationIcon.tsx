import {
  Beer,
  Dices,
  Disc3,
  FerrisWheel,
  Flower2,
  Heart,
  MapPin,
  Plane,
  ShoppingCart,
  UtensilsCrossed,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react'

const icons: Record<string, LucideIcon> = {
  spa: Flower2,
  casino: Dices,
  wedding: Heart,
  airplane: Plane,
  amusement: FerrisWheel,
  club: Disc3,
  pub: Beer,
  restaurant: UtensilsCrossed,
  supermarket: ShoppingCart,
  pin: MapPin,
}

type LocationIconProps = LucideProps & { name: string }

export function LocationIcon({ name, ...props }: LocationIconProps): React.JSX.Element {
  const Icon = icons[name] ?? MapPin
  return <Icon aria-hidden {...props} />
}
