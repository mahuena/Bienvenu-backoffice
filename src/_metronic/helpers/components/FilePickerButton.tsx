import React, {useRef} from 'react'
import {KTSVG} from './KTSVG'

type FilePickerButtonProps = {
  onFilePicked: (file: File) => void
  onCanceled?: () => void
  className?: string
  accept?: string
  maxFileSize?: number
}

export const FilePickerButton = ({
  onFilePicked,
  onCanceled,
  className,
  accept = '.xls, .xlsx, .pdf, .doc, .docx',
  maxFileSize = 5,
}: FilePickerButtonProps) => {
  const fileInputRef = useRef(document.createElement('input'))

  const handleFilePicked = (event: any) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      const fileSize = file.size / 1024 / 1024
      if (fileSize > maxFileSize) {
        alert(`File size should not exceed ${maxFileSize} MB`)
        return
      }
      onFilePicked(file)
    } else {
      if (onCanceled) {
        onCanceled()
      }
    }
  }

  const handleClick = () => {
    fileInputRef.current.click()
  }

  return (
    <div className={`d-flex ${className}`}>
      <input
        type='file'
        accept={accept}
        ref={fileInputRef}
        onChange={handleFilePicked}
        hidden
        className='d-none'
      />
      <button
        type='button'
        className='btn btn-sm btn-icon btn-light-dark w-unset pe-4'
        onClick={handleClick}
      >
        <KTSVG path='/media/icons/duotune/files/fil005.svg' className='svg-icon-2 mx-3' />
        {'Add a file'}
      </button>
    </div>
  )
}
