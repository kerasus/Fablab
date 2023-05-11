import APIRepository from '../classes/APIRepository'
import { appApiInstance } from 'src/boot/axios'

export default class AttributeAPI extends APIRepository {
  constructor() {
    super('attribute', appApiInstance, '/admin/user')
    this.APIAddresses = {
      management: '/admin/user',
      value: '/admin/user'
    }
  }
}
