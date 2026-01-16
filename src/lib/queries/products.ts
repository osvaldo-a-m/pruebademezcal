// GraphQL queries for WooCommerce products

export const GET_PRODUCTS_QUERY = `
  query GetProducts($first: Int = 100, $after: String) {
    products(first: $first, after: $after, where: { status: "publish" }) {
      nodes {
        id
        databaseId
        name
        slug
        description
        shortDescription
        onSale
        featured
        averageRating
        reviewCount
        ... on SimpleProduct {
          price
          regularPrice
          salePrice
          stockStatus
          stockQuantity
        }
        image {
          id
          sourceUrl
          altText
          title
        }
        galleryImages {
          nodes {
            id
            sourceUrl
            altText
            title
          }
        }
        productCategories {
          nodes {
            id
            name
            slug
            description
          }
        }
        sku
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_PRODUCT_BY_SLUG_QUERY = `
  query GetProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      databaseId
      name
      slug
      description
      shortDescription
      onSale
      featured
      averageRating
      reviewCount
      ... on SimpleProduct {
        price
        regularPrice
        salePrice
        stockStatus
        stockQuantity
      }
      image {
        id
        sourceUrl
        altText
        title
      }
      galleryImages {
        nodes {
          id
          sourceUrl
          altText
          title
        }
      }
      productCategories {
        nodes {
          id
          name
          slug
          description
        }
      }
      sku
      related {
        nodes {
          id
          databaseId
          name
          slug
          onSale
          ... on SimpleProduct {
            price
            regularPrice
            salePrice
          }
          image {
            id
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_CATEGORIES_QUERY = `
  query GetProductCategories {
    productCategories(first: 100, where: { hideEmpty: true }) {
      nodes {
        id
        name
        slug
        description
        count
        image {
          id
          sourceUrl
          altText
        }
      }
    }
  }
`;
