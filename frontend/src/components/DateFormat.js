import dateformat from 'dateformat'
import React from 'react'

const DateFormat = ({ utc, type, text = '' }) => {
  var date = new Date(utc)
  var str = ''
  var strD = ''
  var strT = ''
  switch (type) {
    case 'date':
      str = dateformat(date, 'dS mmm, yyyy')
      return <>{str}</>
    case 'time':
      str = dateformat(date, 'h:MM TT')
      return <>{str}</>
    case 'date-time':
      strD = dateformat(date, 'dS mmm, yyyy')
      strT = dateformat(date, 'h:MM TT')
      return (
        <>
          <div>{strD}</div>
          <div>{strT}</div>
        </>
      )
    case 'date-time-sameline':
      strD = dateformat(date, 'dS mmm, yyyy') + ', '
      strT = dateformat(date, 'h:MM TT')

      return (
        <>
          <div>{text.concat(strD.concat(strT))}</div>
        </>
      )
    case 'date-time-sameline-text':
      strD = dateformat(date, 'dS mmm, yyyy') + ', '
      strT = dateformat(date, 'h:MM TT')

      return text.concat(strD.concat(strT))
    case 'date-time-short-sameline':
      strD = dateformat(date, 'dd/mm/yyyy') + ', '
      strT = dateformat(date, 'h:MM TT')

      return (
        <>
          <div>{strD.concat(strT)}</div>
        </>
      )

    case 'date-short':
      str = dateformat(date, 'dd/mm/yyyy')
      return <>{str}</>
    case 'date-stort-time':
      strD = dateformat(date, 'dd/mm/yyyy')
      strT = dateformat(date, 'h:MM TT')
      return (
        <>
          <div>{strD}</div>
          <div>{strT}</div>
        </>
      )
    default:
      return <></>
  }
}

export default DateFormat
