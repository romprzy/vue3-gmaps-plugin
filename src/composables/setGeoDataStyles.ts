import { activeStyleOverride, defaultStyle, hoverStyleOverride } from '../options'
import { IGoogleStyles } from '../options/styles.ts'

export interface IUseSetGeoDataStylesOptions {
  keys?: string[]
  styles?: IGoogleStyles
}

export const useSetGeoDataStyles = () => {
  const setGeoDataStyles = (geoData: google.maps.Data, styleOptions?: IUseSetGeoDataStylesOptions) =>  {
    let defaultS = { ...defaultStyle, ...(styleOptions?.styles?.defaultStyle || {}) }
    let hasActiveStyles = styleOptions?.styles?.activeStyleOverride || styleOptions?.keys?.includes('active')
    let hasHoverStyles = styleOptions?.styles?.hoverStyleOverride || styleOptions?.keys?.includes('hover')
    let activeStyles: google.maps.Data.StyleOptions = {
      ...activeStyleOverride,
      ...styleOptions?.styles?.activeStyleOverride,
      ...(styleOptions?.keys?.includes('active') && activeStyleOverride),
    }
    let hoverStyles: google.maps.Data.StyleOptions = {
      ...hoverStyleOverride,
      ...styleOptions?.styles?.hoverStyleOverride,
      ...(styleOptions?.keys?.includes('hover') && hoverStyleOverride),
    }

    geoData.setStyle((feature) => ({
      ...defaultS,
      ...(hasActiveStyles && feature.getProperty('active') && activeStyles || {}),
      ...(hasHoverStyles && feature.getProperty('hover') && hoverStyles || {}),
    }))
  }

  return {
    setGeoDataStyles,
  }
}
