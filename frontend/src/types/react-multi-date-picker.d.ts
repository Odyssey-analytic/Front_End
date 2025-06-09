// declare module 'react-multi-date-picker';
// declare module 'react-date-object/calendars/persian';
// declare module 'react-date-object/locales/persian_fa';

declare module 'react-multi-date-picker' {
  import * as React from 'react';

  interface DatePickerProps {
    value?: any;
    onChange?: (date: any) => void;
    calendar?: any;
    locale?: any;
    format?: string;
    inputClass?: string;
    containerClass?: string;
    calendarPosition?: string;
    placeholder?: string;
    [key: string]: any;
  }

  const DatePicker: React.FC<DatePickerProps>;

  export default DatePicker;

  export class DateObject {
    constructor(arg?: any);
    format: (formatStr?: string) => string;
    toDate: () => Date;
    toFirstOfWeek: () => DateObject;
    toFirstOfMonth: () => DateObject;
    add: (unit: string, value: number) => DateObject;
    subtract: (unit: string, value: number) => DateObject;
    [key: string]: any;
  }
}

declare module 'react-date-object/calendars/persian' {
  const persian: any;
  export default persian;
}

declare module 'react-date-object/locales/persian_fa' {
  const persian_fa: any;
  export default persian_fa;
}