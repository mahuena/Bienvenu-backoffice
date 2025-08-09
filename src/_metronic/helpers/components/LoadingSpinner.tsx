// loading spinner factory
import React from 'react'

type Props = {
  loadingText: string,
  className?: string
}

export const LoadingSpinner = ({
                                 loadingText = 'Loading...',
                                 className = 'd-flex my-10 justify-content-center align-items-center w-100',
                               }: Props) => {
  return (
    <div className={`indicator-progress ${className}`}
         style={{display: 'block'}}>
      {loadingText && <span className="fs-3">{loadingText}</span>}
      <div className="spinner-border spinner-border-sm   align-middle"></div>
    </div>
  )
}