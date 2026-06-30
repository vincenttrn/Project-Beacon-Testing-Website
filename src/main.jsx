import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from "react-helmet-async";
import './index.css'

import Navbar from './Navbar/Navbar.jsx'
import Homepage from './Homepage/Homepage.jsx'
import OurMission from './OurMission/OurMission.jsx'
import OurTeam from './OurTeam/OurTeam.jsx'
import Workshops from './Workshops/Workshops.jsx'
import Resources from './Resources/Resources.jsx'
import Enquire from './Enquire/Enquire.jsx'

import PrivacyPolicy from './PrivacyPolicy/PrivacyPolicy.jsx'
import TermsOfService from './TermsOfService/TermsOfService.jsx'
import Compliance from './Compliance/Compliance.jsx'
import ScrollToTop from './ScrollToTop/ScrollToTop.jsx'

import AlarmBotWorkshop from './Workshops/AlarmBotWorkshop.jsx'

import AlarmBotCode from './Resources/AlarmBotCode.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <ScrollToTop />

        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />

          <Route path="/our-mission" element={<OurMission />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/enquire" element={<Enquire />} />

          {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/compliance" element={<Compliance />} /> */}

          <Route path="/workshops/alarm-bot" element={<AlarmBotWorkshop />} />

          <Route path="/resources/alarm-bot-template-code" element={<AlarmBotCode />} />
        </Routes>
      </HelmetProvider>
    </BrowserRouter>
  </StrictMode>,
)