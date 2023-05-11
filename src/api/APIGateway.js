import Auth from 'src/api/models/Auth.js'
import User from 'src/api/models/user.js'
import Scenarios from 'src/api/models/Scenarios.js'
import PageSetting from 'src/api/models/PageSetting.js'
import Role from 'src/api/models/Role.js'
import Event from 'src/api/models/Event.js'

/* Exporting the APIGateway object. */
export const APIGateway = {
  auth: new Auth(),
  user: new User(),
  role: new Role(),
  event: new Event(),
  scenarios: new Scenarios(),
  pageSetting: new PageSetting()
}
