import { IWMGeoLabGeoBoundaries } from '@/types/'

export const prepareWMGeoLabGeoJson = (geoJson: IWMGeoLabGeoBoundaries) => {
  if (geoJson.type === 'FeatureCollection') {
    geoJson.features.forEach(feature => {
      if (feature.properties) {
        feature.id = feature.properties.shapeID
        feature.properties.id = feature.properties.shapeID
      }
    })

    return geoJson.features.map(({ properties }) => ({
      id: properties?.id,
      name: properties?.shapeName,
      iso: properties?.shapeISO,
      active: properties?.active,
      selected: properties?.selected,
    }))
  }
}
export const fitBounds = (map: google.maps.Map, geoData: google.maps.Data) => {
  const bounds = new google.maps.LatLngBounds()

  geoData.forEach((feature: google.maps.Data.Feature) => {
    feature.getGeometry()?.forEachLatLng((latLng: google.maps.LatLng) => {
      bounds.extend(latLng)
    })
  })

  map.fitBounds(bounds, 0)
}
