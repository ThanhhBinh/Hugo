import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { ScrollProgress } from './components/layout/ScrollProgress'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Education } from './components/sections/Education'
import { Experience } from './components/sections/Experience'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { Toolbox } from './components/sections/Toolbox'
import { LanguageProvider } from './i18n/LanguageProvider'

export default function App() {
  return (
    <LanguageProvider>
      <ScrollProgress />
      <Header />
      <main id="top">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Toolbox />
        <Education />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  )
}
