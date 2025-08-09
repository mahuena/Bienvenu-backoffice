import React, {useEffect} from "react";
import {motion, useAnimation, useInView} from "framer-motion";

type Props = {
    children: React.ReactNode;
    className?: string;
    showBg?: boolean;
}

export const FramerReveal = ({
                                 children,
                                 className = "",
                                 showBg = false
                             }: Props) => {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const isInView = useInView(ref, {once: true});
    const mainControls = useAnimation()
    const slideControls = useAnimation()

    useEffect(() => {
        if (isInView) {
            mainControls.start('visible').then(
                () => mainControls.set('hidden')
            )
            slideControls.start('visible').then()
        }
    }, [isInView, mainControls, slideControls]);

    return (
        <div ref={ref} className={`${className}  overflow-hidden position-relative`}>
            <motion.div
                variants={
                    {
                        hidden: {opacity: 0, y: 85},
                        visible: {opacity: 1, y: 0},
                    }
                }
                initial={'hidden'}
                animate={isInView ? 'visible' : 'hidden'}
                transition={{duration: 0.5, ease: "easeOut"}}
            >
                {children}
            </motion.div>
            {
                showBg &&
                <motion.div
                    variants={{
                        hidden: {left: 0},
                        visible: {left: '100%'}
                    }}
                    initial={'hidden'}
                    animate={slideControls}
                    transition={{duration: 0.25, ease: "easeIn",}}
                    className={'position-absolute bg-primary z-index-20'}
                    style={{
                        top: 4,
                        bottom: 4,
                        left: 0,
                        right: 0,
                    }}
                >
                </motion.div>
            }

        </div>
    );
};