import { Router } from 'express'
import { GITHUB_DISCUSSIONS_COMMENTS_ROUTE } from '../constants.js'
import { GithubDiscussionController } from '../controllers/github-discussion.js'

export const defaultRouter = () => {
  const router = Router()
  const githubDiscussionController = new GithubDiscussionController()

  router.get('/', (req, res) => {
    res.send('Server is running')
  })
  router.get(`${GITHUB_DISCUSSIONS_COMMENTS_ROUTE}/:owner/:repo/:discussionNumber`, githubDiscussionController.getComments)

  return router
}
