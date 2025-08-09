import {useIntl} from 'react-intl'
import {PageTitle} from '../../_metronic/layout/core'
import {Toolbar} from '../../_metronic/layout/components/toolbar/Toolbar.tsx'
import {Content} from '../../_metronic/layout/components/Content.tsx'
import React, {FC} from "react";
import {motion} from "framer-motion";

const DashboardPage: FC = () => {
    return (
        <>
            <Toolbar/>
            <Content>
                <motion.div
                    className="row g-5 g-xl-8"
                    initial={{opacity: 0.1, y: -10, scale: 0.95}}
                    animate={{opacity: 1, y: 0, scale: 1}}
                    transition={{
                        duration: 0.3,
                        type: "spring",
                        stiffness: 150,
                        damping: 20,
                        ease: "easeInOut",
                        staggerChildren: 0.2,
                    }}
                >

                </motion.div>
            </Content>
        </>
    )
}

const DashboardWrapper: FC = () => {
    const intl = useIntl()
    return (
        <>
            <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
            <DashboardPage/>
        </>
    )
}

export {DashboardWrapper}
