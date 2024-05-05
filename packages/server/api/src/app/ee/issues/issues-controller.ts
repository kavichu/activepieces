import { FastifyPluginAsyncTypebox, Type  } from '@fastify/type-provider-typebox'
import { issuesService } from './issues-service'
import { ListIssuesParams, UpdateIssueRequestBody } from '@activepieces/ee-shared'
import { ApId, PrincipalType } from '@activepieces/shared'

export const issuesController: FastifyPluginAsyncTypebox = async (app) => {
    app.get('/', ListIssuesRequest, async (req) => {
        return issuesService.list({
            projectId: req.query.projectId,
            cursor: req.query.cursor,
            limit: req.query.limit ?? 10,
        })
    })
    
    app.post('/:id', UpdateIssueRequest, async (req) => {
        return issuesService.updateById(req.params.id, req.body.status)
    })
}

const ListIssuesRequest = {
    config: {
        allowedPrincipals: [
            PrincipalType.USER,
        ],
    },
    schema: {
        querystring: ListIssuesParams,
    },
}

const UpdateIssueRequest = {
    config: {
        allowedPrincipals: [
            PrincipalType.USER,
        ],
    },
    
    schema: {
        params: Type.Object({
            id: ApId,
        }),
        body: UpdateIssueRequestBody,
    },
}
