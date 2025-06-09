import { useState, useEffect } from 'react';
import { FiCalendar, FiChevronDown } from 'react-icons/fi';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import styles from './Calendar.module.css';

const DateRangeSelector = () => {
  const [dateRange, setDateRange] = useState('');
  const [mode, setMode] = useState<'day' | 'week' | 'month' | 'year'>('day');
  const [showDropdown, setShowDropdown] = useState(false);
  // const [selectedDate, setSelectedDate] = useState<any>(null);

  const [selectedDate, setSelectedDate] = useState<SelectedDateType | null>(null);


  type SelectedDateType = 
  | Date // برای حالت‌های روز، ماه و سال
  | {    // برای حالت هفته
      startDate: Date;
      endDate: Date;
      weekRange?: Date[];
    };

  // const setDefaultDate = () => {
  //   const now = new Date();
  //   const options: Intl.DateTimeFormatOptions = { 
  //     year: 'numeric', 
  //     month: 'long', 
  //     day: 'numeric' 
  //   };
  
  //   let formattedDate = '';
  //   let dateToSet = now;
  
  //   if (mode === 'day') {
  //     formattedDate = now.toLocaleDateString('fa-IR', options);
  //   } else if (mode === 'week') {
  //     const start = new Date(now);
  //     start.setDate(now.getDate() - now.getDay());
  //     const end = new Date(start);
  //     end.setDate(start.getDate() + 6);
      
  //     formattedDate = `${start.toLocaleDateString('fa-IR', options)} - ${end.toLocaleDateString('fa-IR', options)}`;
  //     dateToSet = start;
  //   } else if (mode === 'month') {
  //     formattedDate = now.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long' });
  //     dateToSet = new Date(now.getFullYear(), now.getMonth(), 1);
  //   } else {
  //     formattedDate = now.toLocaleDateString('fa-IR', { year: 'numeric' });
  //     dateToSet = new Date(now.getFullYear(), 0, 1);
  //   }
  
  //   setDateRange(formattedDate);
  //   setSelectedDate(dateToSet);
  // };


  const setDefaultDate = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
  
    let formattedDate = '';
    let dateToSet: SelectedDateType = now;
  
    if (mode === 'day') {
      formattedDate = now.toLocaleDateString('fa-IR', options);
    } else if (mode === 'week') {
      const start = new Date(now);
      start.setDate(now.getDate() - now.getDay());
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      
      formattedDate = `${start.toLocaleDateString('fa-IR', options)} - ${end.toLocaleDateString('fa-IR', options)}`;
      dateToSet = {
        startDate: start,
        endDate: end,
        weekRange: [start, end]
      };
    } else if (mode === 'month') {
      formattedDate = now.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long' });
      dateToSet = new Date(now.getFullYear(), now.getMonth(), 1);
    } else {
      formattedDate = now.toLocaleDateString('fa-IR', { year: 'numeric' });
      dateToSet = new Date(now.getFullYear(), 0, 1);
    }
  
    setDateRange(formattedDate);
    setSelectedDate(dateToSet);
  };

  useEffect(() => {
    setDefaultDate();
  }, [mode]);

  const handleModeChange = (newMode: typeof mode) => {
    setMode(newMode);
    setDefaultDate();
  };

  const handleDateChange = (date: any) => {
    if (!date) return;
    
    try {
      let dateObj;
      let weekRange;
      
      if (mode === 'week' && Array.isArray(date)) {
        dateObj = new Date(date[0]);
        weekRange = date;
        
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
        return;
      } else if (date instanceof Object && 'year' in date && 'month' in date && 'day' in date) {
        dateObj = new Date(date.year, date.month.index, date.day);
      } else if (typeof date === 'string') {
        dateObj = new Date(date);
      } else if (date instanceof Date) {
        dateObj = date;
      } else {
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
      } else if (mode === 'month') {
        formattedDate = dateObj.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long' });
      } else {
        formattedDate = dateObj.toLocaleDateString('fa-IR', { year: 'numeric' });
      }
  
      setDateRange(formattedDate);
      setSelectedDate(dateObj);
    } catch (error) {
      console.error('خطا در پردازش تاریخ:', error);
    }
  };

  const renderCustomCalendar = () => {
    // const value = mode === 'week' 
    //   ? selectedDate?.weekRange || selectedDate?.startDate 
    //   : selectedDate;

    let value;
  
    if (mode === 'week') {
      if (selectedDate && typeof selectedDate === 'object' && 'weekRange' in selectedDate) {
        value = selectedDate.weekRange;
      } else if (selectedDate && typeof selectedDate === 'object' && 'startDate' in selectedDate) {
        value = [selectedDate.startDate, selectedDate.endDate];
      } else {
        value = null;
      }
    } else {
      value = selectedDate instanceof Date ? selectedDate : null;
    }
  
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
            range
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

  const getModeLabel = () => {
    switch (mode) {
      case 'day': return 'روز';
      case 'week': return 'هفته';
      case 'month': return 'ماه';
      case 'year': return 'سال';
      default: return '';
    }
  };

  return (
    <div className={styles.dateSelectorContainer}>
      <div className={styles.combinedPicker}>
        <button 
          className={styles.mainButton}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className={styles.buttonContent}>
            <FiCalendar className={styles.icon} />
            <span className={styles.dateText}>{dateRange || 'تاریخ را انتخاب کنید'}</span>
            <span className={styles.modeBadge}>{getModeLabel()}</span>
            <FiChevronDown className={`${styles.arrow} ${showDropdown ? styles.rotated : ''}`} />
          </div>
        </button>

        {showDropdown && (
          <div className={styles.dropdownContent}>
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

            <div className={styles.calendarWrapper}>
              {renderCustomCalendar()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateRangeSelector;