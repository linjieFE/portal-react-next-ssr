import React, { useState, useMemo } from 'react'
import styles from './centerContainer.module.scss'
// import { filterNewsContent } from '../../../utils/utils'
import Link from 'next/link'
import QRCode from 'qrcode.react'
import { CloseOutlined} from '@ant-design/icons'

export default function CenterContainer({ gameList, packages, ...props }) {
  const [curGame, setCurGame] = useState(null)
  const curPackage = useMemo(() => {
    const target = curGame ? packages.find(item => item.game_id === curGame.id) : null
    const result = {
      ...target,
      gameLogo: curGame ? curGame.logo : '',
      subtitle: curGame ? curGame.subtitle : ''
    }
    return result
  }, [curGame])
  return (
    <div className={styles.centerContainer}>
      <div className={[styles.bread, 'flex-row', 'flex-jst-start', 'flex-ali-base'].join(' ')}>
        <div className='self-stretch title-prefix ma-rt-2'></div>
        <Link href='/'>
          <span className='title-font font-18 text-normal ma-rt-1 cursor-pointer font-bold'>首页</span>
        </Link>
        <span className='font-18 text-normal ma-rt-1'>{'>>'}</span>
        <span className='font-18 text-red font-bold'>产品中心</span>
      </div>
      <div className={['flex-row', 'flex-wrap', 'flex-jst-start', 'flex-ali-start', styles.gameList].join(' ')}>
        {
          gameList.map((item, idx) => {
            return (
              <div className={[styles.gameItem, 'flex-col', 'cursor-pointer', 'flex-jst-btw', 'flex-ali-center', (idx % 3) === 1 ? styles.gameItemCenter : ''].join(' ')} key={item.id}>
                <div className={['full-width', styles.gamePost].join(' ')}>
                  <img src={item.poster} alt="" className={styles.postImg} />
                  <div className={[styles.gameInfo, 'flex-row', 'flex-jst-center', 'flex-ali-center'].join(' ')}>
                    <div className={[styles.codeContainer, 'flex-col', 'flex-jst-center', 'flex-ali-center', 'ma-rt-2'].join(' ')}>
                      <QRCode
                        value={item.domain}
                        level='H'
                        size={100} // 二维码的大小
                        fgColor="#333333" // 二维码的颜色
                        imageSettings={{ // 二维码中间的logo图片
                          src: item.logo,
                          height: 30,
                          width: 30,
                          excavate: false // 中间图片所在的位置是否镂空
                        }}
                      />
                      <p className='text-blk font-14'>扫码下载</p>
                    </div>
                    <div className={['self-stretch', 'flex-col', 'flex-jst-ard', 'flex-ali-start'].join(' ')}>
                      <p className='text-white font-16 font-bold'>扫码下载：{item.name}</p>
                      {/* <p className='text-white font-16 font-bold'>{item.subtitle.length > 15 ? `${filterNewsContent(item.subtitle, 15)}...` : item.subtitle}</p> */}
                      <div className={styles.cusButton} onClick={() => setCurGame(item)}>了解更多{' >'}</div>
                    </div>
                  </div>
                </div>
                <p className={['title-font', styles.gameName].join(' ')}>《{item.name}》</p>
                <div className={styles.gameIntro}>{item.subtitle}</div>
              </div>
            )
          })
        }
      </div>
      {/* 弹出层 */}
      {
        curGame ?
          <div className={[styles.modal, 'flex-row', 'flex-jst-center', 'flex-ali-center'].join(' ')}>
            <div className={[styles.modalContent]} style={{ backgroundImage: `url(${curPackage.poster})` }}>
              <img src={curPackage.logo} alt="" className={styles.subPic}/>
              <div className={[styles.titleBar, 'flex-row', 'flex-jst-btw', 'flex-ali-start'].join(' ')}>
                <div className={['flex-row', 'flex-jst-start', 'flex-ali-center'].join(' ')}>
                  <img src={curPackage.gameLogo} alt="" className='ma-rt-2' />
                  <div className={['self-strech', 'flex-col', 'flex-jst-ard', 'flex-ali-start'].join(' ')}>
                    <p className='title-font font-22 text-white'>{curPackage.gameName}</p>
                    <p className='font-16 text-light-grey'>{curPackage.subtitle}</p>
                  </div>
                </div>
                <CloseOutlined onClick={() => setCurGame(null)} style={{position: 'relative', zIndex: '+5'}}/>
              </div>
              <div className={['full-width', 'flex-col', 'flex-jst-start', 'flex-ali-start', styles.desContaienr].join(' ')}>
                <p className={styles.des}>{curPackage.description}</p>
                <div className={['flex-row', 'flex-jst-start', 'flex-ali-center'].join(' ')}>
                  <div className={[styles.codeContainer, 'flex-col', 'flex-jst-center', 'flex-ali-center', 'ma-rt-2'].join(' ')}>
                    <QRCode
                      value={curPackage.download_link}
                      level='H'
                      size={120} // 二维码的大小
                      fgColor="#333333" // 二维码的颜色
                      imageSettings={{ // 二维码中间的logo图片
                        src: curPackage.gameLogo,
                        height: 30,
                        width: 30,
                        excavate: false // 中间图片所在的位置是否镂空
                      }}
                    />
                    <p className='text-blk font-14'>扫码下载Lisence</p>
                  </div>
                  <div className={[styles.codeContainer, 'flex-col', 'flex-jst-center', 'flex-ali-center', 'ma-rt-2'].join(' ')}>
                    <img src="/images/logo.png" alt="" className={styles.wxCode}/>
                    <p className='text-blk font-14'>官方公众号</p>
                  </div>
                </div>
              </div>
            </div>
          </div> : ''
      }
    </div>
  )
}