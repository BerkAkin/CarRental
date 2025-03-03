import styles from './styles.module.css'

interface ISkeleton {
    height?: string;
    width?: string;
    borderRadius?: string;
}

function Skeleton({ height = "100%", width = "100%", borderRadius = "0%" }: ISkeleton) {
    return (
        <div style={{ height, width, borderRadius }} className={`${styles.skeletonAnimation}`}>

        </div>
    )
}

export default Skeleton