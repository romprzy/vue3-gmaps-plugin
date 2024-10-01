import MapOptions = google.maps.MapOptions

export type { Vue3GmapsPluginOptions } from './Vue3GmapsPluginOptions'
export type { IWMGeoLabGeoBoundariesProperties, IWMGeoLabGeoBoundaries, IWMGeoLabGeoFeature } from './WMGeoLab'

export interface IMapOptions extends Omit<MapOptions, 'zoom'> {
  center: google.maps.LatLng | google.maps.LatLngLiteral
  zoom: number
}

export type IGoogleStyle = google.maps.Data.StylingFunction | google.maps.Data.StyleOptions | null
