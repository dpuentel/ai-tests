export class GithubDiscussionController {
  async getComments (req, res) {
    try {
      const { owner, repo, discussionNumber } = req.params
      if (!owner || typeof owner !== 'string') {
        return res.status(400).json({ error: 'Missing owner' })
      }
      if (!repo || typeof repo !== 'string') {
        return res.status(400).json({ error: 'Missing repo' })
      }
      if (!discussionNumber || typeof discussionNumber !== 'string') {
        return res.status(400).json({ error: 'Missing discussion number' })
      }

      console.log(`Getting comments for: ${owner}/${repo}/${discussionNumber}`)

      const { first = 10, after = null } = req.query
      console.log(`Getting ${first} comments after ${after}`)

      const { githubDiscussionCommentsGetter } = await import('../services/github-discussion-comments-getter.js')
      const comments = await githubDiscussionCommentsGetter({ owner, repo, discussionNumber, first, after })
      res.send(comments)
    } catch (error) {
      console.error(`Error getting comments: ${error}`)
      res.status(500).json({ error: 'Unexpected server error' })
    }
  }
}
