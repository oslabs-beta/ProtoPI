# ProtoPI - OpenAPI Designer & HTTP Client for VS Code

ProtoPI is a Visual Studio Code extension that empowers developers to design, test, and mock their APIs using the OpenAPI (Swagger) specification directly within the editor. With integrated HTTP client functionality and a built-in mock server powered by Stoplight Prism, ProtoPI simplifies API development by providing a seamless workflow.

## Features

- **OpenAPI Designer**: Craft and edit your API definitions using the OpenAPI standard. ProtoPI supports YAML and JSON formats with syntax highlighting and validation.
- **HTTP Client Functionality**: Test your API endpoints directly from VS Code with an intuitive HTTP client built into the extension.
- **Built-In Mock Server**: Instantly mock your API responses using Stoplight Prism, allowing you to simulate server behavior without needing to deploy.

![OpenAPI Designer](images/openapi-designer.png)
_Screenshot of the OpenAPI designer within ProtoPI._

> Tip: Consider using short animations or GIFs to demonstrate how to use the key features of ProtoPI.

## Importance of OpenAPI as a Source of Truth

The OpenAPI Specification is the industry standard for defining RESTful APIs. By using OpenAPI as the single source of truth, you ensure consistency across your documentation, client generation, and server implementations. ProtoPI embraces this philosophy, making it easy to design, test, and mock APIs that adhere to the OpenAPI standard.

Learn more about the [OpenAPI Specification](https://www.openapis.org/).

## Stoplight Prism - Mock Server Instances

ProtoPI uses [Stoplight Prism](https://stoplight.io/open-source/prism) as its mock server engine. Prism is a powerful tool that enables you to generate dynamic mock servers based on your OpenAPI specifications. With Prism integrated into ProtoPI, you can quickly test your API's behavior without needing to deploy the backend, speeding up development and reducing friction in your workflow.

## Future State

- **Request Collections**: Organize and manage your API requests in collections, similar to popular tools like Postman.
- **API Documentation Generation**: Automatically generate and export API documentation directly from your OpenAPI specs.
- **Collaboration Features**: Share and collaborate on API designs with team members within VS Code.
- **Advanced Mocking Capabilities**: Enhanced support for complex scenarios, including dynamic responses and advanced validation.

## Requirements

- Visual Studio Code version 1.50.0 or higher
- Node.js version 12.0.0 or higher

# Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/protopi.git
   cd protopi
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Start the development build process:
   ```bash
   yarn watch
   ```
4. Open project in Visual Studio Code:
   ```bash
   code.
   ```
5. Open project in Visual Studio Code:
   Press F5 or go to Run > Start Debugging.
   This will open a new VS Code Debug window with the extension loaded.

## Extension Settings

This extension contributes the following settings:

- `protopi.basePath`: Base path for storing API definitions and Collections
- `protopi.mockServer.port`: Set the port for the built-in mock server.

## Known Issues

- Some users may experience performance issues with very large OpenAPI files.
- Limited support for certain advanced OpenAPI features like polymorphism and allOf.

Please report any issues on our [GitHub Issues page](https://github.com/oslabs-beta/ProtoPI/issues).

## Release Notes

### 1.0.0

- Initial release of ProtoPI.
- Support for OpenAPI Specification Designer, HTTP Client, and basic mock server.

### 1.1.0

- Added support for advanced OpenAPI features.
- Improved performance with large files.

---

## Following Extension Guidelines

Ensure that you've read through the extension guidelines and followed the best practices for creating your extension.

- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## How to Contribute

We welcome contributions from the community! Here's how you can get involved:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
