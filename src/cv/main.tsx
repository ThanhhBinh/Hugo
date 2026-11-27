import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { isLang, type Lang } from '../i18n/types'
import { CvDocument } from './CvDocument'
import './cv.css'

const param = new URLSearchParams(window.location.search).get('lang')
const lang: Lang = isLang(param) ? param : 'en'
document.documentElement.lang = lang

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CvDocument lang={lang} />
  </StrictMode>,
)
