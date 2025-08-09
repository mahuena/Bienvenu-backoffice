import clsx from 'clsx'
import React from 'react'
import {useLayout} from '../../core'
import {DefaultTitle} from '../header/page-title/DefaultTitle'

const Toolbar1 = () => {
    const {classes} = useLayout()

    return (
        <>
            <div className='toolbar py-5 py-lg-15' id='kt_toolbar'>
                <div
                    id='kt_toolbar_container'
                    className={clsx(classes.toolbarContainer.join(' '), 'd-flex flex-stack')}
                >
                    <DefaultTitle/>
                </div>
            </div>
        </>
    )
}

export {Toolbar1}
