import {KTIcon} from "./KTIcon.tsx";

type FileItemProps = {
    file: File
    onDelete: (file: File) => void
    onOpen: (file: File) => void
    className?: string
    showFileTypes?: boolean
}

const FileObject = ({file, onDelete, onOpen, className, showFileTypes = false}: FileItemProps) => {
    const {name, size, type} = file

    const fileName = name.split('.').slice(0, -1).join('.')

    return (
        <div
            className={`d-flex align-items-center rounded-3 border border-gray-300 border- ${className}`}
        >
            <div
                onClick={() => onOpen(file)}
                className='d-flex align-items-center me-4 ms-3 my-2 cursor-pointer text-hover-primary'
            >
                <div className='symbol symbol-30px me-2'>
                    <span className='symbol-label bg-secondary'>
                        <KTIcon iconName='file' className='fs-2 text-dark'/>
                    </span>
                </div>
                <div className='mx-2 d-flex flex-column'>
          <span
              className='text-gray-800 fw-bold text-hover-primary'
              style={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: '1',
                  overflow: 'hidden',
              }}
          >
            {fileName}
          </span>
                    {showFileTypes && (
                        <span className='text-muted'>{`Type: ${name.split('.').pop()?.toLowerCase()}`}</span>
                    )}
                </div>
            </div>
            <button
                type='button'
                className='btn btn-icon btn-hover-scale my-2 me-3'
                onClick={() => onDelete(file)}
            >
                <KTIcon
                    iconName='trash'
                    className='fs-2 text-hover-danger hover-scale'
                />
                {''}
            </button>
        </div>
    )
}

export {FileObject}
