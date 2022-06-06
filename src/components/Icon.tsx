import React from 'react'
import classnames from 'classnames'
type PropType = {
  type: string
  className?: string
  onClick?: () => void
}

export default function Icon({type, className, onClick}: PropType) {
  return (
    <svg className={classnames('icon', className)} onClick={onClick}>
      <use xlinkHref={`#${type}`}></use>
    </svg>
  )
}
