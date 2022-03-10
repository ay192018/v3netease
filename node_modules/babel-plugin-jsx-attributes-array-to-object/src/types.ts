import { PluginPass } from 'babel__core'

export interface PluginOptions {
  attributes?: string[]
}

export interface ConvertPluginPass extends PluginPass {
  opts: PluginOptions | undefined | false
}
