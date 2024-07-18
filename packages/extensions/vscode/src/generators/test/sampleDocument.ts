import { OpenAPIV3_1 } from '../types';

const sampleOpenAPIDocument: OpenAPIV3_1.Document = {
  openapi: '3.1.0',
  info: {
    title: 'Sample API',
    version: '1.0.0',
  },
  paths: {
    '/example': {
      get: {
        summary: 'Example GET endpoint',
        description: 'Returns a list of examples',
        responses: {
          '200': {
            description: 'A list of examples',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        example: '1',
                      },
                      name: {
                        type: 'string',
                        example: 'Example name',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Example POST endpoint',
        description: 'Creates a new example',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    example: 'New example',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Example created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      example: '1',
                    },
                    name: {
                      type: 'string',
                      example: 'New example',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default sampleOpenAPIDocument;
