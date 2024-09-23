import { activeStyleOverride, defaultStyle, hoverStyleOverride } from '../options'
import { IGoogleStyles } from '../options/styles.ts'

export interface IUseSetGeoDataStylesOptions {
  keys?: string[]
  styles?: IGoogleStyles
}

export const useSetGeoDataStyles = () => {
  const setGeoDataStyles = (geoData: google.maps.Data, styleOptions?: IUseSetGeoDataStylesOptions) =>  {
    let defaultS = styleOptions?.styles?.defaultStyle || defaultStyle
    let hasActiveStyles = styleOptions?.styles?.activeStyleOverride || (styleOptions?.keys?.includes('active'))
    let hasHoverStyles = styleOptions?.styles?.hoverStyleOverride || (styleOptions?.keys?.includes('hover'))
    let activeStyles = styleOptions?.styles?.activeStyleOverride || (styleOptions?.keys?.includes('active') && activeStyleOverride)
    let hoverStyles = styleOptions?.styles?.hoverStyleOverride || (styleOptions?.keys?.includes('hover') && hoverStyleOverride)

    geoData.setStyle((feature) => ({
      ...defaultS,
      ...(hasActiveStyles && feature.getProperty('active') && (activeStyles) || {}),
      ...(hasHoverStyles && feature.getProperty('hover') && (hoverStyles) || {}),
    }))
  }

  return {
    setGeoDataStyles,
  }
}
