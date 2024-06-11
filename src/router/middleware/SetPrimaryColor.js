import { setCssVar } from 'quasar'

export default function setPrimaryColor(color) {
  return ({ next }) => {
    if (typeof window !== 'undefined') {
      setCssVar('primary', color)
    }
    // setCssVar('secondary', '#26A69A');
    // setCssVar('accent', '#9C27B0');
    // setCssVar('dark', '#1d1d1d');
    // setCssVar('positive', '#21BA45');
    // setCssVar('negative', '#C10015');
    // setCssVar('info', '#31CCEC');
    // setCssVar('warning', '#F2C037');
    return next()
  }
}
