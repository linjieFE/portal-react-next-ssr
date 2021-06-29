import React from 'react'
import styles from './join.module.scss'
const Treat = props => {
  const treatList = [
    { icon: 'icon-baoxianxiang', title: '六险一金', sub: 'INSURANCE', content: '入职享受六险一金，并提供餐补、交通补贴以及全勤奖' },
    { icon: 'icon-rili', title: '上班时间', sub: 'OFFICE HOURS', content: '早10晚7工作制，完美避开上下班高峰时期' },
    { icon: 'icon-huodong', title: '团建活动', sub: 'TEAM BUILDING', content: '进了门，我们就是一家人，一同团建去旅行' },
    { icon: 'icon-yingxiaoguanhuai', title: '节庆关怀', sub: 'FESTIVAL GIFT', content: '传统节假日会有高标准的节日礼金或礼物' },
    { icon: 'icon-liwu', title: '加班福利', sub: 'OVERTIME BENEFITS', content: '让你的每一分付出都可以得到收获' },
    { icon: 'icon-_jiatingguanxi', title: '和谐氛围', sub: 'ATMOSPHERE', content: '像在家一般温暖' },
    { icon: 'icon-Coffeecupfood', title: '下午茶', sub: 'HIGH TEA', content: '劳累一整天补充能量' },
    { icon: 'icon-qianbao', title: '绩效奖金', sub: 'PERFORMANCE BONUS', content: '优秀的你值得更多报酬' },
    { icon: 'icon-20jiankongguanli', title: '健康体检', sub: 'HEALTH EXAMINATION', content: '身体是革命的本钱' }
  ]
  return (
    <div className='flex-row flex-wrap flex-jst-btw flex-ali-center full-width'>
      {
        treatList.map((item, idx) => {
          return (
            <div className={[styles.treatItem, 'flex-col', 'flex-jst-start', 'flex-ali-center', 'cus-fade-in'].join(' ')} key={idx}>
              <i className={['text-danger', 'iconfont', item.icon, styles.iconBar].join(' ')}></i>
              <p className={styles.titleBar}>{item.title}</p>
              <p className={styles.subBar}>{item.sub}</p>
              <p className={styles.contentBar}>{item.content}</p>
              <div className={[styles.hoverContainer]}>
                <div className={[styles.hoverBar, 'flex-col', 'flex-jst-start', 'flex-ali-center'].join(' ')}>
                  <i className={['text-white', 'iconfont', item.icon, styles.iconBar].join(' ')}></i>
                  <p className={styles.titleBar}>{item.title}</p>
                  <p className={styles.subBar}>{item.sub}</p>
                  <p className={styles.contentBar}>{item.content}</p>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Treat