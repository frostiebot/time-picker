/* eslint no-console:0 */

import 'rc-time-picker-date-fns/assets/index.less';

import React from 'react';
import ReactDom from 'react-dom';

import TimePicker from 'rc-time-picker-date-fns';

const format = 'h:mm a';

const now = new Date;

function onChange(value) {
  console.log(value && value.format(format));
}

ReactDom.render(
  <TimePicker
    showSecond={false}
    defaultValue={now}
    className="xxx"
    onChange={onChange}
    format={format}
    use12Hours
  />,
  document.getElementById('__react-content')
);
