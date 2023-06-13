import dayjs from 'dayjs'
import { _logFunc } from 'nodemailer/lib/shared/index.js'

const convertToTimestamp = (date, time) => {
  const datetimeString = `${date} ${time}`

  return dayjs(datetimeString, 'YYYY-MM-DD HH:mm').unix()
}

export const prepareReservationInfo = reservation => {
  const { date, time, ...rest } = reservation
  const booking = convertToTimestamp(date, time)

  return { ...rest, booking }
}

export const getTodayReservations = reservations => {
  const day = dayjs().startOf('day')

  return reservations.filter(({ booking }) => {
    const bookingDate = dayjs.unix(booking)

    return bookingDate.isSame(day, 'day')
  })
}

export const getReservationsByDate = (reservations, date) => {
  const day = dayjs(date).startOf('day').format('YYYY-MM-DD')

  return reservations.filter(({ booking }) => {
    const bookingDate = dayjs.unix(booking).startOf('day').format('YYYY-MM-DD')

    return bookingDate === day
  })
}
