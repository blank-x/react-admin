declare type TIcons = 'CodepenOutlined'
  | 'DribbbleOutlined'
  | 'HomeOutlined'


declare type IIcons = {
  [key in TIcons]:React.ReactNode
}

declare interface IRoutes {
  path?:string,
  component?:React.ReactNode,
  icon?: TIcons,
  exact?: boolean,
  title?:string,
  children?: IRoutes[],
  access?:number
}
