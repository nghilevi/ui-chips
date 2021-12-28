import { r as registerInstance, e as createEvent, h, f as Host } from './index-1adcca83.js';

const bem = (base, ...modifiers) => {
  // "base" is either just a "block", or a "block__element" string
  let out = base;
  for (const modifier of modifiers) {
    if (typeof modifier === 'string') {
      if (modifier)
        out += ` ${base}--${modifier}`;
      continue;
    }
    const modifierArray = Array.isArray(modifier)
      ? modifier
      : Object.keys(modifier).filter((k) => modifier[k]);
    for (const modifier of modifierArray) {
      if (modifier)
        out += ` ${base}--${modifier}`;
    }
  }
  return out;
};

var Block;
(function (Block) {
  Block["CHIP"] = "uiw-chip";
  Block["CHIPS_GROUP"] = "uiw-chips-group";
})(Block || (Block = {}));
var ChipsGroupEvent;
(function (ChipsGroupEvent) {
  ChipsGroupEvent["ONCLICK"] = "onClick";
  ChipsGroupEvent["ONCHANGE"] = "onChange";
})(ChipsGroupEvent || (ChipsGroupEvent = {}));
var ChipsGroupType;
(function (ChipsGroupType) {
  ChipsGroupType["CHOICE"] = "choice";
  ChipsGroupType["FILTER"] = "filter";
})(ChipsGroupType || (ChipsGroupType = {}));
var ChipsGroupKey;
(function (ChipsGroupKey) {
  ChipsGroupKey[ChipsGroupKey["ENTER"] = 13] = "ENTER";
  ChipsGroupKey[ChipsGroupKey["SPACE"] = 32] = "SPACE";
})(ChipsGroupKey || (ChipsGroupKey = {}));

const uiChipsCss = ".uiw-chip{position:relative;margin:0;cursor:pointer;height:32px;box-shadow:0 0 0 2px transparent;display:inline-flex;padding:4px 12px;font-size:16px;box-sizing:border-box;align-items:center;white-space:nowrap;vertical-align:middle;justify-content:center;text-decoration:none;margin:5px;background-color:#e3e3e3;color:#5a575c;outline:none;min-width:44px}.uiw-chip__close{padding-left:8px;color:#5a575c}.uiw-chip__close path{fill:#5a575c}.uiw-chip:hover{color:#0000a0}.uiw-chip:hover .uiw-chip__close path{fill:#0000a0}.uiw-chip:focus{box-shadow:0 0 0 2px #aed5ff}.uiw-chip__label{display:flex;align-items:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.uiw-chip--with-space{margin:0 8px 8px 0}.uiw-chip--selected{background-color:#dcedff;color:#0000a0}.uiw-chip--selected .uiw-chip__close path{fill:#0000a0}.uiw-chip--disabled{pointer-events:none;color:#8b8a8d}.uiw-chip--disabled .uiw-chip__close path{fill:#8b8a8d}.uiw-chip .uiw-svg-container{margin:0 8px 0 0}.uiw-chip .uiw-chip__close .uiw-svg-container{margin:0}.uiw-chip:before{content:\"\";position:absolute;top:-6px;right:0px;bottom:-6px;left:0px}@media (prefers-color-scheme: dark){.uiw-enable-dark-mode .uiw-chip{background-color:#383838;color:#c9c7c7}.uiw-enable-dark-mode .uiw-chip__close path{fill:#c9c7c7}.uiw-enable-dark-mode .uiw-chip:hover{color:#aed5ff}.uiw-enable-dark-mode .uiw-chip:hover .uiw-chip__close path{fill:#aed5ff}.uiw-enable-dark-mode .uiw-chip:focus{box-shadow:0 0 0 2px #83b8ed}.uiw-enable-dark-mode .uiw-chip--selected{background-color:#5a575c;color:#aed5ff}.uiw-enable-dark-mode .uiw-chip--selected .uiw-chip__close path{fill:#aed5ff}.uiw-enable-dark-mode .uiw-chip--disabled{background-color:#383838;color:#8b8a8d}.uiw-enable-dark-mode .uiw-chip--disabled .uiw-chip__close path{fill:#8b8a8d}}.uiw-enforce-dark-mode .uiw-chip{background-color:#383838;color:#c9c7c7}.uiw-enforce-dark-mode .uiw-chip__close path{fill:#c9c7c7}.uiw-enforce-dark-mode .uiw-chip:hover{color:#aed5ff}.uiw-enforce-dark-mode .uiw-chip:hover .uiw-chip__close path{fill:#aed5ff}.uiw-enforce-dark-mode .uiw-chip:focus{box-shadow:0 0 0 2px #83b8ed}.uiw-enforce-dark-mode .uiw-chip--selected{background-color:#5a575c;color:#aed5ff}.uiw-enforce-dark-mode .uiw-chip--selected .uiw-chip__close path{fill:#aed5ff}.uiw-enforce-dark-mode .uiw-chip--disabled{background-color:#383838;color:#8b8a8d}.uiw-enforce-dark-mode .uiw-chip--disabled .uiw-chip__close path{fill:#8b8a8d}.uiw-chips-group{display:block}.uiw-chips-group .uiw-chip{margin:0 8px 8px 0}.uiw-chips-group .uiw-chip input{clip:rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px}.uiw-chips-group__header{display:flex;flex-flow:row;justify-content:space-between;margin-bottom:8px;font-size:0.875rem;line-height:1.25rem}.uiw-chips-group__footer{display:flex;flex-flow:column;font-size:0.875rem;line-height:1.25rem}.uiw-chips-group__optional-label,.uiw-chips-group__hint{color:#5a575c}.uiw-chips-group__hint,.uiw-chips-group__error{display:flex;margin-bottom:4px}.uiw-chips-group__error-icon{margin-right:8px}.uiw-chips-group--error .uiw-chips-group__label,.uiw-chips-group--error .uiw-chips-group__error-message{color:#e70404}";

let UiChips = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.uiChipsClick = createEvent(this, "uiChipsClick", 7);
    this.uiChipsSelect = createEvent(this, "uiChipsSelect", 7);
    this.selectable = true;
    this.options = [];
    this.type = ChipsGroupType.FILTER;
  }
  /**
   * public 'select' function.
   * @param  {number} index the array item index
   */
  async select(index) {
    index = parseInt(index);
    if (isNaN(index) || index < 0 || index >= this.options.length) {
      throw new Error('invalid parameter!');
    }
    if (this.type === ChipsGroupType.CHOICE) {
      this.options.forEach(option => option.selected = false);
      this.options[index].selected = true;
    }
    else {
      this.options[index].selected = !this.options[index].selected;
    }
    this.clickedOption = this.createClickedOption(index);
    this.emit(ChipsGroupEvent.ONCHANGE, index);
  }
  componentWillRender() {
    console.log('this.options: ', this.options);
  }
  // EVENTS HANDLINGS
  onClick(e, index) {
    e.stopPropagation();
    if (!this.selectable) {
      // prevent browser default action on changing input checked value, which trigers onChange 
      e.preventDefault();
    }
    this.emit(ChipsGroupEvent.ONCLICK, index);
  }
  onChange(e, index) {
    e.stopPropagation();
    this.select(index);
  }
  onFocus(e) {
    e.target.parentNode.focus();
  }
  onKeyPress(e, index) {
    if (e.keyCode !== ChipsGroupKey.ENTER && e.keyCode !== ChipsGroupKey.SPACE) {
      return;
    }
    if (!this.selectable) {
      this.emit(ChipsGroupEvent.ONCLICK, index);
    }
    else {
      this.select(index);
    }
  }
  // UTITLITIES
  emit(evtName, index) {
    if (evtName === ChipsGroupEvent.ONCLICK) {
      this.uiChipsClick.emit(this.createClickedOption(index));
    }
    else {
      this.uiChipsSelect.emit(this.createSelectedOption());
    }
  }
  createClickedOption(index) {
    return Object.assign({ groupName: this.name, index }, this.options[index]);
  }
  createSelectedOption() {
    return this.type === ChipsGroupType.CHOICE ? this.clickedOption : {
      groupName: this.name,
      clickedOption: this.clickedOption,
      selectedOptions: this.options.reduce((selectedOptions, option, index) => {
        if (option.selected) {
          selectedOptions.push(Object.assign({ index }, option));
        }
        return selectedOptions;
      }, [])
    };
  }
  render() {
    return (h(Host, { class: bem(Block.CHIPS_GROUP, { error: this.error }) }, (this.label || this.optionalLabel) && (h("div", { class: Block.CHIPS_GROUP + '__header' }, this.label && h("div", { class: Block.CHIPS_GROUP + '__label' }, this.label), this.optionalLabel && h("div", { class: Block.CHIPS_GROUP + '__optional-label' }, this.optionalLabel))), h("div", { role: this.type === ChipsGroupType.CHOICE ? 'radiogroup' : 'group' }, this.options.map((option, index) => {
      return ([
        /* TODO we may want use a separate chip component instead */
        h("label", { class: bem(Block.CHIP, {
            disabled: option.disabled,
            selected: option.selected
          }), tabIndex: option.disabled ? -1 : 0, onKeyPress: (e) => this.onKeyPress(e, index), onClick: (e) => this.onClick(e, index), role: this.type === ChipsGroupType.CHOICE ? 'radio' : 'checkbox', "aria-checked": option.selected ? "true" : "false" }, this.type === ChipsGroupType.FILTER && option.selected ? 'icon' : '', h("input", { tabIndex: -1, onChange: (e) => this.onChange(e, index), onFocus: (e) => this.onFocus(e), "aria-hidden": 'true', checked: option.selected, type: this.type === ChipsGroupType.CHOICE ? 'radio' : 'checkbox', name: this.name, value: option.value }), h("span", null, option.label))
      ]);
    })), (this.hint || this.error) && (h("div", { class: Block.CHIPS_GROUP + '__footer' }, this.hint && (h("div", { class: Block.CHIPS_GROUP + '__hint' }, h("div", { class: Block.CHIPS_GROUP + '__hint-message' }, this.hint))), this.error && (h("div", { class: Block.CHIPS_GROUP + '__error' }, "icon here", h("div", { class: Block.CHIPS_GROUP + '__error-message' }, this.error))))))); // end of return()
  } // end of render()
};
UiChips.style = uiChipsCss;

export { UiChips as ui_chips };
