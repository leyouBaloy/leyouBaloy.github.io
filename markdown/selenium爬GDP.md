---
author: 孙百乐
categories:
- 刷题
date: 2020-12-01 23:11:02
draft: false
title: selenium爬GDP
---

```
from selenium import webdriver
from bs4 import BeautifulSoup
import csv

out = open('d:/data.csv','w', newline='')
csv_write = csv.writer(out,dialect='excel')

for year in range(1960,2018):
    driver = webdriver.Chrome()
    url = "https://www.kylc.com/stats/global/yearly/g_gdp/%d.html"%year
    xpath = "/html/body/div[2]/div[1]/div[5]/div[1]/div/div/div/table"
    driver.get(url)
    table1 = driver.find_element_by_xpath(xpath).get_attribute("innerHTML")

    out = open('d:/data.csv','w', newline='')
    csv_write = csv.writer(out,dialect='excel')

    soup = BeautifulSoup(table1,"html.parser")
    table = soup.find_all('tr')
    for row in table:
        cols = [col.text for col in row.find_all('td')]
        if len(cols)==0 or not cols[0].isdigit():
            continue
        cols.append(year)   
        csv_write.writerow(cols)
        print(cols)
    
driver.close()
```