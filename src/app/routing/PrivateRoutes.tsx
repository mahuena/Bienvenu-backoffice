import {FC, lazy, Suspense} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import {DashboardWrapper} from '../dashboard/DashboardWrapper'

const PrivateRoutes = () => {
    const HousingPage = lazy(() => import('../modules/housing/HousingPage.tsx'))
    const SchoolPage = lazy(() => import('../modules/school/SchoolPage.tsx'))
    const CulturalTipsPage = lazy(() => import('../modules/culturalTips/CulturePage.tsx'))
    const KeyPhrasePage = lazy(() => import('../modules/keyPhrases/KeyPhrasePage.tsx'))

    return (
        <Routes>
            <Route element={<MasterLayout/>}>
                <Route path='auth/*' element={<Navigate to='/dashboard'/>}/>
                <Route path='dashboard' element={<DashboardWrapper/>}/>

                <Route
                    path='housing/*'
                    element={
                        <SuspensedView>
                            <HousingPage/>
                        </SuspensedView>
                    }
                />

                <Route
                    path='schools/*'
                    element={
                        <SuspensedView>
                            <SchoolPage/>
                        </SuspensedView>
                    }
                />

                <Route
                    path='cultural-tips/*'
                    element={
                        <SuspensedView>
                            <CulturalTipsPage/>
                        </SuspensedView>
                    }
                />

                <Route
                    path='key-phrases/*'
                    element={
                        <SuspensedView>
                            <KeyPhrasePage/>
                        </SuspensedView>
                    }
                />
                <Route path='*' element={<Navigate to='/error/404'/>}/>
            </Route>
        </Routes>
    )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
    const baseColor = getCSSVariableValue('--bs-primary')
    TopBarProgress.config({
        barColors: {
            '0': baseColor,
        },
        barThickness: 1,
        shadowBlur: 5,
    })
    return <Suspense fallback={<TopBarProgress/>}>{children}</Suspense>
}

export {PrivateRoutes}
