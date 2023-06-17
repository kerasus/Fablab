import Auth from 'src/api/models/Auth.js'
import User from 'src/api/models/User.js'
import Role from 'src/api/models/Role.js'
import Team from 'src/api/models/Team.js'
import Media from 'src/api/models/Media.js'
import Notice from 'src/api/models/Notice.js'
import Ticket from 'src/api/models/Ticket.js'
import Invoice from 'src/api/models/Invoice.js'
import Package from 'src/api/models/Package.js'
import Service from 'src/api/models/Service.js'
import Payment from 'src/api/models/Payment.js'
import Scenarios from 'src/api/models/Scenarios.js'
import PageSetting from 'src/api/models/PageSetting.js'
import MediaHashtag from 'src/api/models/MediaHashtag.js'
import MediaCategory from 'src/api/models/MediaCategory.js'
import TicketCategory from 'src/api/models/TicketCategory.js'

/* Exporting the APIGateway object. */
export const APIGateway = {
  auth: new Auth(),
  user: new User(),
  role: new Role(),
  team: new Team(),
  media: new Media(),
  notice: new Notice(),
  ticket: new Ticket(),
  invoice: new Invoice(),
  package: new Package(),
  service: new Service(),
  payment: new Payment(),
  scenarios: new Scenarios(),
  pageSetting: new PageSetting(),
  mediaHashtag: new MediaHashtag(),
  mediaCategory: new MediaCategory(),
  ticketCategory: new TicketCategory()
}
