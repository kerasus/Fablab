import { ServiceList } from 'src/models/Service.js'
import { PackageList } from 'src/models/Package.js'

export function packages (state) {
  return new PackageList(state.packages)
}

export function services (state) {
  return new ServiceList(state.services)
}
