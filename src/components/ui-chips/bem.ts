export { bem }

type ModifierObject = { [mod: string]: any }
type ClassString = string | (string | undefined | null)[]
type Modifier = ClassString | ModifierObject
type Bem = (base: string, ...modifiers: Modifier[]) => string

const bem: Bem = (base, ...modifiers) => {
    // "base" is either just a "block", or a "block__element" string
    let out = base

    for (const modifier of modifiers) {
        if (typeof modifier === 'string') {
            if (modifier) out += ` ${base}--${modifier}`
            continue
        }

        const modifierArray = Array.isArray(modifier)
            ? modifier
            : Object.keys(modifier).filter((k) => modifier[k])

        for (const modifier of modifierArray) {
            if (modifier) out += ` ${base}--${modifier}`
        }
    }

    return out
}

