import { getGithubToken } from './enviroment-configs.js'

/**
 * @param {string} owner The owner of the repo
 * @param {string} repo The repo name
 * @param {number} discussionNumber The discussion number ID
 * @param {number} first The number of comments to get in ASC order
 * @param {string} after The cursor to get the next comments from
 * @returns {Promise<{ body: string, cursor: string }[]>} The comments
 */
export const githubDiscussionCommentsGetter = async ({ owner, repo, discussionNumber, first, after }) => {
  const query = `query {
    repository(owner: "${owner}", name: "${repo}") {
      discussion(number: ${discussionNumber}) {
        answer {
          body
        }
        comments(first:${first}, after: ${after ? `"${after}"` : null}) {
          edges{
            cursor
          }
          nodes {
            body
          }
        }
      }
    }
  }`

  const variables = {}

  const options = {
    method: 'POST',
    headers: {
      'Accept-Encoding': 'gzip, deflate, br',
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Connection: 'keep-alive',
      Origin: 'devfest-workshop',
      Authorization: `bearer ${getGithubToken()}`
    },
    body: JSON.stringify({ query, variables })
  }

  const response = await fetch('https://api.github.com/graphql', options)
  const json = await response.json()
  const comments = json?.data?.repository?.discussion?.comments

  if (!comments || !comments?.nodes?.length) {
    return []
  }

  const cursors = comments.edges.map(edge => edge.cursor)
  const bodies = comments.nodes.map(node => node.body)

  return bodies.map((body, index) => ({ body, cursor: cursors[index] }))
}
