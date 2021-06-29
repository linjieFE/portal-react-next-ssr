import React, { useContext, useMemo, useState } from 'react'
import { MyContext } from './myContext'
import styles from './join.module.scss'
import { Pagination } from 'antd';

const Offer = props => {
  const { jobList } = useContext(MyContext)
  const [cur, setCur] = useState(-1)
  const [curPage, setPage] = useState(1)
  const curList = useMemo(() => {
    const start = 20 * (curPage - 1)
    const end = 20 * curPage
    return jobList.slice(start, end)
  }, [curPage])
  return (
    <div className={styles.listOut}>
      <div className={styles.listContainer}>
        <div className={[styles.titBar, 'title-font', 'text-blk', 'font-18', 'flex-row', 'flex-jst-btw', 'flex-ali-center'].join(' ')}>
          <div className='flex-4 title-font text-blk'>职位名称</div>
          <div className='flex-2 title-font text-blk'>职位分类</div>
          <div className='flex-2 title-font text-blk'>城市</div>
          <div className='flex-1 title-font text-blk'></div>
        </div>
        {/* list */}
        {
          curList.map((item, idx) => {
            return (
              <div className={[styles.listItem, idx === cur && styles.listCur, 'cursor-pointer'].join(' ')} key={idx} onClick={() => setCur(idx)}>
                <div className={[styles.itemTit, 'flex-row', 'flex-jst-btw', 'flex-ali-center', 'font-16'].join(' ')}>
                  <div className='flex-4 text-blk'>{item.position}</div>
                  <div className='flex-2 text-blk'>{item.category}</div>
                  <div className='flex-2 text-blk'>{item.city}</div>
                  <div className={['flex-1', 'text-blk', 'flex-row', 'flex-jst-center', 'flex-ali-center', styles.iconContainer].join(' ')}>
                    <div className={styles.iconRow}></div>
                    <div className={styles.iconCol}></div>
                  </div>
                </div>
                <div className={styles.itemDetail}>
                  <div dangerouslySetInnerHTML={{ __html: item.detail }}></div>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className='full-width flex-row flex-jst-center flex-ali-center cus-pagenation'>
        <Pagination defaultPageSize={25} total={jobList.length} current={curPage} onChange={(page, pageSize) => setPage(page)} showSizeChanger={false}></Pagination>
      </div>
    </div>
  )
}

export default Offer