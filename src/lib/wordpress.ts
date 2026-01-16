import { GraphQLClient } from 'graphql-request';

// Get WordPress API URL from environment variables
const WORDPRESS_API_URL = import.meta.env.WORDPRESS_API_URL || 'https://your-wordpress-site.com/graphql';

// Initialize GraphQL client
export const graphqlClient = new GraphQLClient(WORDPRESS_API_URL, {
    headers: {
        'Content-Type': 'application/json',
    },
});

// Helper function to handle GraphQL requests with error handling
export async function fetchGraphQL<T>(
    query: string,
    variables?: Record<string, any>
): Promise<T> {
    try {
        const data = await graphqlClient.request<T>(query, variables);
        return data;
    } catch (error) {
        console.error('GraphQL request failed:', error);
        throw new Error(`Failed to fetch data from WordPress: ${error}`);
    }
}

// Helper function for authenticated requests (if needed)
export async function fetchGraphQLAuthenticated<T>(
    query: string,
    variables?: Record<string, any>,
    token?: string
): Promise<T> {
    try {
        const client = new GraphQLClient(WORDPRESS_API_URL, {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        });

        const data = await client.request<T>(query, variables);
        return data;
    } catch (error) {
        console.error('Authenticated GraphQL request failed:', error);
        throw new Error(`Failed to fetch authenticated data: ${error}`);
    }
}
