import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageTitle} from "../../../_metronic/layout/core";
import Housings from "./Housings.tsx";

const HousingPage = () => (
    <Routes>
        <Route
            element={<Outlet/>}
        >
            <Route
                path='listing'
                element={
                    <>
                        <PageTitle>Housings</PageTitle>
                        <Housings/>
                    </>
                }
            />
            <Route index element={<Navigate to='/housing/listing'/>}/>
        </Route>
    </Routes>
)

export default HousingPage
