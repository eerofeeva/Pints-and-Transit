from bs4 import BeautifulSoup as bs
import time
import requests
import pymongo
from splinter import Browser
import pandas as pd
import warnings

warnings.filterwarnings('ignore')

mars_content = {}

def scrape():

    executable_path = {'executable_path': 'c:/bin/chromedriver'}
    browser = Browser('chrome', **executable_path, headless=False)
    
    ### NASA Mars News
    url = 'https://mars.nasa.gov/news/'

    browser.visit(url)
    html = browser.html
    soup = bs(html, 'html.parser')

    blurb = soup.select_one('ul.item_list li.slide')
    title = blurb.find("div", class_='content_title').get_text()

    news_p = blurb.find("div", class_='rollover_description_inner').get_text()

    ### JPL Mars Space Images - Featured Image
    time.sleep(2)
    url2 = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    browser.visit(url2)

    browser.click_link_by_id('full_image')
    browser.click_link_by_partial_href('/spaceimages/details')

    html = browser.html
    soup = bs(html, 'html.parser')

    lede = soup.find('figure', class_='lede')
    link = lede.find('a')
    href = link['href']

    features_image_url = 'https://www.jpl.nasa.gov' + href

    ### Mars Facts
    time.sleep(2)
    url3 = 'https://space-facts.com/mars/'
    browser.visit(url3)

    tables = pd.read_html(url3)

    type(tables)
    df = tables[0]
    df.columns = ['Mars Facts', '']

    df.set_index('Mars Facts', inplace=True)

    html_table = df.to_html()
    html_table = html_table.replace('\n', '')

    ### Mars Hemispheres
    time.sleep(2)
    url4 = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    browser.visit(url4)

    html = browser.html
    soup = bs(html, 'html.parser')

    dict_list = []

    items = soup.find_all('div', class_='item')

    for item in items:
        h3 = item.find('h3').get_text()
        h3 = h3.replace(' Enhanced','')
        dict = {"title": h3}

        browser.find_by_tag('h3').click()
        browser.find_by_id('wide-image')

        html = browser.html
        soup = bs(html, 'html.parser')

        downloads = soup.find('div', class_='downloads')
        li = downloads.find('li')
        link1 = li.find('a')
        href1 = link1['href']

        dict.update({"img_url": href1})
        dict_list.append(dict)

        browser.visit(url4)

    mars_content = {
        "news_title": title,
        "news_p": news_p,
        "features_image_url": features_image_url,
        "html_table": html_table,
        "hemeispheres": dict_list
    }

    browser.quit()

    return mars_content