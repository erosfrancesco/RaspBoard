import './typography.scss'

export function AppTextPrototype({ type, className, children, ...args } = {}) {
    const classNames = (className ? className + ' ' : '') + type + ' app-text-default';
    return <span className={classNames} {...args}>{children}</span>
}

export const AppTitle = (args = {}) => <AppTextPrototype type="text-title" {...args} />
export const AppSubtitle = (args = {}) => <AppTextPrototype type="text-subtitle" {...args} />
export const AppTitle2 = (args = {}) => <AppTextPrototype type="text-title2" {...args} />
export const AppSubtitle2 = (args = {}) => <AppTextPrototype type="text-subtitle2" {...args} />
export const AppOverline = (args = {}) => <AppTextPrototype type="text-overline" {...args} />
export const AppCaption = (args = {}) => <AppTextPrototype type="text-caption" {...args} />
export const AppSubtitleCaption = (args = {}) => <AppTextPrototype type="text-subtitle-caption" {...args} />
export const AppTextLabel = (args = {}) => <AppTextPrototype type="text-subtitle-caption" {...args} />
export const AppTextH6 = (args = {}) => <AppTextPrototype type="text-h6" {...args} />



export default function TypographyShowCase() {
    return <div className='app-column'>
        <AppTitle>App title</AppTitle>
        <AppSubtitle>App subtitle</AppSubtitle>
        <AppTitle2>App title2</AppTitle2>
        <AppSubtitle2>App subtitle2</AppSubtitle2>
        <AppOverline>App overline</AppOverline>
        <AppCaption>App caption</AppCaption>
        <AppSubtitleCaption>App subtitle caption</AppSubtitleCaption>
        <AppTextLabel>App text label</AppTextLabel>
        <AppTextH6>App text h6</AppTextH6>
    </div>
}