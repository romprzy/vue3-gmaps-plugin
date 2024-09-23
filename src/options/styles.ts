import { IGoogleStyle } from '../types'
export interface IGoogleStyles {
  defaultStyle?: google.maps.Data.StyleOptions
  activeStyleOverride?: google.maps.Data.StyleOptions
  hoverStyleOverride?: google.maps.Data.StyleOptions
  styles?: IGoogleStyle
}

export const defaultStyle: google.maps.Data.StyleOptions = {
  // clickable: true,
  strokeWeight: 1,
  strokeColor: 'rgba(255, 0, 0, .2)',
  fillOpacity: .05,
  fillColor: 'rgba(255, 0, 0, .35)',
  // label: 'ooo',
}

export const activeStyleOverride: google.maps.Data.StyleOptions = {
  strokeColor: 'rgba(0, 255, 0, .75)',
  fillOpacity: .5,
}

export const hoverStyleOverride: google.maps.Data.StyleOptions = {
  strokeWeight: 2,
  fillOpacity: .5,
  fillColor: 'blue',
}

export const styles: IGoogleStyles = {
  defaultStyle,
  activeStyleOverride,
  hoverStyleOverride,
}

export default styles
