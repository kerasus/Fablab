import Auth from 'src/api/models/Auth.js'
import User from 'src/api/models/User.js'
import Role from 'src/api/models/Role.js'
import Post from 'src/api/models/Post.js'
import Team from 'src/api/models/Team.js'
import Media from 'src/api/models/Media.js'
import Event from 'src/api/models/Event.js'
import Notice from 'src/api/models/Notice.js'
import Ticket from 'src/api/models/Ticket.js'
import Wallet from 'src/api/models/Wallet.js'
import Basket from 'src/api/models/Basket.js'
import Invoice from 'src/api/models/Invoice.js'
import Package from 'src/api/models/Package.js'
import Service from 'src/api/models/Service.js'
import Payment from 'src/api/models/Payment.js'
import Product from 'src/api/models/Product.js'
import Scenarios from 'src/api/models/Scenarios.js'
import PageSetting from 'src/api/models/PageSetting.js'
import MediaHashtag from 'src/api/models/MediaHashtag.js'
import Registration from 'src/api/models/Registration.js'
import MediaCategory from 'src/api/models/MediaCategory.js'
import TicketCategory from 'src/api/models/TicketCategory.js'
import ProductCategory from 'src/api/models/ProductCategory.js'
import BasketRegistration from 'src/api/models/BasketRegistration.js'

/* Exporting the APIGateway object. */
export const APIGateway = {
  auth: new Auth(),
  user: new User(),
  role: new Role(),
  post: new Post(),
  team: new Team(),
  media: new Media(),
  event: new Event(),
  notice: new Notice(),
  ticket: new Ticket(),
  wallet: new Wallet(),
  basket: new Basket(),
  product: new Product(),
  invoice: new Invoice(),
  package: new Package(),
  service: new Service(),
  payment: new Payment(),
  scenarios: new Scenarios(),
  pageSetting: new PageSetting(),
  mediaHashtag: new MediaHashtag(),
  registration: new Registration(),
  mediaCategory: new MediaCategory(),
  ticketCategory: new TicketCategory(),
  productCategory: new ProductCategory(),
  basketRegistration: new BasketRegistration()
}
