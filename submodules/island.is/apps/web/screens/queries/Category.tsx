import gql from 'graphql-tag'

import { processEntryFields } from './fragments'

export const GET_CATEGORIES_QUERY = gql`
  query GetArticleCategories($input: GetArticleCategoriesInput!) {
    getArticleCategories(input: $input) {
      id
      title
      description
      slug
    }
  }
`

export const GET_ARTICLES_QUERY = gql`
  query getArticles($input: GetArticlesInput!) {
    getArticles(input: $input) {
      intro
      importance
      category {
        title
      }
      slug
      title
      body {
        ...ProcessEntryFields
      }
      processEntryButtonText
      processEntry {
        ...ProcessEntryFields
      }
      group {
        slug
        title
        description
        importance
      }
      subgroup {
        title
        importance
      }
      otherCategories {
        title
      }
      otherSubgroups {
        title
        slug
        importance
      }
      otherGroups {
        title
        slug
        importance
      }
    }
  }
  ${processEntryFields}
`

export const GET_CATEGORY_PAGES_QUERY = gql`
  query getCategoryPages($input: GetCategoryPagesInput!) {
    getCategoryPages(input: $input) {
      ... on Article {
        id
        importance
        category {
          title
        }
        slug
        title
        body {
          ...ProcessEntryFields
        }
        processEntryButtonText
        processEntry {
          ...ProcessEntryFields
        }
        group {
          slug
          title
          description
          importance
        }
        subgroup {
          title
          importance
        }
        otherCategories {
          title
        }
        otherSubgroups {
          title
          slug
          importance
        }
        otherGroups {
          title
          slug
          importance
          description
        }
      }
      ... on Manual {
        id
        importance
        category {
          title
        }
        slug
        title
        group {
          slug
          title
          description
          importance
        }
        subgroup {
          title
          importance
        }
        otherCategories {
          title
        }
        otherSubgroups {
          title
          slug
          importance
        }
        otherGroups {
          title
          slug
          importance
          description
        }
      }
    }
  }
  ${processEntryFields}
`
