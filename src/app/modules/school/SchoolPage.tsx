import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageTitle} from "../../../_metronic/layout/core";
import Schools from "./Schools.tsx";

const SchoolPage = () => (
    <Routes>
        <Route element={<Outlet/>}>
            <Route
                path='listing'
                element={
                    <>
                        <PageTitle>Schools</PageTitle>
                        <Schools/>
                    </>
                }
            />
            <Route index element={<Navigate to='/schools/listing'/>}/>
        </Route>
    </Routes>
)

export default SchoolPage
