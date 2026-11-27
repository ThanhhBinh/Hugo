import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { ScrollProgress } from './components/layout/ScrollProgress'
import { Contact } from './components/sections/Contact'
import { Education } from './components/sections/Education'
import { Experience } from './components/sections/Experience'
import { Goals } from './components/sections/Goals'
import { Hero } from './components/sections/Hero'
import { Highlights } from './components/sections/Highlights'
import { Projects } from './components/sections/Projects'
import { Services } from './components/sections/Services'
import { Toolbox } from './components/sections/Toolbox'
import { LanguageProvider } from './i18n/LanguageProvider'
import { SceneLayer } from './scene/SceneLayer'

export default function App() {
  return (
    <LanguageProvider>
      <SceneLayer />
      <ScrollProgress />
      <Header />
      <main id="top">
        <Hero />
        <Highlights />
        <Projects />
        <Services />
        <Experience />
        <Toolbox />
        <Goals />
        <Education />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  )
}
