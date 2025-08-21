import { useState, useEffect } from "react";
import { FiCalendar, FiChevronDown } from "react-icons/fi";

import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-multi-date-picker/node_modules/react-date-object/calendars/persian";
import persian_fa from "react-multi-date-picker/node_modules/react-date-object/locales/persian_fa";

import styles from "./Calendar.module.css";

const DateRangeSelector = () => {
  const [dateRange, setDateRange] = useState("");
  const [mode, setMode] = useState<"day" | "week" | "month" | "year">("day");
  const [showDropdown, setShowDropdown] = useState(false);

  const [showModeSelector, setShowModeSelector] = useState(false);

  const [selectedDate, setSelectedDate] = useState<any>(null);

  const getWeekRange = (date: DateObject) => {
    const dayOfWeek = date.weekDay.index;
    const start = date.subtract("days", dayOfWeek);
    const end = start.add("days", 6);
    return [start, end];
  };

  const getMonthStart = (date: DateObject) => {
    return new DateObject({
      year: date.year,
      month: date.month.index + 1,
      day: 1,
      calendar: persian,
      locale: persian_fa,
    });
  };

  const getYearStart = (date: DateObject) => {
    return new DateObject({
      year: date.year,
      month: 1,
      day: 1,
      calendar: persian,
      locale: persian_fa,
    });
  };

  const formatDate = (date: DateObject | DateObject[], mode: string) => {
    if (Array.isArray(date)) {
      const start = date[0].format("D MMMM YYYY");
      const end = date[date.length - 1].format("D MMMM YYYY");
      return `${start} - ${end}`;
    } else {
      switch (mode) {
        case "day":
          return date.format("D MMMM YYYY");
        case "month":
          return date.format("MMMM YYYY");
        case "year":
          return date.format("YYYY");
        default:
          return date.format("D MMMM YYYY");
      }
    }
  };

  const setDefaultDate = () => {
    const now = new DateObject({ calendar: persian, locale: persian_fa });

    let dateToSet: any;
    let formattedDate = "";

    if (mode === "day") {
      dateToSet = now;
      formattedDate = now.format("D MMMM YYYY");
    } else if (mode === "week") {
      const [start, end] = getWeekRange(now);
      dateToSet = [start, end];
      formattedDate = `${start.format("D MMMM YYYY")} - ${end.format(
        "D MMMM YYYY"
      )}`;
    } else if (mode === "month") {
      dateToSet = getMonthStart(now);
      formattedDate = now.format("MMMM YYYY");
    } else {
      dateToSet = getYearStart(now);
      formattedDate = now.format("YYYY");
    }

    setDateRange(formattedDate);
    setSelectedDate(dateToSet);
  };

  useEffect(() => {
    setDefaultDate();
  }, [mode]);

  const handleModeChange = (newMode: typeof mode) => {
    setMode(newMode);
    setShowDropdown(true);
  };

  const handleDateChange = (date: any) => {
    if (!date) return;

    try {
      setSelectedDate(date);

      if (mode === "week" && Array.isArray(date)) {
        const formattedDate = formatDate(date, mode);
        setDateRange(formattedDate);
      } else if (date instanceof DateObject) {
        const formattedDate = formatDate(date, mode);
        setDateRange(formattedDate);
      }
    } catch (error) {
      console.error("خطا در پردازش تاریخ:", error);
    }
  };

  const renderCustomCalendar = () => {
    const commonProps = {
      calendar: persian,
      locale: persian_fa,
      inputClass: styles.disabledInput,
      render: <input readOnly />,
    };

    switch (mode) {
      case "year":
        return (
          <DatePicker
            {...commonProps}
            value={selectedDate}
            onChange={handleDateChange}
            onlyYearPicker
          />
        );
      case "month":
        return (
          <DatePicker
            {...commonProps}
            value={selectedDate}
            onChange={handleDateChange}
            onlyMonthPicker
          />
        );
      case "week":
        return (
          <DatePicker
            {...commonProps}
            value={selectedDate}
            onChange={handleDateChange}
            range
            weekPicker
          />
        );
      default:
        return (
          <DatePicker
            {...commonProps}
            value={selectedDate}
            onChange={handleDateChange}
          />
        );
    }
  };

  const getModeLabel = () => {
    switch (mode) {
      case "day":
        return "روز";
      case "week":
        return "هفته";
      case "month":
        return "ماه";
      case "year":
        return "سال";
      default:
        return "";
    }
  };

  return (
    <div className={styles.combinedPicker}>
      <button
        className={styles.mainButton}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <div className={styles.buttonContent}>
          <FiCalendar className={styles.icon} />
          <div className={styles.dateText}>
            {dateRange || "تاریخ را انتخاب کنید"}
            <span className={styles.modeSeparator}>|</span>
            <span className={styles.modeBadge}>{getModeLabel()}</span>
          </div>
          <FiChevronDown
            className={`${styles.arrow} ${showDropdown ? styles.rotated : ""}`}
          />
        </div>
      </button>

      {showDropdown && (
        <div className={styles.dropdownContent}>
          <div className={styles.calendarHeader}>
            {renderCustomCalendar()}

            <div className={styles.modeSelectorWrapper}>
              <button
                className={styles.modeSelectorButton}
                onClick={() => setShowModeSelector(!showModeSelector)}
              >
                {getModeLabel()}
                <FiChevronDown
                  className={`${styles.modeSelectorArrow} ${
                    showModeSelector ? styles.rotated : ""
                  }`}
                />
              </button>

              {showModeSelector && (
                <div className={styles.modeSelectorDropdown}>
                  <button
                    className={`${styles.modeOption} ${
                      mode === "day" ? styles.active : ""
                    }`}
                    onClick={() => {
                      handleModeChange("day");
                      setShowModeSelector(false);
                    }}
                  >
                    روز
                  </button>
                  <button
                    className={`${styles.modeOption} ${
                      mode === "week" ? styles.active : ""
                    }`}
                    onClick={() => {
                      handleModeChange("week");
                      setShowModeSelector(false);
                    }}
                  >
                    هفته
                  </button>
                  <button
                    className={`${styles.modeOption} ${
                      mode === "month" ? styles.active : ""
                    }`}
                    onClick={() => {
                      handleModeChange("month");
                      setShowModeSelector(false);
                    }}
                  >
                    ماه
                  </button>
                  <button
                    className={`${styles.modeOption} ${
                      mode === "year" ? styles.active : ""
                    }`}
                    onClick={() => {
                      handleModeChange("year");
                      setShowModeSelector(false);
                    }}
                  >
                    سال
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeSelector;
