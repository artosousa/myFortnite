import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PlayerData from '../components/player-data';
import "../layout/font-face.css"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <PlayerData/>
  </Layout>

  

)

export default IndexPage
