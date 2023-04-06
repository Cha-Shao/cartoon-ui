import React from "react";
import { SizeType } from '../types'
import classNames from 'classnames'
import './style.button.scss'

export interface ButtonProps {
  size?: SizeType
  primary?: boolean
  disabled?: boolean
  loading?: boolean
  round?: boolean
  icon?: any
  className?: string
  onClick?: any
  children?: React.ReactNode
}

/** 
 * Button
 * @param props
*/
const InternalButton: React.ForwardRefRenderFunction<unknown, ButtonProps> = (props: ButtonProps, ref) => {
  const {
    children = (<span></span>),
    primary,
    disabled,
    loading,
    round,
    icon
  } = props
  const buttonRef = (ref as any) || React.createRef<HTMLElement>()
  const buttonSize = React.useMemo(() =>
    props.size, [props.size]
  )

  const handleClick = (event: React.MouseEvent) => {
    if (props == null ? void 0 : props.onClick) {
      props == null ? void 0 : props.onClick(event)
    }
  }

  const iconNode = props.icon && !loading
    ? (<span className="ct-icon">{props.icon}</span>)
    : loading
      ? (<span className="ct-icon is-loading">load</span>)
      : null

  const className = classNames(
    "ct-button",
    buttonSize ? `ct-button--${buttonSize}` : '',
    {
      "is-primary": primary,
      "is-disabled": disabled,
      "is-loading": loading,
      "is-round": round
    }, props.className)

  return (
    <button
      ref={buttonRef}
      disabled={disabled || loading}
      className={className}
      onClick={handleClick}
    >
      {iconNode}
      {children}
    </button>
  )
}

const Button = React.forwardRef<unknown, ButtonProps>(InternalButton)

export default Button