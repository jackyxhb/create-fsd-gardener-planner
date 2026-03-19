import { Marker, Popup } from 'react-leaflet'
import type { Location } from '../model/types'

interface Props {
  location: Location
}

export function LocationPin({ location }: Props) {
  return (
    <Marker position={[location.lat, location.lng]}>
      <Popup>
        <strong>{location.name}</strong>
        {location.description && <p>{location.description}</p>}
      </Popup>
    </Marker>
  )
}
