import { useState } from 'react';
import { FiCalendar } from 'react-icons/fi';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import styles from './DateRangeSelector.module.css'; // فایل استایل شما

const DateRangeSelector = () => {
  const [dateRange, setDateRange] = useState('۱۴۰۳/۰۲/۰۵ - ۱۴۰۳/۰۲/۱۲');
  const [mode, setMode] = useState<'day' | 'week' | 'month' | 'year'>('day');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<any>(null);

  const handleModeChange = (newMode: typeof mode) => {
    setMode(newMode);
    setShowCalendar(false);
  };

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    
    if (date) {
      let formattedDate = '';
      const persianDate = new Date(date).toLocaleDateString('fa-IR');
      
      if (mode === 'day') {
        formattedDate = persianDate;
      } else if (mode === 'week') {
        const start = new Date(date);
        start.setDate(date.getDate() - date.getDay());
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        formattedDate = `${start.toLocaleDateString('fa-IR')} - ${end.toLocaleDateString('fa-IR')}`;
      } else if (mode === 'month') {
        const start = new Date(date.getFullYear(), date.getMonth(), 1);
        const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        formattedDate = `${start.toLocaleDateString('fa-IR')} - ${end.toLocaleDateString('fa-IR')}`;
      } else {
        const start = new Date(date.getFullYear(), 0, 1);
        const end = new Date(date.getFullYear(), 11, 31);
        formattedDate = `${start.toLocaleDateString('fa-IR')} - ${end.toLocaleDateString('fa-IR')}`;
      }
      
      setDateRange(formattedDate);
    }
    
    setShowCalendar(false);
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
          <span>{dateRange}</span>
        </button>

        {showCalendar && (
          <div className={styles.calendarPopup}>
            <DatePicker
              value={selectedDate}
              onChange={handleDateChange}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              range={mode !== 'day'}
              numberOfMonths={mode === 'year' ? 12 : 1}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DateRangeSelector;