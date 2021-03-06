import 'rc-time-picker-date-fns/assets/index.less';

import React from 'react';
import ReactDom from 'react-dom';

import TimePicker from 'rc-time-picker-date-fns';

ReactDom.render(
  <div>
    <TimePicker defaultValue={new Date} showHour={false} />
    <TimePicker defaultValue={new Date} showMinute={false} />
    <TimePicker defaultValue={new Date} showSecond={false} />

    <TimePicker defaultValue={new Date} showMinute={false} showSecond={false} />
    <TimePicker defaultValue={new Date} showHour={false} showSecond={false}/>
    <TimePicker defaultValue={new Date} showHour={false} showMinute={false} />
  </div>
, document.getElementById('__react-content'));
