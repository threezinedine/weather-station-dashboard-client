import React from "react"

import InformationBlockProps, {
    InformationFieldProps,
} from "./InformationBlockProps"
import { 
    combineClassName,
} from "utils"
import styles from "./InformationBlock.module.scss"


const InformationBlock: React.FC<InformationBlockProps> = ({
    title,
    fields,
}) => {
    const st = combineClassName(styles)

    return (
        <div className={st("information-container")}>
            <div className={st("information-container__title")}>
                { title }
            </div>
            {
                fields.map((field: InformationFieldProps, index: number) => (
                    <div 
                        key={index}
                        className={st("information")}
                    >
                        <div className={st("information__label")}>
                            { field.label }: 
                        </div>
                        <div className={st("information__value")}>
                            { field.value }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}


export default InformationBlock
