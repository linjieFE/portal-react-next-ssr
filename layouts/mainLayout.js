import React, { useEffect, useState } from 'react'
import styles from '../styles/mainLayout.module.scss'
import { useRouter } from 'next/router'
export default function MainLayout(props) {
  const router = useRouter()
  const [showTop, setShowTop] = useState(0)
  const routes = [
    // { meta: '首页', path: '/' },
    { meta: '产品中心', path: '/productCenter' },
    { meta: '新闻中心', path: '/news' },
    { meta: '关于我们', path: '/about' },
    { meta: '加入我们', path: '/join' },
    { meta: '客服中心', path: '/serviceCenter' }
  ]
  const scrollHandler = () => {
    const h = document.documentElement.scrollTop
    setShowTop(h)
  }
  const OPEN_BA_POL = () => {
    window.open('http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51019002003526')
  }
  const OPEN_BA_ICP = () => {
    window.open('https://beian.miit.gov.cn/#/Integrated/index')
  }
  const TO_INDEX = () => {
    router.push({ pathname: '/' })
  }
  useEffect(() => {
    window.addEventListener('scroll', scrollHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [router])
  return (
    <div className={styles.pageContainer}>
      {/* head */}
      <div className={['full-width', 'flex-row', 'flex-jst-center', 'flex-ali-center', 'pa-col-md', 'bg-white', styles.headBar].join(' ')}
        style={{ opacity: showTop > 91 ? 0 : 1 - (showTop / 91) }}
      >
        <div className={['flex-row', 'flex-jst-btw', 'flex-ali-center', styles.barContainer].join(' ')}>
          <img src='/images/logo.png' style={{width: '18%'}} onClick={() => TO_INDEX()} className='cursor-pointer'></img>
          <div className={['flex-row', 'flex-jst-btw', 'flex-ali-center', 'flex-nowrap', styles.menuList].join(' ')}>
            {router.pathname === '/' ?
            <a href='/' className={[styles.activePath, styles.menuItem, 'title-font'].join(' ')}>首页</a> :
            <a href='/' className={[styles.dectivePath, styles.menuItem].join(' ')}>首页</a>
            }
            {routes.map((item) => {
              return (
                router.pathname.startsWith(item.path) ?
                  <a href={item.path} className={[styles.activePath, styles.menuItem, 'title-font'].join(' ')} key={item.path}>{item.meta}</a> :
                  <a href={item.path} className={[styles.dectivePath, styles.menuItem].join(' ')} key={item.path}>{item.meta}</a>
              )
            })}
          </div>
        </div>
      </div>
      {/* content */}
      <div className={styles.mainContainer}>
        {props.children}
      </div>
      {/* foot */}
      <footer className={[styles.footContainer, 'flex-row', 'flex-jst-center', 'flex-ali-center'].join(' ')}>
        <div className={['flex-row', 'flex-jst-btw', 'flex-ali-center', styles.footCont].join(' ')}>
          <img src='/images/logo.png' style={{width: '25%'}}></img>
          <div className='flex-col flex-jst-start flex-ali-end font-16 text-light-grey'>
          <p>上海非夕机器人科技有限公司 地址：中国（上海）网络视听基地紫星路588号8层01室</p>
            <p>Copyright © 2016-2020 Flexiv. All Rights Reserved.</p>
            <p className='cursor-pointer'  onClick={() => OPEN_BA_ICP()}>沪 ICP备20020069号-2</p>
            <div className="font-14 text-center flex-row flex-jst-center flex-ali-center cursor-pointer" onClick={() => OPEN_BA_POL()}>
              <img src="/images/police_ba.png" alt="" className="ma-rt-02" />
              <span className="font-16">沪公网安备 000000000000号</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}