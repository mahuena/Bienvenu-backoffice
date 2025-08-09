import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageTitle} from "../../../_metronic/layout/core";
import KeyPhrases from "./KeyPhrases.tsx";

const HousingPage = () => (
    <Routes>
        <Route
            element={<Outlet/>}
        >
            <Route
                path='listing'
                element={
                    <>
                        <PageTitle>Key Phrases</PageTitle>
                        <KeyPhrases/>
                    </>
                }
            />
            <Route index element={<Navigate to='/key-phrases/listing'/>}/>
        </Route>
    </Routes>
)

export default HousingPage
