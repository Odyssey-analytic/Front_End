import { useState, useEffect } from 'react';
import { FiCalendar } from 'react-icons/fi';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import styles from './Calendar.module.css';

const DateRangeSelector = () => {
  const [dateRange, setDateRange] = useState('');
  const [mode, setMode] = useState<'day' | 'week' | 'month' | 'year'>('day');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [displayValue, setDisplayValue] = useState('');

  const setDefaultDate = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
  
    let formattedDate = '';
    let dateToSet = now;
  
    if (mode === 'day') {
      formattedDate = now.toLocaleDateString('fa-IR', options);
    } 

    else if (mode === 'week') {
      const start = new Date(now);
      start.setDate(now.getDate() - now.getDay());
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      
      formattedDate = `${start.toLocaleDateString('fa-IR', options)} - ${end.toLocaleDateString('fa-IR', options)}`;
      dateToSet = start;

    } 
    else if (mode === 'month') {
      formattedDate = now.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long' });
      dateToSet = new Date(now.getFullYear(), now.getMonth(), 1);
    } 
    else {
      formattedDate = now.toLocaleDateString('fa-IR', { year: 'numeric' });
      dateToSet = new Date(now.getFullYear(), 0, 1);
    }
  
    setDateRange(formattedDate);
    setSelectedDate(dateToSet);
  };

  // تنظیم تاریخ پیش‌فرض هنگام تغییر حالت یا بارگذاری اولیه
  useEffect(() => {
    setDefaultDate();
  }, [mode]);

  // const handleModeChange = (newMode: typeof mode) => {
  //   setMode(newMode);
  //   setShowCalendar(false);
  // };


  // نمایش درست، متن غلط
  // const handleDateChange = (date: any) => {
  //   if (!date) return;
    
  //   setSelectedDate(date);
  //   const dateObj = new Date(date);

  //   let formattedDate = '';
  //   const options: Intl.DateTimeFormatOptions = { 
  //     year: 'numeric', 
  //     month: 'long', 
  //     day: 'numeric' 
  //   };

  //   if (mode === 'day') {
  //     formattedDate = dateObj.toLocaleDateString('fa-IR', options);
  //   } 
  //   else if (mode === 'week') {
  //     const start = new Date(dateObj);
  //     start.setDate(dateObj.getDate() - dateObj.getDay());
  //     const end = new Date(start);
  //     end.setDate(start.getDate() + 6);
      
  //     formattedDate = `${start.toLocaleDateString('fa-IR', options)} - ${end.toLocaleDateString('fa-IR', options)}`;
  //   } 
  //   else if (mode === 'month') {
  //     formattedDate = dateObj.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long' });
  //   } 
  //   else {
  //     formattedDate = dateObj.toLocaleDateString('fa-IR', { year: 'numeric' });
  //   }

  //   setDateRange(formattedDate);
  //   setShowCalendar(false);
  // };
  

  // const renderCustomCalendar = () => {
  //   switch (mode) {
  //     case 'year':
  //       return (
  //         <DatePicker
  //           value={selectedDate}
  //           onChange={handleDateChange}
  //           calendar={persian}
  //           locale={persian_fa}
  //           onlyYearPicker
  //         />
  //       );
  //     case 'month':
  //       return (
  //         <DatePicker
  //           value={selectedDate}
  //           onChange={handleDateChange}
  //           calendar={persian}
  //           locale={persian_fa}
  //           onlyMonthPicker
  //         />
  //       );
  //     case 'week':
  //       return (
  //         <DatePicker
  //           value={selectedDate}
  //           onChange={handleDateChange}
  //           calendar={persian}
  //           locale={persian_fa}
  //           weekPicker
  //         />
  //       );
  //     default:
  //       return (
  //         <DatePicker
  //           value={selectedDate}
  //           onChange={handleDateChange}
  //           calendar={persian}
  //           locale={persian_fa}
  //         />
  //       );
  //   }
  // };

  
  // تابع برای تنظیم نمایش تاریخ
  const updateDisplayValue = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };

    if (mode === 'day') {
      setDisplayValue(date.toLocaleDateString('fa-IR', options));
    } 
    else if (mode === 'week') {
      const start = new Date(date);
      start.setDate(date.getDate() - date.getDay());
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      
      setDisplayValue(
        `${start.toLocaleDateString('fa-IR', options)} - ${end.toLocaleDateString('fa-IR', options)}`
      );
    } 
    else if (mode === 'month') {
      setDisplayValue(date.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long' }));
    } 
    else {
      setDisplayValue(date.toLocaleDateString('fa-IR', { year: 'numeric' }));
    }
  };

  // تابع تغییر تاریخ
  const handleDateChange = (date: any) => {
    if (!date) return;
    
    let dateObj;
    if (Array.isArray(date)) {
      dateObj = new Date(date[0]);
    } else {
      dateObj = new Date(date);
    }

    setSelectedDate(dateObj);
    updateDisplayValue(dateObj);
  };

  // تنظیم تاریخ پیش‌فرض
  useEffect(() => {
    const now = new Date();
    setSelectedDate(now);
    updateDisplayValue(now);
  }, [mode]);

  const handleModeChange = (newMode: typeof mode) => {
    setMode(newMode);
  };

  const renderCustomCalendar = () => {
    const commonProps = {
      value: selectedDate,
      onChange: handleDateChange,
      calendar: persian,
      locale: persian_fa,
      render: <input className={styles.dateInput} value={displayValue} readOnly />,
      className: styles.customDatePicker
    };

    switch (mode) {
      case 'year':
        return <DatePicker {...commonProps} onlyYearPicker />;
      case 'month':
        return <DatePicker {...commonProps} onlyMonthPicker />;
      case 'week':
        return <DatePicker {...commonProps} weekPicker />;
      default:
        return <DatePicker {...commonProps} />;
    }
  };


  return (
    <div className={styles.dateSelectorContainer}>
      <div className={styles.modeSelector}>
        <button 
          className={`${styles.modeButton} ${mode === 'day' ? styles.active : ''}`}
          onClick={() => handleModeChange('day')}
        >
          روز
        </button>
        <button
          className={`${styles.modeButton} ${mode === 'week' ? styles.active : ''}`}
          onClick={() => handleModeChange('week')}
        >
          هفته
        </button>
        <button
          className={`${styles.modeButton} ${mode === 'month' ? styles.active : ''}`}
          onClick={() => handleModeChange('month')}
        >
          ماه
        </button>
        <button
          className={`${styles.modeButton} ${mode === 'year' ? styles.active : ''}`}
          onClick={() => handleModeChange('year')}
        >
          سال
        </button>
      </div>

      {/* <div className={styles.datePickerWrapper}> */}
        {/* <button 
          className={styles.datePickerButton}
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <FiCalendar className={styles.icon} />
          <span>{dateRange || 'تاریخ را انتخاب کنید'}</span>
        </button> */}

        {/* {showCalendar && ( */}
          <div className={styles.calendarPopup}>
            {renderCustomCalendar()}
          </div>
        {/* // )} */}
      {/* </div> */}


      {/* <div className={styles.datePickerWrapper}>
        <button 
          className={styles.datePickerButton}
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <FiCalendar className={styles.icon} />
          <span>{dateRange || 'تاریخ را انتخاب کنید'}</span>
        </button>

        {showCalendar && (
          <div className={styles.calendarPopup}>
            {renderCustomCalendar()}
          </div>
        )}
      </div>
       */}
      
    </div>
  );
};

export default DateRangeSelector;