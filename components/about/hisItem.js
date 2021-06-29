import React, { useEffect, useState } from 'react'
import styles from './about.module.scss'
import useInView from 'react-cool-inview'
export default function HisItem({ item, idx, ...props }) {
  const [isIE, setIE] = useState(false)
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    if(userAgent.indexOf("trident") !== -1){
			setIE(true)
		}
  })
  const { ref, inView } = useInView({
    // Stop observe when the target enters the viewport, so the "inView" only triggered once
    unobserveOnEnter: true,
    // Shrink the root margin, so the animation will be triggered once the target reach a fixed amount of visible
    rootMargin: "-50px",
  });
  return isIE ? (
    <div className='flex-row flex-jst-center flex-ali-center full-width' ref={ref}>
      <div className={[styles.listItem, idx % 2 === 1 ? 'flex-row' : 'flex-row-reverse', 'flex-jst-start', 'flex-ali-start', styles.listItem, idx % 2 === 1 ? styles.rightSide : styles.leftSide].join(' ')}
      style={{opacity: 1}}
      >
        <div className={[styles.titCircle]}>
          <div></div>
        </div>
        <div className={[styles.listWord, 'flex-1', 'flex-col', 'flex-jst-start', idx % 2 === 1 ? 'flex-ali-start' : 'flex-ali-end'].join(' ')}>
          <h2 className='title-font font-20 text-normal'>{item.year}</h2>
          <p className='font-16 text-normal'>{item.word}</p>
        </div>
        {/* <div className={[styles.itemImg, 'flex-row', 'flex-jst-center', 'flex-ali-center'].join(' ')}> */}
          {/* <img src={item.img} alt="" /> */}
        {/* </div> */}
        <div></div>
      </div>
    </div>
  ) : (
    <div className='flex-row flex-jst-center flex-ali-center full-width' ref={ref}>
      <div className={[styles.listItem, idx % 2 === 1 ? 'flex-row' : 'flex-row-reverse', 'flex-jst-start', 'flex-ali-start', styles.listItem, idx % 2 === 1 ? styles.rightSide : styles.leftSide].join(' ')}
      style={{opacity: inView ? 1 : 0}}
      >
        <div className={[styles.titCircle]}>
          <div></div>
        </div>
        <div className={[styles.listWord, 'flex-1', 'flex-col', 'flex-jst-start', idx % 2 === 1 ? 'flex-ali-start' : 'flex-ali-end'].join(' ')}>
          <h2 className='title-font font-20 text-normal'>{item.year}</h2>
          <p className='font-16 text-normal'>{item.word}</p>
        </div>
        {/* <div className={[styles.itemImg, 'flex-row', 'flex-jst-center', 'flex-ali-center'].join(' ')}> */}
          {/* <img src={item.img} alt="" /> */}
        {/* </div> */}
        <div></div>
      </div>
    </div>
  )
}