import React from 'react'
import styles from './about.module.scss'

const DevContent = (props) => {
  const list = [
    {
      title: '手臂 Arms',
      bgColor: '#47577b',
      imgSrc: '/images/logo.png',
      content: '手臂 Arms'
    },
    {
      title: '试教器',
      bgColor: '#ff5838',
      imgSrc: '/images/logo.png',
      content: 'Teath'
    },
    {
      title: '智能一站式解决方案',
      bgColor: '#4e3530',
      imgSrc: '/images/logo.png',
      content: 'Flexiv非夕发布穹知NOEMA AI系统，打造面向全行业的通用智能机器人大脑'
    }
  ]
  return (
    <div className={[styles.wordContainer, styles.devlopment].join(' ')}>
      {
        list.map((item, idx) => {
          return (
            <div className={[styles.devItem, idx%2===0?'flex-row':'flex-row-reverse', 'flex-jst-btw', 'full-width', 'flex-ali-center'].join(' ')} key={idx}>
              <div className={[styles.itemTit, 'title-font', 'text-white', 'text-center', 'flex-row', 'flex-jst-center', 'flex-ali-center'].join(' ')} style={{backgroundColor: item.bgColor}}>{item.title}</div>
              <div style={{width: '.2rem'}}></div>
              <div className={[styles.itemContent, idx%2===0?'flex-row':'flex-row-reverse', 'flex-jst-btw', 'flex-ali-center'].join(' ')}>
                <div className={styles.wordContainer}>{item.content}</div>
                <img src={item.imgSrc} alt=""/>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default DevContent