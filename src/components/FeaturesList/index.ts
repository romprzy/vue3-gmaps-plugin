export interface IFeaturesListItemProps {
  id?: string | number
  name?: string
  iso?: string
  active?: boolean
  hover?: boolean
}
export interface IFeaturesListProps {
  items: IFeaturesListItemProps[]
}
