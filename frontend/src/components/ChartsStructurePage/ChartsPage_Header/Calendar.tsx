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

  const handleModeChange = (newMode: typeof mode) => {
    setMode(newMode);
    setShowCalendar(false);
  };

  const handleDateChange = (date: any) => {
    if (!date) return;
    
    try {
      let dateObj;
      let weekRange;
      
      // برای حالت هفته
      if (mode === 'week' && Array.isArray(date)) {
        // تاریخ شروع هفته (اولین روز هفته)
        dateObj = new Date(date[0]);
        weekRange = date; // ذخیره کل محدوده هفته
        
        // محاسبه تاریخ شروع و پایان هفته از آرایه دریافتی
        const start = new Date(date[0]);
        const end = new Date(date[date.length - 1]);
        
        const options: Intl.DateTimeFormatOptions = { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        };
        
        const formattedDate = `${start.toLocaleDateString('fa-IR', options)} - ${end.toLocaleDateString('fa-IR', options)}`;
        
        setDateRange(formattedDate);
        setSelectedDate({
          startDate: start,
          endDate: end,
          weekRange: weekRange
        });
        setShowCalendar(false);
        return;
      } 
      // برای سایر حالات
      else if (date instanceof Object && 'year' in date && 'month' in date && 'day' in date) {
        dateObj = new Date(date.year, date.month.index, date.day);
      } 
      else if (typeof date === 'string') {
        dateObj = new Date(date);
      } 
      else if (date instanceof Date) {
        dateObj = date;
      } 
      else {
        console.error('فرمت تاریخ نامعتبر:', date);
        return;
      }
  
      if (isNaN(dateObj.getTime())) {
        console.error('تاریخ نامعتبر:', date);
        return;
      }
  
      const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
  
      let formattedDate = '';
  
      if (mode === 'day') {
        formattedDate = dateObj.toLocaleDateString('fa-IR', options);
      } 
      else if (mode === 'month') {
        formattedDate = dateObj.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long' });
      } 
      else {
        formattedDate = dateObj.toLocaleDateString('fa-IR', { year: 'numeric' });
      }
  
      setDateRange(formattedDate);
      setSelectedDate(dateObj);
      setShowCalendar(false);
    } catch (error) {
      console.error('خطا در پردازش تاریخ:', error);
    }
  };

  // تایپ میتونه کنه کاربر
  const renderCustomCalendar = () => {
    // برای حالت هفته، از weekRange یا startDate استفاده کنید
    const value = mode === 'week' 
      ? selectedDate?.weekRange || selectedDate?.startDate 
      : selectedDate;
  
    switch (mode) {
      case 'year':
        return (
          <DatePicker
            value={value}
            onChange={handleDateChange}
            calendar={persian}
            locale={persian_fa}
            onlyYearPicker
          />
        );
      case 'month':
        return (
          <DatePicker
            value={value}
            onChange={handleDateChange}
            calendar={persian}
            locale={persian_fa}
            onlyMonthPicker
          />
        );
      case 'week':
        return (
          <DatePicker
            value={value}
            onChange={handleDateChange}
            calendar={persian}
            locale={persian_fa}
            weekPicker
            range // این خط ممکن است لازم باشد
          />
        );
      default:
        return (
          <DatePicker
            value={value}
            onChange={handleDateChange}
            calendar={persian}
            locale={persian_fa}
          />
        );
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

      <div className={styles.datePickerWrapper}>
        <button 
          className={styles.datePickerButton}
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <FiCalendar className={styles.icon} />
          <span>{dateRange || 'تاریخ را انتخاب کنید'}</span>
        </button>

          <div className={styles.calendarPopup}>
            {renderCustomCalendar()}
          </div>

      </div>
    </div>
  );
};

export default DateRangeSelector;