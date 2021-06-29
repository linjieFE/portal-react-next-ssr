import React, { useRef, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import MainLayout from '../../layouts/mainLayout'
import { httpGet, httpPost } from '../../service/http'
import { Carousel } from 'antd';
import urls from '../../service/urls'
import styles from '../../styles/service.module.scss'
import { useRouter } from 'next/router'
import { Input, Select, message } from 'antd'
import { LoadingOutlined, CloseOutlined } from '@ant-design/icons'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
const { Option } = Select
const { TextArea } = Input
export default function productCenter({ info, ...props }) {
  const router = useRouter()
  const swiperRef = useRef()
  const [cur, setCur] = useState(0) // swiper-index
  // form
  const [modalStatus, setModalStatus] = useState(false)
  const [loading, setLoading] = useState(false)
  const [feedType, setFeedType] = useState(1)
  const [feedContent, setFeedContent] = useState('')
  const [feedaddress, setFeedaddress] = useState('')
  const preHandler = function () {
    swiperRef.current.prev()
  }
  const nextHandler = function () {
    swiperRef.current.next()
  }
  const dotHandler = function (current) {
    swiperRef.current.goTo(current)
  }
  const setChangeDot = function (from, to) {
    setCur(to)
  }
  const toDetailHandler = type => {
    router.push({ pathname: '/serviceCenter/serviceDetail', query: { type: type } })
  }
  const OPEN_KF_HANDLER = () => {
    window.open('tencent://message/?uin=800183557&Site=在线QQ&amp;Menu=yes')
  }
  const SUBMIT_FEEDBACK = async () => {
    if (loading) {
      return false
    }
    const obj = {
      type: feedType,
      content: feedContent,
      address: feedaddress
    }
    if (obj.content === '') {
      message.warning('请描述您的问题')
      return false
    }
    const reg = /^[0-9a-zA-Z@.]{5,}$/
    if (!reg.test(obj.address)) {
      message.warning('请输入正确的联系方式')
      return false
    }
    try {
      setLoading(true)
      const { data } = await httpPost(urls.commitFeedback, obj)
      setLoading(false)
      if (data.status === 200) {
        message.success('提交成功，请耐心等待回复')
      } else {
        message.error(data.msg)
      }
    } catch {
      message.error('提交出错了')
    }
  }
  return (
    <div>
      <Head>
        <title>非夕-客服中心</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <main className='pages'>
          <div className={styles.swiperOut}>
            {/* 轮播方向箭头 */}
            <div className={[styles.controlContainer, 'flex-col', 'flex-ali-center', 'flex-jst-start'].join(' ')}>
              <div className={[styles.controlBar, 'flex-row', 'flex-jst-btw', 'flex-ali-center'].join(' ')}>
                <div className={['flex-row', 'flex-jst-center', 'flex-ali-center', styles.controlArrow].join(' ')} onClick={() => preHandler()}>
                  <LeftOutlined style={{fontSize:'20px'}}/>
                </div>
                {/* 向右 */}
                <div className={['flex-row', 'flex-jst-center', 'flex-ali-center', styles.controlArrow, styles.controlArrowRight].join(' ')} onClick={() => nextHandler()}>
                  <RightOutlined style={{fontSize:'20px'}}/>
                </div>
              </div>
              {/* 轮播点 */}
              <div className={['full-width', 'flex-row', 'flex-jst-center', 'flex-ali-center', styles.dotContainer].join(' ')}>
                {
                  info.banners.map((item, idx) => {
                    return (
                      <div className={[styles.cusDot, cur === idx ? styles.curDot : ''].join(' ')} key={item} onClick={() => dotHandler(idx)}></div>
                    )
                  })
                }
              </div>
            </div>
            <Carousel effect="fade" dots={false} autoplay={true} ref={swiperRef} beforeChange={(from, to) => setChangeDot(from, to)}>
              {info.banners.map(item => {
                return (
                  <div className={styles.swiperItem} key={item}>
                    <img src={item} alt="" />
                  </div>
                )
              })}
            </Carousel>
          </div>
          {/* 中间部分 */}
          <div className={styles.centerOut}>
            <div className={styles.contentContainer}>
              <div className={['flex-row', 'flex-jst-start', 'flex-ali-start'].join(' ')}>
                {/* 面包屑导航 */}
                <div className={[styles.bread, 'flex-row', 'flex-jst-start', 'flex-ali-base', 'flex-1'].join(' ')}>
                  <div className='self-stretch title-prefix ma-rt-2'></div>
                  <Link href='/'>
                    <span className='title-font font-18 text-normal ma-rt-1 cursor-pointer font-bold'>首页</span>
                  </Link>
                  <span className='font-18 text-normal ma-rt-1'>{'>>'}</span>
                  <span className='font-18 text-red font-bold'>客服中心</span>
                </div>
              </div>
              {/* 正文 */}
              <div className={[styles.serviceContainer, 'flex-col', 'flex-jst-start', 'flex-ali-center'].join(' ')}>
                {/* row1 */}
                <div className={['flex-row', 'flex-jst-btw', 'flex-ali-center'].join(' ')}>
                  {/* row1-left */}
                  <div className={[styles.hoverOut, styles.concat].join(' ')} onClick={() => OPEN_KF_HANDLER()}>
                    <Image src="/images/logo.png" width="100%" height="100%"/>
                    <div className={styles.hoverContainer}>
                      <Image src="/images/logo.png" width="100%" height="100%"/>
                    </div>
                  </div>
                  {/* row1-right */}
                  <div className='flex-col flex-jst-btw flex-ali-center self-stretch'>
                    <div className='flex-row flex-jst-btw flex-ali-center'>
                      <div className={[styles.hoverOut, styles.topModal].join(' ')} onClick={() => toDetailHandler(1)}>
                        <Image src="/images/logo.png" width="100%" height="100%"/>
                        <div className={styles.hoverContainer}>
                          <Image src="/images/logo.png" width="100%" height="100%"/>
                        </div>
                      </div>
                      <div className={[styles.hoverOut, styles.topModal, styles.topModalRight].join(' ')} onClick={() => toDetailHandler(2)}>
                        <Image src="/images/logo.png" width="100%" height="100%"/>
                        <div className={styles.hoverContainer}>
                          <Image src="/images/logo.png" width="100%" height="100%"/>
                        </div>
                      </div>
                    </div>
                    <div className='flex-row flex-jst-btw flex-ali-center'>
                      <div className={[styles.hoverOut, styles.topModal].join(' ')} onClick={() => toDetailHandler(3)}>
                        <Image src="/images/logo.png" width="100%" height="100%"/>
                        <div className={styles.hoverContainer}>
                          <Image src="/images/logo.png" width="100%" height="100%"/>
                        </div>
                      </div>
                      <div className={[styles.hoverOut, styles.topModal, styles.topModalRight].join(' ')} onClick={() => setModalStatus(true)}>
                        <Image src="/images/logo.png" width="100%" height="100%"/>
                        <div className={styles.hoverContainer}>
                          <Image src="/images/logo.png" width="100%" height="100%"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* rows2 */}
                <div className='flex-row flex-jst-btw flex-ali-center'>
                  <div className={[styles.hoverOut, styles.btmModal].join(' ')} onClick={() => toDetailHandler(4)}>
                    <Image src="/images/logo.png" width="100%" height="100%"/>
                    <div className={styles.hoverContainer}>
                      <Image src="/images/logo.png" width="100%" height="100%"/>
                    </div>
                  </div>
                  <div className={[styles.hoverOut, styles.btmModal, styles.btmModalRight].join(' ')} onClick={() => toDetailHandler(5)}>
                    <Image src="/images/logo.png" width="100%" height="100%"/>
                    <div className={styles.hoverContainer}>
                      <Image src="/images/logo.png" width="100%" height="100%"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 投诉建议弹出层 */}
          {
            modalStatus ?
              (
                <div className={[styles.feedModal, 'flex-row', 'flex-jst-center', 'flex-ali-center'].join(' ')}>
                  <div className={[styles.modalContainer, 'flex-col', 'flex-jst-start', 'flex-ali-center', 'control-select'].join(' ')}>
                    {
                      loading ?
                        '' :
                        <CloseOutlined style={{ color: '#d7403c', fontSize: '.3rem', position: 'absolute', right: '.26rem', top: '.29rem', cursor: 'pointer' }} onClick={() => setModalStatus(false)}></CloseOutlined>
                    }
                    <p className='font-24 text-blk title-font'>投诉建议</p>
                    <div className='full-width'>
                      <p className={[styles.feedTit, 'text-normal', 'font-16'].join(' ')}>问题类型</p>
                      <Select defaultValue={feedType} style={{ width: '100%' }} onSelect={val => setFeedType(val)}>
                        <Option value={1}>投诉</Option>
                        <Option value={2}>建议</Option>
                      </Select>
                      <p className={[styles.feedTit, 'text-normal', 'font-16'].join(' ')}>情况说明</p>
                      <TextArea rows={6} style={{ border: '1px solid #939393', borderRadius: '6px' }} placeholder='请具体描述您的问题...' onChange={e => setFeedContent(e.target.value)}></TextArea>
                      <p className={[styles.feedTit, 'text-normal', 'font-16'].join(' ')}>联系方式</p>
                      <Input style={{ border: '1px solid #939393', borderRadius: '6px', height: '42px' }} placeholder='请留下您的联系方式' onChange={e => setFeedaddress(e.target.value)}></Input>
                    </div>
                    <div className={[styles.commitBtn, loading ? styles.loadingBtn : '', 'cursor-pointer', 'flex-row', 'flex-jst-center', 'flex-ali-center', 'title-font', 'text-white', 'font-24'].join(' ')}
                      onClick={() => SUBMIT_FEEDBACK()}
                    >
                      提交
                      {
                        loading ? <LoadingOutlined style={{ position: 'absolute', right: '5%', fontSize: '.16rem' }} /> : ''
                      }
                    </div>
                  </div>
                </div>
              ) : ''
          }
        </main>
      </MainLayout>
    </div>
  )
}

export async function getStaticProps(context) {
  // const { data } = await httpGet(urls.queryIndex)
  const data = await {
    banners:['https://www.flexiv.cn/cn/assets/solution/banner.png','https://www.flexiv.cn/cn/assets/home/card1.png','https://www.flexiv.cn/cn/assets/home/home1.jpg'],
  }
  return {
    props: {
      info: data
    }, // will be passed to the page component as props
  }
}