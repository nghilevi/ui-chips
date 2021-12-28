
import { newSpecPage } from '@stencil/core/testing'


const expectOptionsSelectedValues = (options:{selected: boolean}[], expectedSelectedValues:any[]) => {
    options.forEach( (option, index) => {
        expect(option.selected).toBe(expectedSelectedValues[index])
    })
}

describe('chips group', () => {
    
    it('should render', async () => {
        const page = await newSpecPage({
            components: [UiChips],
            html: '<ui-chips></ui-chips>',
        })
        expect(page.root).not.toBeUndefined()
    })

    let chipsGroup;

    beforeEach(()=>{
        chipsGroup = new UiChips()
        spyOn(chipsGroup, 'emit')
        chipsGroup.options = [
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '2+', value: '2+' },
        ]
    })

    describe('select', () => {
        it('should throw error if param is invalid', async () => {
            await expect(chipsGroup.select()).rejects.toThrowError()
            await expect(chipsGroup.select(null)).rejects.toThrowError()
            await expect(chipsGroup.select(' ')).rejects.toThrowError()
            await expect(chipsGroup.select(-1)).rejects.toThrowError()
            await expect(chipsGroup.select(2021)).rejects.toThrowError()
            await expect(chipsGroup.select('1')).resolves.not.toThrowError()
        })
    })

    describe('onKeyPress', () => {

        beforeEach(()=>{
            spyOn(chipsGroup, 'select')
        })
        
        it('should select by default on pressing ENTER or SPACE', async () => {
            chipsGroup.onKeyPress({keyCode: ChipsGroupKey.ENTER})
            chipsGroup.onKeyPress({keyCode: ChipsGroupKey.SPACE})
            chipsGroup.onKeyPress({keyCode: 8 }) // backspace
            expect(
                (chipsGroup.select as any).calls.count()
            ).toEqual(2)
        })

        it('should emit event when selectable = false on pressing ENTER or SPACE', async () => {
            chipsGroup.selectable = false
            chipsGroup.onKeyPress({keyCode: ChipsGroupKey.ENTER})
            chipsGroup.onKeyPress({keyCode: ChipsGroupKey.SPACE})
            chipsGroup.onKeyPress({keyCode: 8 }) // backspace
            expect(
                (chipsGroup.emit as any).calls.count()
            ).toEqual(2)
        })
    })

    describe('filter chip (by default)', () => {

        describe('select', () => {
            fit('should be able to select multiple chips at a time', () => {
            
                expectOptionsSelectedValues(chipsGroup.options, [undefined, undefined, undefined])

                chipsGroup.select(0)
                expectOptionsSelectedValues(chipsGroup.options, [true, undefined, undefined])


                chipsGroup.select(1)
                expectOptionsSelectedValues(chipsGroup.options, [true, true, undefined])

                // reselect option will toggle its selected state
                chipsGroup.select(1)
                expectOptionsSelectedValues(chipsGroup.options, [true, false, undefined])

                expect(
                    (chipsGroup.emit as any).calls.count()
                ).toEqual(3)

            })
        })

        describe('createSelectedOption', () => {
            it('should return right amount of selected options', () => {
                chipsGroup.select(0)
                chipsGroup.select(1)
                expect(chipsGroup.createSelectedOption().selectedOptions.length).toBe(2)
                chipsGroup.select(2)
                expect(chipsGroup.createSelectedOption().selectedOptions.length).toBe(3)
                chipsGroup.select(1)
                expect(chipsGroup.createSelectedOption().selectedOptions.length).toBe(2)
            })
        })

    })

    describe('choice chip', () => {

        describe('select', () => {
            it('should be able to select only one single chip at a time', () => {
            
                chipsGroup.type = 'choice'
                
                expectOptionsSelectedValues(chipsGroup.options, [undefined, undefined, undefined])

                chipsGroup.select(0)
                expectOptionsSelectedValues(chipsGroup.options, [true, false, false])

                chipsGroup.select(1)
                expectOptionsSelectedValues(chipsGroup.options, [false, true, false])

                // reselect option will NOT change its selected state
                chipsGroup.select(1)
                expectOptionsSelectedValues(chipsGroup.options, [false, true, false])

                chipsGroup.select(2)
                expectOptionsSelectedValues(chipsGroup.options, [false, false, true])

                expect(
                    (chipsGroup.emit as any).calls.count()
                ).toEqual(4)
            })
        })

    })

})
