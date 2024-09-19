import { IGoogleStyle } from '../types'

export const defaultStyle: IGoogleStyle = {
  // clickable: true,
  strokeWeight: 1,
  strokeColor: 'rgba(255, 0, 0, .2)',
  fillOpacity: .05,
  fillColor: 'rgba(255, 0, 0, .35)',
  // label: 'ooo',
}

export const selectedStyleOverride: IGoogleStyle = {
  strokeColor: 'rgba(0, 255, 0, .75)',
  fillOpacity: .5,
}

export const hoverStyleOverride: IGoogleStyle = {
  strokeWeight: 2,
  fillOpacity: .5,
  fillColor: 'blue',
}

export const styles = {
  defaultStyle,
  selectedStyleOverride,
  hoverStyleOverride,
}

export default styles
