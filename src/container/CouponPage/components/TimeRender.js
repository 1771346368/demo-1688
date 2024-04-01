import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import styles from './styles.less';
let timerId;

const Component = ({ timeObj }) => {
  const [restTime, setRestTime] = useState(timeObj?.restTime || 0);
  const ref = useRef(timeObj?.restTime || 0);

  useEffect(() => {
    if (timeObj?.restTime) {
      setRestTime(timeObj.restTime);
      ref.current = timeObj.restTime;
      if (timerId) {
        clearInterval(timerId);
      }
      timerId = setInterval(() => {
        if (ref.current > 0) {
          setRestTime(ref.current - 1);
          ref.current = ref.current - 1;
        }
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [timeObj?.restTime]);

  const addZero = (number) => {
    return number.toString().padStart(2, 0);
  };

  const getSecend = (restTime) => {
    return addZero(restTime % 60);
  };

  const getMinute = (restTime) => {
    return addZero(parseInt((restTime / 60) % 60));
  };

  const getHour = (restTime) => {
    return addZero(parseInt((restTime / 3600) % 60));
  };

  return (
    <div className={styles.container}>
      {timeObj?.restTime ? (
        <>
          <span>距结束</span>
          <span className='number-cube-container'>
            <div className='number-cube-content'>{getHour(restTime)}</div>:
            <div className='number-cube-content'>{getMinute(restTime)}</div>:
            <div className='number-cube-content'>{getSecend(restTime)}</div>
          </span>
        </>
      ) : (
        <>
          <span>有效期：</span>
          <span className=''>
            {dayjs(timeObj?.time[0]).format('MM.DD HH:ss')}-{dayjs(timeObj?.time[1]).format('MM.DD HH:ss')}
          </span>
        </>
      )}
    </div>
  );
};

export const TimeRender = React.memo(Component);
