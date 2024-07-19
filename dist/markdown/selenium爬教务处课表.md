---
author: 孙百乐
categories:
- 刷题
date: 2020-11-16 20:45:35
draft: false
title: selenium爬教务处课表
---

```
from selenium import webdriver
from bs4 import BeautifulSoup
from selenium.webdriver import ActionChains
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def wait(xpath,driver):
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, xpath)))
```

```
#登录：
def login(driver):

    id_box = '//*[@id="userAccount"]'
    wait(id_box,driver)

    driver.find_element_by_xpath(id_box).send_keys('2007010218')

    password_box = '//*[@id="userPassword"]'
    driver.find_element_by_xpath(password_box).send_keys('2007010218')

    yan_zhen = '//*[@id="RANDOMCODE"]'
    driver.find_element_by_xpath(yan_zhen).click()
    time.sleep(5)
    
    login_btn = '//*[@id="btnSubmit"]'
    driver.find_element_by_xpath(login_btn).click()
    time.sleep(2)
    
    ke_biao = '/html/body/div[5]/a[2]/div'
    driver.find_element_by_xpath(ke_biao).click()
    time.sleep(2)
```

```
#执行
driver = webdriver.Chrome()
url = 'http://jwxt.upc.edu.cn/'
driver.get(url)
time.sleep(1)
login(driver)

driver.get_screenshot_as_file("C:\\Users\\Administrator\\Desktop\\kb.png")
driver.quit()


```

依次执行以上cell，1.打开chrome自动输入账号密码。2.有五秒钟的时间人工输入验证码。3.自动进入课表页面，自动截图，保存在桌面（保存文件夹在目录可能需要更改）