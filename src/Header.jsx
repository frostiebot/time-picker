import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  isValidTime,
  formatTime,
  parseTime,
  getHours,
  setHours,
  isSameHour,
  getMinutes,
  setMinutes,
  isSameMinute,
  getSeconds,
  setSeconds,
  isSameSecond,
} from './date-utils';

class Header extends Component {
  static propTypes = {
    format: PropTypes.string,
    prefixCls: PropTypes.string,
    disabledDate: PropTypes.func,
    placeholder: PropTypes.string,
    clearText: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
    hourOptions: PropTypes.array,
    minuteOptions: PropTypes.array,
    secondOptions: PropTypes.array,
    disabledHours: PropTypes.func,
    disabledMinutes: PropTypes.func,
    disabledSeconds: PropTypes.func,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    onEsc: PropTypes.func,
    allowEmpty: PropTypes.bool,
    defaultOpenValue: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
    currentSelectPanel: PropTypes.string,
    focusOnOpen: PropTypes.bool,
    onKeyDown: PropTypes.func,
    referenceDate: PropTypes.instanceOf(Date),
  };

  constructor(props) {
    super(props);
    const { value, format, referenceDate } = props;
    this.state = {
      str: value && formatTime(value, format, referenceDate) || '',
      invalid: false,
    };
  }

  componentDidMount() {
    if (this.props.focusOnOpen) {
      // Wait one frame for the panel to be positioned before focusing
      const requestAnimationFrame = (window.requestAnimationFrame || window.setTimeout);
      requestAnimationFrame(() => {
        this.refs.input.focus();
        this.refs.input.select();
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { value, format, referenceDate } = nextProps;
    this.setState({
      str: value && formatTime(value, format, referenceDate) || '',
      invalid: false,
    });
  }

  onInputChange = (event) => {
    const str = event.target.value;

    this.setState({ str });

    const {
      format, hourOptions, minuteOptions, secondOptions,
      disabledHours, disabledMinutes,
      disabledSeconds, onChange, allowEmpty,
      referenceDate,
    } = this.props;

    if (str) {
      const originalValue = this.props.value;
      const parsed = parseTime(str, format, referenceDate);


      if (!isValidTime(parsed)) {
        this.setState({ invalid: true });
        return;
      }

      const value = setHours(
        setMinutes(
          setSeconds(
            this.getProtoValue(),
            getSeconds(parsed)
          ),
          getMinutes(parsed)
        ),
        getHours(parsed)
      );

      // if time value not allowed, response warning.
      if (
        hourOptions.indexOf(getHours(value)) < 0 ||
        minuteOptions.indexOf(getMinutes(value)) < 0 ||
        secondOptions.indexOf(getSeconds(value)) < 0
      ) {
        this.setState({ invalid: true });
        return;
      }

      // if time value is disabled, response warning.
      const disabledHourOptions = disabledHours();
      const disabledMinuteOptions = disabledMinutes(getHours(value));
      const disabledSecondOptions = disabledSeconds(getHours(value), getMinutes(value));
      if (
        (disabledHourOptions && disabledHourOptions.indexOf(getHours(value)) >= 0) ||
        (disabledMinuteOptions && disabledMinuteOptions.indexOf(getMinutes(value)) >= 0) ||
        (disabledSecondOptions && disabledSecondOptions.indexOf(getSeconds(value)) >= 0)
      ) {
        this.setState({ invalid: true });
        return;
      }

      if (originalValue) {
        if (
          !isSameHour(originalValue, value) ||
          !isSameMinute(originalValue, value) ||
          !isSameSecond(originalValue, value)
        ) {
          // keep other fields for rc-calendar
          const changedValue = setHours(
            setMinutes(
              setSeconds(
                originalValue,
                getSeconds(value)
              ),
              getMinutes(value)
            ),
            getHours(value)
          );
          onChange(changedValue);
        }
      } else if (originalValue !== value) {
        onChange(value);
      }
    } else if (allowEmpty) {
      onChange(null);
    } else {
      this.setState({ invalid: true });
      return;
    }

    this.setState({ invalid: false });
  }

  onKeyDown = (e) => {
    const { onEsc, onKeyDown } = this.props;
    if (e.keyCode === 27) {
      onEsc();
    }
    onKeyDown(e);
  }

  onClear = () => {
    this.setState({ str: '' });
    this.props.onClear();
  }

  getClearButton() {
    const { prefixCls, allowEmpty } = this.props;
    if (!allowEmpty) {
      return null;
    }
    return (<a
      className={`${prefixCls}-clear-btn`}
      role="button"
      title={this.props.clearText}
      onMouseDown={this.onClear}
    />);
  }

  getProtoValue() {
    return this.props.value || this.props.defaultOpenValue;
  }

  getInput() {
    const { prefixCls, placeholder } = this.props;
    const { invalid, str } = this.state;
    const invalidClass = invalid ? `${prefixCls}-input-invalid` : '';
    return (
      <input
        className={`${prefixCls}-input  ${invalidClass}`}
        ref="input"
        onKeyDown={this.onKeyDown}
        value={str}
        placeholder={placeholder}
        onChange={this.onInputChange}
      />
    );
  }

  render() {
    const { prefixCls } = this.props;
    return (
      <div className={`${prefixCls}-input-wrap`}>
        {this.getInput()}
        {this.getClearButton()}
      </div>
    );
  }
}

export default Header;
