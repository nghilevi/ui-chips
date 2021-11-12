import { Component, Prop, h, State, Event, EventEmitter, Method, Host } from '@stencil/core';
import { bem } from './bem';
import { Option, ClickedOption, SelectedOptions, 
    Block, ChipsGroupEvent, ChipsGroupType, ChipsGroupKey } from './ui-chips-type'

@Component({
  tag: 'ui-chips',
  styleUrl: 'ui-chips.css',
})
export class UiChips {

  @Prop() label: string;
  @Prop() error: string;
  @Prop() hint: string;
  @Prop() optionalLabel: string;

  @Prop() name: string;
  @Prop({mutable: true}) selectable: boolean = true;
  @Prop({mutable: true}) options: Option[] = [];
  @Prop({mutable: true}) type: string = ChipsGroupType.FILTER;
  
  @State() clickedOption: ClickedOption;
  
  @Event() uiChipsClick: EventEmitter<ClickedOption>;
  @Event() uiChipsSelect: EventEmitter<ClickedOption | SelectedOptions>;

  /**
   * public 'select' function.
   * @param  {number} index the array item index
   */
  @Method()
  async select(index: number){
      index = parseInt(index as unknown as string)
      if(isNaN(index) || index < 0 || index >= this.options.length){
          throw new Error('invalid parameter!');
      }

      if(this.type === ChipsGroupType.CHOICE){
          this.options.forEach(option => option.selected = false);
          this.options[index].selected = true;
      }else {
          this.options[index].selected = !this.options[index].selected;
      }

      this.clickedOption = this.createClickedOption(index);
      this.emit(ChipsGroupEvent.ONCHANGE, index);
  }

  componentWillRender(){
      console.log('this.options: ',this.options)
  }

  // EVENTS HANDLINGS

  onClick(e, index){
      e.stopPropagation();
      if(!this.selectable){
          // prevent browser default action on changing input checked value, which trigers onChange 
          e.preventDefault(); 
      }
      this.emit(ChipsGroupEvent.ONCLICK, index);
  }

  onChange(e, index){
      e.stopPropagation();
      this.select(index);
  }

  onFocus(e){
      e.target.parentNode.focus();
  }

  onKeyPress(e, index){
      if (e.keyCode !== ChipsGroupKey.ENTER && e.keyCode !== ChipsGroupKey.SPACE) {
          return;
      }
      if(!this.selectable){
          this.emit(ChipsGroupEvent.ONCLICK, index);
      }else{
          this.select(index);
      }
  }
  
  // UTITLITIES

  emit(evtName: ChipsGroupEvent, index: number){
      if(evtName === ChipsGroupEvent.ONCLICK){
          this.uiChipsClick.emit(this.createClickedOption(index));
      }else {
          this.uiChipsSelect.emit(this.createSelectedOption());
      }
  }

  createClickedOption(index): ClickedOption {
      return {groupName: this.name, index,...this.options[index]};
  }

  createSelectedOption(): ClickedOption | SelectedOptions {
      return this.type === ChipsGroupType.CHOICE ? this.clickedOption : { 
          groupName: this.name, 
          clickedOption: this.clickedOption, // clickedOption has been defined at this stage
          selectedOptions: this.options.reduce((selectedOptions, option, index) => { // attached selected options
              if (option.selected) {
                  selectedOptions.push({ index, ...option });
              }
              return selectedOptions;
          },[] as ClickedOption[])
      };
  }

  render() {

      return (
          <Host 
              class={bem(Block.CHIPS_GROUP, { error: this.error })}
          >
              
              { (this.label || this.optionalLabel) && (
                  <div class={Block.CHIPS_GROUP + '__header'}>
                      {this.label && <div class={Block.CHIPS_GROUP+'__label'}>{this.label}</div>}
                      {this.optionalLabel && <div class={Block.CHIPS_GROUP+'__optional-label'}>{this.optionalLabel}</div>}
                  </div>               
              )}

              <div role={this.type === ChipsGroupType.CHOICE ? 'radiogroup' : 'group'}>
                  
              {this.options.map( (option, index) => {
                  return ([
                      /* TODO we may want use a separate chip component instead */
                      <label
                          class={bem(Block.CHIP, {
                              disabled: option.disabled,
                              selected: option.selected
                          })}
                          tabIndex={option.disabled ? -1 : 0}
                          onKeyPress={(e) => this.onKeyPress(e, index)}
                          onClick={(e) => this.onClick(e, index)}
                          role={this.type === ChipsGroupType.CHOICE ? 'radio' : 'checkbox'}
                          aria-checked={option.selected ? "true" : "false"}
                      >
                          {
                              this.type === ChipsGroupType.FILTER && option.selected ? 'icon' : ''
                          }
                          
                          <input
                              tabIndex={-1}
                              onChange={(e) => this.onChange(e, index)}
                              onFocus={(e) => this.onFocus(e)}
                              aria-hidden='true'
                              checked={option.selected}
                              type={this.type === ChipsGroupType.CHOICE ? 'radio' : 'checkbox'} 
                              name={this.name} 
                              value={option.value}
                          />
                          
                          <span>{option.label}</span>
                      </label>
                  ])
              })}
              </div>

              { (this.hint || this.error) && (

                  <div class={Block.CHIPS_GROUP + '__footer'}>
                      {this.hint && (
                          <div class={Block.CHIPS_GROUP + '__hint'}>   
                              <div class={Block.CHIPS_GROUP + '__hint-message'}>{this.hint}</div>
                          </div> 
                      )}
                      {this.error && (
                          <div class={Block.CHIPS_GROUP + '__error'}>   
                              icon here
                              <div class={Block.CHIPS_GROUP + '__error-message'}>{this.error}</div>
                          </div> 
                      )}
                  </div>

              )}
              
          </Host>
      
      ) // end of return()

  } // end of render()

}