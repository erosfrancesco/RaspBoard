import './typography.css'


export function AppTitle({ className, children, ...args } = {}) {
    const classNames = (className ? className + ' ' : '') + 'app-title'
    return <span className={classNames} {...args}>{children}</span>
}

export function SectionTitle({ className, children, ...args } = {}) {
    const classNames = (className ? className + ' ' : '') + 'app-section-title'
    return <span className={classNames} {...args}>{children}</span>
}

export function InputLabel({ className, children, ...args } = {}) {
    const classNames = (className ? className + ' ' : '') + 'app-input-label'
    return <span className={classNames} {...args}>{children}</span>
}

export function TextNormal({ className, children, ...args } = {}) {
    const classNames = (className ? className + ' ' : '') + 'app-text-normal'
    return <span className={classNames} {...args}>{children}</span>
}
