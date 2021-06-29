import React, { useRef, useState, useMemo, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import MainLayout from '../../layouts/mainLayout'
import { httpGet } from '../../service/http'
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import urls from '../../service/urls'
import styles from '../../styles/join.module.scss'
import Treat from '../../components/join/treat'
import Offer from '../../components/join/offer'
import { MyContext } from '../../components/join/myContext'
import { useRouter } from 'next/router'
export default function productCenter({ info, jobList, ...props }) {
  const router = useRouter()
  const swiperRef = useRef()
  const [cur, setCur] = useState(0) // swiper-index
  const [curType, setType] = useState(0) // newsType
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
  const typeList = [
    { value: 0, label: '招聘岗位', content: Offer },
    { value: 1, label: '福利待遇', content: Treat }
  ]
  useEffect(() => {
    if (router.query.type) {
      setType(Number(router.query.type))
    }
  }, [router])
  const Content = useMemo(() => {
    return typeList.find(item => item.value === curType).content
  }, [curType])
  return (
    <div>
      <Head>
        <title>非夕-加入我们</title>
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
                  <span className='font-18 text-red font-bold'>加入我们</span>
                </div>
              </div>
              {/* 列表部分 */}
              <div className={['flex-row', 'flex-jst-btw', 'flex-ali-start', styles.listOut].join(' ')}>
                {/* 类型选择 */}
                <div className={[styles.control, 'flex-1', 'flex-col', 'flex-jst-start', 'flex-ali-start'].join(' ')}>
                  {
                    typeList.map((item, idx) => {
                      return (
                        <div className={[styles.typeButton, idx === curType ? styles.typeCur : ''].join(' ')} key={idx} onClick={() => setType(idx)}>{item.label}</div>
                      )
                    })
                  }
                </div>
                {/* 新闻列表 */}
                <div className={['flex-3', styles.listContainer, 'flex-col', 'flex-jst-start', 'flex-ali-center'].join(' ')}>
                  <MyContext.Provider value={{jobList}}>
                    <Content/>
                  </MyContext.Provider>
                </div>
                <div className='flex-1'></div>
              </div>
            </div>
          </div>
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
  // const jobRes = await httpGet(urls.jobList)
  const jobResList=[
    {
      id: 6,
      type: null,
      position: '平面设计师（美工）',
      category: '技术',
      city: '成都',
      detail: '<p>&nbsp;1、 负责公司平面设计方面的相关工作；</p>\n' +
        '<p>2.、参与项目的平面设计工作，根据创意需求内容，进行文字、色彩、图案的选择和版式编排设计；</p>\n' +
        '<p>3、 完成上级领导交代的其他工作。</p>\n' +
        '<p>任职要求：</p>\n' +
        '<p>1 、 大专以上学历，广告视觉、平面设计等相关专业，能熟练使用Photoshop/illustrator/Coreldrew/等设计软件，优秀应届生可接受；</p>\n' +
        '<p>2、主动性高，善于沟通、耐心细致，能准确表达设计思路，有较强的责任心及较强的理解分析、创意设计能力和色彩搭配能力；</p>\n' +
        '<p>薪资范围：6-8K</p>',
      created_at: '2021-03-24 18:01:40',
      updated_at: null
    },
    {
      id: 5,
      type: null,
      position: '游戏策划师（休闲小游戏海外方向）',
      category: '商务运营',
      city: '北京',
      detail: '<p>1、根据项目设计方向，进行产品各系统的规划；</p>\n' +
        '<p>2、负责游戏系统功能的设计，文档撰写，系统功能开发跟进，开发工作的协调、进度把控和结果验收。</p>\n' +
        '<p>3、负责游戏开发文档编写和执行;</p>\n' +
        '<p>4、维护开发文档及开发表;</p>\n' +
        '<p>5、进行简单的测试及报告并进行归档维；</p>\n' +
        '<p>6、具有良好的语言表达能力、沟通能力；</p>\n' +
        '<p>任职要求：</p>\n' +
        '<p>1、热爱游戏，本科以上学历，3年以上游戏策划工作经验；</p>\n' +
        '<p>2、熟知游戏内各系统的设计目的、原则、方法，熟悉系统策划案的写作方法和规范；</p>\n' +
        '<p>3、有主人翁意识，有良好的沟通合作能力、较强的逻辑思维能力和执行力；</p>\n' +
        '<p>4、对不同类型的游戏风格和玩法有自己的见解；</p>\n' +
        '<p>5、善于分析归纳游戏核心的原理和内容，准确的把握设计重点，能解析并制定实现方案；</p>\n' +
        '<p>6、熟悉游戏系统框架，擅长Axure等原型设计工具；</p>\n' +
        '<p>薪资范围：10-15K</p>',
      created_at: '2021-03-24 18:00:28',
      updated_at: null
    },
    {
      id: 4,
      type: null,
      position: 'Ios开发工程师（游戏项目）',
      category: '技术',
      city: '成都',
      detail: '<p>1、负责iOS端游戏的上架打包；</p>\n' +
        '<p>2、负责开发iOS原生功能模块；</p>\n' +
        '<p>3、负责处理开发过程中遇到的技术难题并进行沉淀分享；</p>\n' +
        '<p>任职要求：</p>\n' +
        '<p>1.本科以上计算机相关专业，具有2年以上ios开发经验；</p>\n' +
        '<p>2.具有扎实的Objective-C语言基础，具备主流开源框架的使用经验；</p>\n' +
        '<p>3.了解iOS不同系统版本的差异性，熟悉iOS app发布审核流程；</p>\n' +
        '<p>4. 熟练掌握iOS常用框架，系统运行机理，内存管理，多线程，对象生命周期，网络等；</p>\n' +
        '<p>5. 精通各种UI控件，能够实现复杂的界面交互；</p>\n' +
        '<p>6. 熟悉C++者优先；</p>\n' +
        '<p>薪资范围：8-10K</p>',
      created_at: '2021-03-24 17:59:23',
      updated_at: null
    },
    {
      id: 3,
      type: null,
      position: 'unity主程开发工程师（高级）',
      category: '技术',
      city: '成都',
      detail: '<p>1、游戏框架搭建；</p>\n' +
        '<p>2、带领团队完成游戏开发；</p>\n' +
        '<p>3、对团队的技术问题提出解决方案；</p>\n' +
        '<p>4、编写通用工具；</p>\n' +
        '<p>5、管理项目进度，及时完成开发工作；</p>\n' +
        '<p>任职要求</p>\n' +
        '<p>1、热爱游戏，热爱游戏开发，有做精品游戏意愿和意识；</p>\n' +
        '<p>2、本科以上计算机相关专业，五年以上Unity3D开发经验，并有完整手机游戏项目经验和上线作品展示；</p>\n' +
        '<p>3、熟悉shader,熟悉u3d材质,会编写简单shader优先</p>\n' +
        '<p>4、本科及以上&nbsp; 计算机及相关专业，具有扎实的软件开发功底；</p>\n' +
        '<p>5、.熟练掌握Unitiy3D开发环境及框架，以及C#等开发语言；</p>\n' +
        '<p>6、良好的团队合作意识，开放的心态，乐于和他人讨论并协同工作 有过项目管理经验优先考虑；</p>\n' +
        '<p>7、有较强的合作沟通能力，具备良好的英语阅读能力；</p>\n' +
        '<p>薪资范围：10-15K</p>',
      created_at: '2021-03-24 17:58:36',
      updated_at: '2021-03-24 18:01:53'
    },
    {
      id: 2,
      type: null,
      position: 'unity开发工程师（中级）',
      category: '技术',
      city: '成都',
      detail: '<p>1、负责独立完成轻量级的游戏开发；</p>\n' +
        '<p>2、负责对游戏进行调试和优化；</p>\n' +
        '<p>3、与相关负责人及美术讨论，开发需求和实现细节，保证游戏的质量和进度；</p>\n' +
        '<p>4、根据需求负责Unity3D打包Ios的相关问题；&nbsp;</p>\n' +
        '<p>5、根据需求合理的管理游戏源码，方便后期迭代和维护。</p>\n' +
        '<p>任职要求：</p>\n' +
        '<p>1、本科以上计算机相关专业，三年以上Unity3D经验；熟悉lua脚本，熟悉3D图形学，精通Unity3D引擎；</p>\n' +
        '<p>2、具有C++和C#编程基础，至少单独完整开发过一款游戏（轻量偏中量）；</p>\n' +
        '<p>3、精通Unity引擎 熟练掌握NGUI 和 UGUI进行行UI界面的开发以及动画界面制作；</p>\n' +
        '<p>4、具有iOS移动端适配经验；</p>\n' +
        '<p>5、熟悉资源管理及优化 熟练掌握动画系统和导航系统；</p>\n' +
        '<p>6、有一定的独立设计，完成编码能力，注重代码质量；</p>\n' +
        '<p>薪资范围：8-10K</p>',
      created_at: '2021-03-24 17:57:50',
      updated_at: null
    },
    {
      id: 1,
      type: null,
      position: 'unity开发工程师（初级）',
      category: '技术',
      city: '成都',
      detail: '<p>1、负责独立完成已有游戏的的bug调试和优化，并适配iOS所有设备；</p>\n' +
        '<p>2、负责独立完成已有游戏的二次开发；</p>\n' +
        '<p>3、根据需求负责游戏中各项功能设计及实现；</p>\n' +
        '<p>任职要求：</p>\n' +
        '<p>1、本科以上计算机相关专业，1～3年Unity3D引擎实际项目开发经验。&nbsp;</p>\n' +
        '<p>2、熟悉面向对象设计，设计模式。具有良好的编码习惯，严谨的编码风格。&nbsp;</p>\n' +
        '<p>3、熟练使用C语言（熟悉C或cocos2d愿意转unity3D的也可）。&nbsp;</p>\n' +
        '<p>4、熟练使用Unity3D编辑器，熟悉Unity3D游戏制作流程。&nbsp;</p>\n' +
        '<p>5、熟悉Unity3D引擎基本架构。熟悉Unity3D渲染，物理，资源管理，性能分析等模块，对Unity3D的组件系统有着深入的理解，熟练使用NGUI。</p>\n' +
        '<p>6、具有良好的团队精神，沟通能力，学习能力。&nbsp;</p>',
      created_at: '2021-03-24 17:57:02',
      updated_at: null
    }
  ]
  return {
    props: {
      info: data,
      jobList: jobResList//jobRes.data.list
    }, // will be passed to the page component as props
  }
}