import React from 'react'
import cn from 'classnames'

import * as styles from './Logo.css'

interface LogoSvgProps {
  name: string
  className?: string
}

const LogoSvg = ({ name, className }: LogoSvgProps) => {
  return (
    <div
      className={cn({
        [`${styles.logo}`]: true,
        [`${className}`]: className,
      })}
    >
      <img src={`../../../svg/${name}`} alt="" />
    </div>
  )
}

export default LogoSvg
