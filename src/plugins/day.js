import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(advancedFormat)

dayjs.locale('ja')

export default ({ app }, inject) => {
  inject('dayjs', (string) => dayjs(string))
}
