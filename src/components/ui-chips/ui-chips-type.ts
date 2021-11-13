interface Option {
    value: any
    label: string
    selected?: boolean
    disabled?: boolean
}

interface ClickedOption extends Option {
    index: number
    groupName?: string
}

interface SelectedOptions {
    groupName: string
    clickedOption: Option
    selectedOptions: Option[]
}

enum Block {
    CHIP = 'uiw-chip',
    CHIPS_GROUP = 'uiw-chips-group',
}

enum ChipsGroupEvent {
    ONCLICK = 'onClick',
    ONCHANGE = 'onChange',
}

enum ChipsGroupType {
    CHOICE = 'choice',
    FILTER = 'filter',
}

enum ChipsGroupKey { // TODO should be in a common place
    ENTER = 13,
    SPACE = 32,
}

export {
    Option,
    ClickedOption,
    SelectedOptions,
    Block,
    ChipsGroupEvent,
    ChipsGroupType,
    ChipsGroupKey,
}
