import {useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../_metronic/helpers'

const AuthLayout = () => {
    useEffect(() => {
        document.body.style.backgroundImage = `none`
        const root = document.getElementById('root')
        if (root) {
            root.style.height = '100%'
        }
        return () => {
            document.body.style.backgroundImage = `url(${toAbsoluteUrl('media/patterns/header-bg.png')})`
            if (root) {
                root.style.height = 'auto'
            }
        }
    }, [])

    return (
        <div className='d-flex flex-column flex-lg-row flex-column-fluid'>
            {/* begin::Body */}
            <div className='d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1'>
                {/* begin::Form */}
                <div className='d-flex flex-center flex-column flex-lg-row-fluid'>
                    {/* begin::Wrapper */}
                    <div className='w-lg-500px p-10'>
                        <Outlet/>
                    </div>
                    {/* end::Wrapper */}
                </div>

            </div>

            <div
                className='d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2'
                style={{backgroundImage: `url(${toAbsoluteUrl('media/patterns/header-bg.png')})`}}
            >
                <div className='d-flex flex-column flex-center px-5 w-100 h-100 '>
                    <img
                        className='mx-auto w-300px'
                        src={toAbsoluteUrl('media/logos/logo.png')}
                        alt=''
                    />
                </div>
            </div>
        </div>
    )
}

export {AuthLayout}
