import composeWithJson from 'graphql-compose-json'


const restApiResponse = {

    id: 41,
    slug: "view-menu",
    status: "publish",
    type: "header",
    link: "http://localhost:8080/header/view-menu/",
    title: {
        rendered: "View Menu"
    },
    content: {
        rendered: "Content",
    },

    acf: {
        background_image: "http://localhost:8080/wp-content/uploads/2018/06/burgher.jpg",
        hero_image: "heroimg"
    },
}

export const PageTC = composeWithJson('Page', restApiResponse)
export const PageGraphQLType = PageTC.getType()

