import React, { useState, useRef, useEffect } from 'react';
import './CustomDatePicker.css';

const CustomDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [displayValue, setDisplayValue] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showYearPicker, setShowYearPicker] = useState(false);
  const datePickerRef = useRef(null);

  // Hàm để định dạng ngày theo DD/MM/YYYY
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Hàm để phân tích chuỗi ngày DD/MM/YYYY thành Date
  const parseDate = (dateString) => {
    if (!dateString) return null;
    const [day, month, year] = dateString.split('/');
    if (!day || !month || !year) return null;
    return new Date(year, month - 1, day);
  };

  // Xử lý khi người dùng chọn ngày
  const handleDateChange = (day) => {
    const newDate = new Date(currentYear, currentMonth, day);
    const formattedDate = formatDate(newDate);
    setSelectedDate(formattedDate);
    setDisplayValue(formattedDate);
    setShowCalendar(false);
  };

  // Xử lý khi người dùng nhập tay
  const handleInputChange = (e) => {
    const value = e.target.value;
    setDisplayValue(value);

    // Kiểm tra nếu giá trị là ngày hợp lệ
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
      const parsed = parseDate(value);
      if (parsed && !isNaN(parsed.getTime())) {
        setSelectedDate(value);
      }
    }
  };

  // Tạo mảng các ngày trong tháng
  const getDaysInMonth = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    
    const days = [];
    // Thêm các ngày trống đầu tháng
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    // Thêm các ngày trong tháng
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  };

  // Điều hướng tháng
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Xử lý click bên ngoài để đóng calendar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const days = getDaysInMonth();
  const weekdays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

  return (
    <div className="custom-datepicker-container" ref={datePickerRef}>
      <input
        type="text"
        className="custom-datepicker-input"
        placeholder="Ngày sinh (DD/MM/YYYY)"
        value={displayValue}
        onChange={handleInputChange}
        onFocus={(e) => {
          // Đảm bảo input luôn là text, không chuyển sang date
          e.target.type = 'text';
          setShowCalendar(true);
        }}
        onClick={() => setShowCalendar(true)}
        onKeyDown={(e) => {
          // Ngăn các phím có thể kích hoạt date picker của trình duyệt
          if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
          }
        }}
        inputMode="none"
        autoComplete="off"
      />
      <span className="datepicker-icon">📅</span>
      
      {showCalendar && (
        <div className="custom-datepicker-calendar">
          <div className="calendar-header">
            <button onClick={goToPreviousMonth} className="nav-btn">‹</button>
            <div className="month-year-display">
              <span
                className="current-month-year"
                onClick={() => setShowYearPicker(!showYearPicker)}
              >
                {new Date(currentYear, currentMonth).toLocaleString('vi-VN', { month: 'long', year: 'numeric' })}
              </span>
            </div>
            <button onClick={goToNextMonth} className="nav-btn">›</button>
          </div>

          {showYearPicker ? (
            <div className="year-picker">
              <div className="year-picker-header">
                <button onClick={() => setCurrentYear(currentYear - 10)} className="year-nav-btn">‹</button>
                <span className="year-range">{currentYear - 5} - {currentYear + 4}</span>
                <button onClick={() => setCurrentYear(currentYear + 10)} className="year-nav-btn">›</button>
              </div>
              <div className="year-grid">
                {Array.from({length: 10}, (_, i) => {
                  const year = currentYear - 5 + i;
                  return (
                    <div
                      key={year}
                      className={`year-option ${year === currentYear ? 'selected' : ''}`}
                      onClick={() => {
                        setCurrentYear(year);
                        setShowYearPicker(false);
                      }}
                    >
                      {year}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              <div className="calendar-weekdays">
                {weekdays.map((day, index) => (
                  <div key={index} className="weekday">{day}</div>
                ))}
              </div>
              <div className="calendar-days">
                {days.map((day, index) => (
                  <div
                    key={index}
                    className={`calendar-day ${day ? 'available' : 'empty'}`}
                    onClick={() => day && handleDateChange(day)}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;