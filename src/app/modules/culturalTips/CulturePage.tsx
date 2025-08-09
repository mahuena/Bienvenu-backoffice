import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageTitle} from "../../../_metronic/layout/core";
import CulturalTips from "./CulturalTips.tsx";

const CulturalTipsPage = () => (
    <Routes>
        <Route element={<Outlet/>}>
            <Route
                path='listing'
                element={
                    <>
                        <PageTitle>Cultural Tips</PageTitle>
                        <CulturalTips/>
                    </>
                }
            />
            <Route index element={<Navigate to='/cultural-tips/listing'/>}/>
        </Route>
    </Routes>
)

export default CulturalTipsPage
