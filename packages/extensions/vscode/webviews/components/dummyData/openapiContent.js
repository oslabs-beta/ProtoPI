// webviews/components/sidebar/tabs/openapiContent.js
export const yamlContent = `openapi: 3.0.0
info:
  title: Sample API
  version: 0.1.9
paths:
  /users:
    get:
      summary: Returns a list of users.
      responses:
        '200':
          description: A JSON array of user names
          content:
            application/json:
              schema:
                type: array
                items:
                  type: string
    post:
      summary: Create a new user.
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                name:
                  type: string
                email:
                  type: string
      responses:
        '201':
          description: User created successfully.
  /users/{id}:
    get:
      summary: Get user by ID.
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: A user object
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: string
                  name:
                    type: string
                  email:
                    type: string
    put:
      summary: Update a user.
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                name:
                  type: string
                email:
                  type: string
      responses:
        '200':
          description: User updated successfully.
    delete:
      summary: Delete a user.
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '204':
          description: User deleted successfully.
  /products:
    get:
      summary: Returns a list of products.
      responses:
        '200':
          description: A JSON array of products
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    id:
                      type: string
                    name:
                      type: string
                    price:
                      type: number
    post:
      summary: Create a new product.
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                name:
                  type: string
                price:
                  type: number
      responses:
        '201':
          description: Product created successfully.
  /products/{id}:
    get:
      summary: Get product by ID.
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: A product object
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: string
                  name:
                    type: string
                  price:
                    type: number
    put:
      summary: Update a product.
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                name:
                  type: string
                price:
                  type: number
      responses:
        '200':
          description: Product updated successfully.
    delete:
      summary: Delete a product.
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '204':
          description: Product deleted successfully.
  /orders:
    get:
      summary: Returns a list of orders.
      responses:
        '200':
          description: A JSON array of orders
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    id:
                      type: string
                    product_id:
                      type: string
                    quantity:
                      type: integer
                    total:
                      type: number
    post:
      summary: Create a new order.
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                product_id:
                  type: string
                quantity:
                  type: integer
      responses:
        '201':
          description: Order created successfully.
  /orders/{id}:
    get:
      summary: Get order by ID.
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: An order object
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: string
                  product_id:
                    type: string
                  quantity:
                    type: integer
                  total:
                    type: number
    put:
      summary: Update an order.
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                product_id:
                  type: string
                quantity:
                  type: integer
      responses:
        '200':
          description: Order updated successfully.
    delete:
      summary: Delete an order.
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '204':
          description: Order deleted successfully.`;
