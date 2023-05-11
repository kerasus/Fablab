import moment from 'moment-jalaali'
moment.loadPersian()

const mixinDateOptions = {
  computed: {},
  methods: {
    convertToShamsi (date, mode) {
      if (mode === 'time') {
        return moment(date, 'HH:mm:ss').format('HH:mm:ss')
      } else if (mode === 'date') {
        return moment(date, 'YYYY-M-D').format('jYYYY/jMM/jDD')
      }
      return moment(date, 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss')
    },
    convertToShamsiWithFormat (date, format) {
      return moment(date, 'YYYY-M-D HH:mm:ss').format(format)
    }
  }
}

export default mixinDateOptions
