import { Feature, GeoJsonProperties } from 'geojson'
import { ref } from 'vue'

export const useSetGeoDataEvents = () => {
  const toggleActiveItem = (id: string | number, geoData: google.maps.Data, items: GeoJsonProperties[]) => {
    if (geoData) {
      const feature = geoData.getFeatureById(id)

      if (feature) {
        feature.setProperty('active', !feature.getProperty('active'))

        const listItem = items?.find((item: GeoJsonProperties) => id === item?.id)
        if (listItem) {
          listItem.active = feature.getProperty('active')
        }
      }
    }
  }

  const hover = ref()
  const toggleHoverItem = (id: string | number, geoData: google.maps.Data, items: GeoJsonProperties[], value: boolean = true) => {
    if (geoData) {
      const feature = geoData.getFeatureById(id)

      if (feature) {
        feature.setProperty('hover', value)
        const listItem = items?.find((item: GeoJsonProperties) => id === item?.id)

        if (listItem) {
          listItem.hover = value
          hover.value = listItem
        }
      }
    }
  }

  const setGeoDataListeners = (geoData: google.maps.Data, items: Feature[], events: string[] = ['click', 'hover']) => {
    const clickListener = events?.includes('click') && geoData.addListener('click', (event: any) => {
      const feature = event.feature
      if (feature) {
        const id = feature.getId()
        toggleActiveItem(id, geoData, items)
      }
    })

    const mouseOverListener = events?.includes('hover') && geoData.addListener('mouseover', (event: any) => {
      // geoData.revertStyle()
      const feature = event.feature
      if (feature) {
        const id = feature.getId()
        toggleHoverItem(id, geoData, items)
      }
    })

    const mouseOutListener = events?.includes('hover') && geoData.addListener('mouseout', (event: any) => {
      // geoData.revertStyle()
      const feature = event.feature
      if (feature) {
        const id = feature.getId()
        toggleHoverItem(id, geoData, items, false)
      }
    })

    const clearListeners = () => {
      google.maps.event.clearInstanceListeners(geoData)
    }

    return {
      clickListener,
      mouseOverListener,
      mouseOutListener,
      clearListeners,
    }
  }

  return {
    toggleActiveItem,
    hover,
    toggleHoverItem,
    setGeoDataListeners,
  }
}
