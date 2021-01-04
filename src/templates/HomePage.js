import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import PostSection from '../components/PostSection'

// Export Template for use in CMS preview
export const HomePageTemplate = ({
  posts = []
}) => (
  <main className="Home">
    {!!posts.length && (
      <section className="section">
        <div className="container">
          <div style={{display:'flex',marginBottom: 16}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
              <div
                className="MeImage"
                style={{
                  backgroundImage: `url(/images/me.png)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: 64,
                  height:64,
                  borderRadius:32,
                }}
              />
              <p style={{color:'#ee0d51',marginTop:4}}>ぞえ</p>
            </div>
            <div style={{width:'80vw',marginLeft:8}}>23才の時、プログラミング歴1年でフリーランスエンジニアになり、現在はフルリモートで各地を転々としながら働いています。このブログでは友達にオススメの物を紹介したり、結構自由に運用していこうと思っています。
            GatsbyとNetlifyで作ったので、運用費ゼロですし早くないですか？笑笑
            </div>
          </div>
          <PostSection posts={posts} />
        </div>
      </section>
    )}
  </main>
)

// Export Default HomePage for front-end
const HomePage = ({ data: { page, posts } }) => (
  <Layout meta={page.frontmatter.meta || false}>
    <HomePageTemplate
      {...page}
      {...page.frontmatter}
      body={page.html}
      posts={posts.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
    }))}

    />
  </Layout>
)

export default HomePage

export const pageQuery = graphql`
  ## Query for HomePage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query HomePage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        subtitle
        featuredImage
      }
    }
    
    posts: allMarkdownRemark(
      filter: {fields: { contentType: { eq: "posts" } }, frontmatter: {status: {eq: "Published"}}},
      sort: {order: DESC, fields: [frontmatter___date]}
    ) {
      edges {
        node {
          excerpt(truncate: true, pruneLength: 50)
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "YYYY/MM/DD")
            featuredImage
          }
        }
      }
    }
  }
`
