import React, { useState } from 'react';
import Layout from '@/components/layouts/layout';
import LeftSide from '@/components/layouts/leftSide';
import MemberSidebar from '@/components/shirley/memberSidebar';
import Tab from '@/components/tab';
import styles from '@/components/layouts/layout.module.css';
import stylesModify from '@/styles/shirley/modify.module.css';
import Input from '@/components/shirley/input';
import { FaLine } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import BtnPrimary from '@/components/buttons/btn-fill-primary';
import BtnLight from '@/components/buttons/btn-fill-light';

export default function Modify() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabItemss = ['更新個人資訊', '更新密碼'];

  return (
    <Layout>
      <LeftSide>
        <MemberSidebar />
      </LeftSide>
      <div className={styles.main}>
        <Tab
          tabItems={tabItemss}
          activeTab={activeTab}
          handleTabClick={handleTabClick}
        />

        {activeTab === 0 ? (
          <>
            <div className={stylesModify['input-content']}>
              <div className={stylesModify['input-row']}>
                <div className={stylesModify['input-box']}>
                  <div className={stylesModify['input-label']}>帳號</div>
                  <div className={stylesModify['input-type']}>
                    candy123456@gmail.com
                  </div>
                </div>
                <div className={stylesModify['input-box']}>
                  <div className={stylesModify['input-label']}>會員等級</div>
                  <div className={stylesModify['input-type']}>一般會員</div>
                </div>
              </div>

              <div className={stylesModify['input-row']}>
                <div className={stylesModify['input-box']}>
                  <div className={stylesModify['input-label']}>手機號碼</div>
                  <div className={stylesModify['input-type']}>
                    0921-332-159
                  </div>
                </div>
                <div className={stylesModify['input-box']}>
                  <div className={stylesModify['input-label']}>生日</div>
                  <div className={stylesModify['input-type']}>1945-07-03</div>
                </div>
              </div>

              <div className={stylesModify['input-row']}>
                <div className={stylesModify['input-box2']}>
                  <div className={stylesModify['input-label3']}>常用地址</div>
                  <div className={stylesModify['input-type2']}>
                    <Input />
                    <Input />
                  </div>
                </div>
              </div>

              <div className={stylesModify['input-row3']}>
                <div className={stylesModify['input-type3']}>
                  <Input />
                </div>
              </div>
            </div>

            <div className={stylesModify['input-content2']}>
              <div className={stylesModify['input-row']}>
                <div className={stylesModify['input-box3']}>
                  <div className={stylesModify['input-label']}>快速登入設定</div>
                  <div className={stylesModify['input-type4']}>
                    <div className={stylesModify['third-btn-box']}>
                      <FaLine className={stylesModify['third-btn-icon']} />
                      未綁定
                    </div>
                    <div className={stylesModify['third-btn-box']}>
                      <FcGoogle className={stylesModify['third-btn-icon']} />
                      已綁定
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={stylesModify['input-content2']}>
              <div className={stylesModify['input-row']}>
                <div className={stylesModify['input-box4']}>
                  <div className={stylesModify['input-label']}>裝置綁定</div>
                  <div className={stylesModify['input-type2']}>
                    <div className={stylesModify['third-btn-box2']}>
                      <img
                        src="/garmin-logo-14.png"
                        className={stylesModify['third-btn-icon2']}
                      />
                      未綁定
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={stylesModify['third-btn-box3']}>
              <BtnLight>取消</BtnLight>
              <BtnPrimary>確認送出</BtnPrimary>
            </div>
          </>
        ) : (
          <>
            <div className={stylesModify['input-content']}>
              <div className={stylesModify['input-row']}>
                <div className={stylesModify['input-box2']}>
                  <div className={stylesModify['input-label2']}>
                    目前密碼
                  </div>
                  <div className={stylesModify['input-type3']}>
                    <Input />
                  </div>
                </div>
              </div>

              <div className={stylesModify['input-row']}>
                <div className={stylesModify['input-box2']}>
                  <div className={stylesModify['input-label2']}>新密碼</div>
                  <div className={stylesModify['input-type3']}>
                    <Input />
                  </div>
                </div>
              </div>

              <div className={stylesModify['input-row']}>
                <div className={stylesModify['input-box2']}>
                  <div className={stylesModify['input-label2']}>
                    新密碼確認
                  </div>
                  <div className={stylesModify['input-type3']}>
                    <Input />
                  </div>
                </div>
              </div>
            </div>

            <div className={stylesModify['third-btn-box4']}>
              <BtnLight>重新填寫</BtnLight>
              <BtnPrimary>確認送出</BtnPrimary>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
