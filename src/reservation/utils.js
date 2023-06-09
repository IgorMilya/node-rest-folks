import dayjs from 'dayjs'

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
  const today = dayjs().startOf('day')

  return reservations.filter(({ booking }) => {
    const bookingDate = dayjs.unix(booking)

    return bookingDate.isSame(today, 'day')
  })
}
