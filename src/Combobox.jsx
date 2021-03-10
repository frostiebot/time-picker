import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  getHours,
  setHours,
  getMinutes,
  setMinutes,
  getSeconds,
  setSeconds,
} from './date-utils';

import Select from './Select';

const formatOption = (option, disabledOptions) => {
  let value = `${option}`;
  if (option < 10) {
    value = `0${option}`;
  }

  let disabled = false;
  if (disabledOptions && disabledOptions.indexOf(option) >= 0) {
    disabled = true;
  }

  return {
    value,
    disabled,
  };
};

class Combobox extends Component {
  static propTypes = {
    format: PropTypes.string,
    defaultOpenValue: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    prefixCls: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    onChange: PropTypes.func,
    showHour: PropTypes.bool,
    showMinute: PropTypes.bool,
    showSecond: PropTypes.bool,
    hourOptions: PropTypes.array,
    minuteOptions: PropTypes.array,
    secondOptions: PropTypes.array,
    disabledHours: PropTypes.func,
    disabledMinutes: PropTypes.func,
    disabledSeconds: PropTypes.func,
    onCurrentSelectPanelChange: PropTypes.func,
    use12Hours: PropTypes.bool,
  };

  onItemChange = (type, itemValue) => {
    const { onChange, defaultOpenValue, use12Hours } = this.props;
    let value = this.props.value || defaultOpenValue;

    if (type === 'hour') {
      if (use12Hours) {
        if (this.isAM()) {
          value = setHours(value, +itemValue % 12);
        } else {
          value = setHours(value, (+itemValue % 12) + 12);
        }
      } else {
        value = setHours(value, +itemValue);
      }
    } else if (type === 'minute') {
      value = setMinutes(value, +itemValue);
    } else if (type === 'ampm') {
      const ampm = itemValue.toUpperCase();
      if (use12Hours) {
        if (ampm === 'PM' && getHours(value) < 12) {
          value = setHours(value, (getHours(value) % 12) + 12);
        }

        if (ampm === 'AM') {
          if (getHours(value) >= 12) {
            value = setHours(value, getHours(value) - 12);
          }
        }
      }
    } else {
      value = setSeconds(value, +itemValue);
    }
    onChange(value);
  }

  onEnterSelectPanel = (range) => {
    this.props.onCurrentSelectPanelChange(range);
  }

  getHourSelect(hour) {
    const { prefixCls, hourOptions, disabledHours, showHour, use12Hours } = this.props;
    if (!showHour) {
      return null;
    }
    const disabledOptions = disabledHours();
    let hourOptionsAdj;
    let hourAdj;
    if (use12Hours) {
      hourOptionsAdj = [12].concat(hourOptions.filter(h => h < 12 && h > 0));
      hourAdj = (hour % 12) || 12;
    } else {
      hourOptionsAdj = hourOptions;
      hourAdj = hour;
    }

    return (
      <Select
        prefixCls={prefixCls}
        options={hourOptionsAdj.map(option => formatOption(option, disabledOptions))}
        selectedIndex={hourOptionsAdj.indexOf(hourAdj)}
        type="hour"
        onSelect={this.onItemChange}
        onMouseEnter={this.onEnterSelectPanel.bind(this, 'hour')}
      />
    );
  }

  getMinuteSelect(minute) {
    const { prefixCls, minuteOptions, disabledMinutes, defaultOpenValue, showMinute } = this.props;
    if (!showMinute) {
      return null;
    }
    const value = this.props.value || defaultOpenValue;
    const disabledOptions = disabledMinutes(getHours(value));

    return (
      <Select
        prefixCls={prefixCls}
        options={minuteOptions.map(option => formatOption(option, disabledOptions))}
        selectedIndex={minuteOptions.indexOf(minute)}
        type="minute"
        onSelect={this.onItemChange}
        onMouseEnter={this.onEnterSelectPanel.bind(this, 'minute')}
      />
    );
  }

  getSecondSelect(second) {
    const { prefixCls, secondOptions, disabledSeconds, showSecond, defaultOpenValue } = this.props;
    if (!showSecond) {
      return null;
    }
    const value = this.props.value || defaultOpenValue;
    const disabledOptions = disabledSeconds(getHours(value), getMinutes(value));

    return (
      <Select
        prefixCls={prefixCls}
        options={secondOptions.map(option => formatOption(option, disabledOptions))}
        selectedIndex={secondOptions.indexOf(second)}
        type="second"
        onSelect={this.onItemChange}
        onMouseEnter={this.onEnterSelectPanel.bind(this, 'second')}
      />
    );
  }

  getAMPMSelect() {
    const { prefixCls, use12Hours, format } = this.props;
    if (!use12Hours) {
      return null;
    }

    const AMPMOptions = ['am', 'pm'] // If format has 'a' char, then we should uppercase AM/PM
      .map(c => format.match(/\sa/) ? c.toUpperCase() : c)
      .map(c => ({ value: c }));

    const selected = this.isAM() ? 0 : 1;

    return (
      <Select
        prefixCls={prefixCls}
        options={AMPMOptions}
        selectedIndex={selected}
        type="ampm"
        onSelect={this.onItemChange}
        onMouseEnter={this.onEnterSelectPanel.bind(this, 'ampm')}
      />
    );
  }

  isAM() {
    const value = (this.props.value || this.props.defaultOpenValue);
    return getHours(value) >= 0 && getHours(value) < 12;
  }

  render() {
    const { prefixCls, defaultOpenValue } = this.props;
    const value = this.props.value || defaultOpenValue;
    return (
      <div className={`${prefixCls}-combobox`}>
        {this.getHourSelect(getHours(value))}
        {this.getMinuteSelect(getMinutes(value))}
        {this.getSecondSelect(getSeconds(value))}
        {this.getAMPMSelect(getHours(value))}
      </div>
    );
  }
}

export default Combobox;
