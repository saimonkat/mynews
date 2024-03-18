const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: '2-digit', month: 'short', day: 'numeric' }
  const day = new Date(dateString)
  const dateFormat = new Intl.DateTimeFormat('en-GB', options)
  return dateFormat.format(day)
}

export default formatDate
