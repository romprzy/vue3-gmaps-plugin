import MapOptions = google.maps.MapOptions

export interface IMapOptions extends Omit<MapOptions, 'zoom'> {
  center: google.maps.LatLng | google.maps.LatLngLiteral
  zoom: number
}
