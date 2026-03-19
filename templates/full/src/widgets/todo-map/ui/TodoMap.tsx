import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { LocationPin } from '@entities/location'
import { useTodoStore } from '@entities/todo'
import type { Location } from '@entities/location'

// Leaflet default icon fix for Vite/webpack bundlers
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
})

// Stub locations until real API exists
const STUB_LOCATIONS: Location[] = [
  { id: '1', name: 'Vegetable Bed A', lat: 51.505, lng: -0.09 },
  { id: '2', name: 'Herb Garden', lat: 51.51, lng: -0.1 },
]

interface Props {
  className?: string
}

export function TodoMap({ className }: Props) {
  useTodoStore((s) => s.selectedId)

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={16}
      className={className}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {STUB_LOCATIONS.map((loc) => (
        <LocationPin key={loc.id} location={loc} />
      ))}
    </MapContainer>
  )
}
