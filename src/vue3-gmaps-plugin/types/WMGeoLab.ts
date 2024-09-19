import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson'

export type IWMGeoLabGeoBoundariesProperties = GeoJsonProperties & {
  shapeName: string
  shapeISO: string
  shapeID: string
  shapeGroup: string
  shapeType: string
}

export type IWMGeoLabGeoBoundaries<G extends Geometry | null = Geometry, P = IWMGeoLabGeoBoundariesProperties> = FeatureCollection & {
  type: 'FeatureCollection';
  features: Array<Exclude<Feature<G, P>, null>>;
}
