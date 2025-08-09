import React, {FC} from "react";
import {KTIcon} from "./components/KTIcon.tsx";

type ChartContentProps = {
    className: string
    title: string
    subtitle: string
    loadingData: boolean
    chartRef: React.RefObject<HTMLDivElement>;
    toolBar: React.ReactNode;
    chartHeight?: string;
    headerClassName?: string;
}

export const ChartContent: FC<ChartContentProps> = ({
                                                        chartRef,
                                                        className,
                                                        loadingData,
                                                        subtitle,
                                                        title,
                                                        chartHeight = 'auto',
                                                        headerClassName,
                                                        toolBar = <button
                                                            type='button'
                                                            className={`btn btn-sm btn-icon btn-color-primary d-xl-none d-xxl-flex`}
                                                        >
                                                            <KTIcon iconName='category' className='fs-2'/>
                                                        </button>
                                                    }) => (
    <div className={`card  ${(className)} h-100`}>
        <div className='card-header border-none border-0  mt-5 justify-content-between'>
            <div className={`card-title align-items-start flex-column ${headerClassName}`}>
                <span className='card-label fw-bold fs-5 mb-1'>{title}</span>
                <span className='text-muted fw-semibold fs-7'>{subtitle}</span>
            </div>

            <div className='card-toolbar'>
                {toolBar}
            </div>
        </div>

        <div className='card-body'>
            {
                loadingData ?
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    :
                    <div ref={chartRef} id='kt_charts_widget_1_chart'
                         className={`d-flex  h-${chartHeight} justify-content-center`}/>
            }
        </div>
    </div>
)