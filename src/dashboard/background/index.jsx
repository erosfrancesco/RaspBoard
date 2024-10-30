import './index.css';


const Hexagon = () => {
    return <svg
        width="100%" height="100%"
        className='bg-hexagon-wrapper'>
        <defs>
            <pattern id="hexagons"
                width="50" height="43.4"
                patternUnits="userSpaceOnUse"
            >
                <polygon
                    className='bg-hexagon-shape'
                    points="24.8,22 37.3,29.2 37.3,43.7 24.8,50.9 12.3,43.7 12.3,29.2"
                    id="hex"
                    shapeRendering="geometricPrecision"
                />
                <use xlinkHref="#hex" x="25" />
                <use xlinkHref="#hex" x="-25" />
                <use xlinkHref="#hex" x="12.5" y="-21.7" />
                <use xlinkHref="#hex" x="-12.5" y="-21.7" />
            </pattern>
        </defs>
        <rect
            width="100%" height="100%"
            fill="url(#hexagons)"
        />
    </svg>
}

export const Background = ({ ...props } = {}) => {
    return <div className='bg-wrapper' {...props}>
        <Hexagon />
    </div>
}

export default Background;