import React, { useState, useEffect } from 'react';
import styles from './styles.less';
import { TimeRender } from './components/TimeRender';

const mockData = [
  {
    money: 30,
    title: '惊喜红包',
    description: '30 元红包，可无门槛使用',
    time: [1636542000000, 1636714800000],
    restTime: 11543,
    status: '使用'
  }
];

export const CouponPage = () => {
  const [couponList, setCouponList] = useState([]);

  useEffect(() => {
    getCouponList();
  }, []);

  const getCouponList = async () => {
    (await fetch('https://systemjs.1688.com/krump/schema/1352.json'))
      .json()
      .then((res) => {
        setCouponList(res?.list || []);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <div className={styles.container}>
      <div className='content'>
        <div className='title'>1688进货红包</div>
        {couponList.map((item, index) => (
          <div className='coupon-item-container' key={item?.description + index}>
            <div className='money-container'>
              <div className='money-content'>
                <div>{item.money || ''}</div>
                <div className='money-small'>元</div>
              </div>
            </div>
            <div className='coupon-content-container'>
              <div className='coupon-content-container-left'>
                <div className='coupon-content-title'>{item?.title || ''}</div>
                <div className='coupon-content-description'>{item?.description || ''}</div>
                <div className='coupon-content-time'>
                  <TimeRender timeObj={item} />
                </div>
              </div>
              <div className='coupon-content-container-right'>
                <div className='coupon-content-button'>{item?.status || ''}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
