import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson'

export type IWMGeoLabGeoBoundariesProperties = GeoJsonProperties & {
  shapeName: string
  shapeISO: string
  shapeID: string
  shapeGroup: string
  shapeType: string
}

export type IWMGeoLabGeoFeature<G extends Geometry | null = Geometry, P = IWMGeoLabGeoBoundariesProperties> = Exclude<Feature<G, P>, null>

export type IWMGeoLabGeoBoundaries = FeatureCollection & {
  type: 'FeatureCollection';
  features: Array<IWMGeoLabGeoFeature>;
}
