import React from 'react'
import styles from './styles.module.css'

interface CategoryPillProps {
    Text: string
    Color?: string;
    Bg?: string;
}

function CategoryPill({ Color, Bg, Text }: CategoryPillProps) {

    const CategoryPillStying = {
        '--categoryPill-color': Color ? Color : "Black",
        '--categoryPill-bgColor': Bg ? Bg : "#0000000F",

    } as React.CSSProperties;

    return (
        <>
            <p style={CategoryPillStying} className={`${styles.cat}`}>•{Text}</p>
        </>
    )
}

export default CategoryPill