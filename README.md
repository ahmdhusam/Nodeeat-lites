# Express Eat API

## Project Description

Express Eat API is a robust backend service designed to power a food delivery platform. It provides a comprehensive set of features including user authentication, restaurant management, menu handling, cart operations, and order processing. The API is built with scalability and performance in mind, utilizing modern technologies and best practices in software development.

## Tech Stack

- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **TypeScript**: Programming language
- **PostgreSQL**: Database
- **TypeORM**: Object-Relational Mapping (ORM) tool
- **Swagger**: API documentation
- **Docker**: Containerization
- **Nodemailer**: Email sending functionality
- **JWT**: JSON Web Tokens for authentication
- **Bcrypt**: Password hashing
- **Joi**: Data validation

## Project Architecture

The project follows a layered architecture:

1. **Routes**: Handle incoming HTTP requests and define API endpoints.
2. **Controllers**: Process requests, interact with services, and send responses.
3. **Services**: Contain business logic and interact with repositories.
4. **Repositories**: Handle data access and interact with the database.
5. **Models**: Define data structures and entity relationships.
6. **Utilities**: Provide common functionalities used across the application.

## Project Structure

```
src/
├── common/
│   ├── exceptions/
│   ├── middlewares/
│   ├── schemas/
│   └── utils/
├── domain/
│   ├── controllers/
│   ├── models/
│   ├── repository/
│   ├── routes/
│   └── service/
├── index.ts
└── swagger.ts
```

- `common/`: Contains shared utilities, schemas, and custom exceptions.
- `domain/`: Houses the core business logic of the application.
- `index.ts`: Entry point of the application.
- `swagger.ts`: Swagger configuration for API documentation.

## Features and Sequence Diagrams

### 1. User Authentication

#### User Registration

Steps:
1. Client sends a POST request to /api/v1/auth/register with user data
2. AuthController receives the request and calls UserService
3. UserService checks if the user already exists
4. If not, UserService creates a new user and saves it to the database
5. UserService generates a verification token and sends it via email
6. AuthController returns a 201 Created response

```mermaid
sequenceDiagram
    participant Client
    participant AuthController
    participant UserService
    participant UserRepository
    participant EmailService
    participant Database

    Client->>AuthController: POST /api/v1/auth/register
    AuthController->>UserService: register(userData)
    UserService->>UserRepository: findOneBy(email)
    UserRepository->>Database: Query user
    alt User exists
        Database-->>UserRepository: User found
        UserRepository-->>UserService: User data
        UserService-->>AuthController: AlreadyExist error
        AuthController-->>Client: 400 Bad Request
    else User does not exist
        Database-->>UserRepository: User not found
        UserService->>UserService: hash_pass(password)
        UserService->>UserRepository: create_user(userData)
        UserRepository->>Database: Insert new user
        Database-->>UserRepository: User created
        UserService->>UserService: create_access_token(email)
        UserService->>EmailService: sendVerificationToken(email, token)
        EmailService-->>Client: Send verification email
        UserService-->>AuthController: User created
        AuthController-->>Client: 201 Created
    end
```

#### User Login

Steps:
1. Client sends a POST request to /api/v1/auth/login with credentials
2. AuthController receives the request and calls UserService
3. UserService verifies the credentials
4. If valid, UserService generates an access token
5. AuthController sets the access token as a cookie and returns it in the response

```mermaid
sequenceDiagram
    participant Client
    participant AuthController
    participant UserService
    participant UserRepository
    participant Database

    Client->>AuthController: POST /api/v1/auth/login
    AuthController->>UserService: login(email, password)
    UserService->>UserRepository: findOneBy(email)
    UserRepository->>Database: Query user
    alt User not found
        Database-->>UserRepository: User not found
        UserRepository-->>UserService: null
        UserService-->>AuthController: BadCredentials error
        AuthController-->>Client: 401 Unauthorized
    else User found
        Database-->>UserRepository: User data
        UserRepository-->>UserService: User data
        UserService->>UserService: verify_password(password, hashedPassword)
        alt Password incorrect
            UserService-->>AuthController: BadCredentials error
            AuthController-->>Client: 401 Unauthorized
        else Password correct
            alt User is deleted
                UserService-->>AuthController: EmailDeleted error
                AuthController-->>Client: 403 Forbidden
            else User is active
                UserService->>UserService: create_access_token(userData)
                UserService-->>AuthController: Access token
                AuthController-->>Client: 200 OK with access_token
            end
        end
    end
```

### 2. Restaurant Management

#### Create Restaurant

Steps:
1. Client sends a POST request to /api/v1/restaurants with restaurant data
2. RestaurantController receives the request and calls RestaurantService
3. RestaurantService checks if the restaurant already exists
4. If not, RestaurantService creates a new restaurant and saves it to the database
5. RestaurantController returns a 201 Created response

```mermaid
sequenceDiagram
    participant Client
    participant RestaurantController
    participant RestaurantService
    participant RestaurantRepository
    participant Database

    Client->>RestaurantController: POST /api/v1/restaurants
    RestaurantController->>RestaurantService: createRestaurant(restaurantData)
    RestaurantService->>RestaurantRepository: isExistBy(name)
    RestaurantRepository->>Database: Query restaurant
    alt Restaurant exists
        Database-->>RestaurantRepository: Restaurant found
        RestaurantRepository-->>RestaurantService: true
        RestaurantService-->>RestaurantController: ConflictException
        RestaurantController-->>Client: 409 Conflict
    else Restaurant does not exist
        Database-->>RestaurantRepository: Restaurant not found
        RestaurantRepository-->>RestaurantService: false
        RestaurantService->>RestaurantRepository: create(restaurantData)
        RestaurantRepository->>Database: Insert new restaurant
        Database-->>RestaurantRepository: Restaurant created
        RestaurantRepository-->>RestaurantService: Created restaurant
        RestaurantService-->>RestaurantController: Created restaurant
        RestaurantController-->>Client: 201 Created
    end
```

### 3. Menu Handling

#### Create Menu

Steps:
1. Client sends a POST request to /api/v1/restaurants/:restaurantId/menus with menu data
2. MenuController receives the request and calls MenuService
3. MenuService checks if the restaurant exists
4. MenuService checks if the menu category exists
5. MenuService creates a new menu and associated menu items
6. MenuController returns a 201 Created response

```mermaid
sequenceDiagram
    participant Client
    participant MenuController
    participant MenuService
    participant RestaurantService
    participant MenuCategoryService
    participant MenuRepository
    participant MenuItemService
    participant Database

    Client->>MenuController: POST /api/v1/restaurants/:restaurantId/menus
    MenuController->>MenuService: create(restaurantId, menuData)
    MenuService->>RestaurantService: isRestaurantExistBy(restaurantId)
    RestaurantService->>Database: Query restaurant
    alt Restaurant not found
        Database-->>RestaurantService: Restaurant not found
        RestaurantService-->>MenuService: false
        MenuService-->>MenuController: NotFoundException
        MenuController-->>Client: 404 Not Found
    else Restaurant exists
        Database-->>RestaurantService: Restaurant exists
        RestaurantService-->>MenuService: true
        MenuService->>MenuCategoryService: isMenuCategoryExistBy(menuCategoryId)
        MenuCategoryService->>Database: Query menu category
        alt Menu category not found
            Database-->>MenuCategoryService: Menu category not found
            MenuCategoryService-->>MenuService: false
            MenuService-->>MenuController: NotFoundException
            MenuController-->>Client: 404 Not Found
        else Menu category exists
            Database-->>MenuCategoryService: Menu category exists
            MenuCategoryService-->>MenuService: true
            MenuService->>MenuRepository: isExistBy(name)
            MenuRepository->>Database: Query menu
            alt Menu already exists
                Database-->>MenuRepository: Menu found
                MenuRepository-->>MenuService: true
                MenuService-->>MenuController: ConflictException
                MenuController-->>Client: 409 Conflict
            else Menu does not exist
                Database-->>MenuRepository: Menu not found
                MenuRepository-->>MenuService: false
                MenuService->>MenuRepository: create(menuData)
                MenuRepository->>Database: Insert new menu
                Database-->>MenuRepository: Menu created
                MenuService->>MenuItemService: createMany(menuItems)
                MenuItemService->>Database: Insert menu items
                Database-->>MenuItemService: Menu items created
                MenuService-->>MenuController: Created menu
                MenuController-->>Client: 201 Created
            end
        end
    end
```

### 4. Cart Operations

#### Add Item to Cart

Steps:
1. Client sends a POST request to /api/v1/carts/:customerId/items with item details
2. CartItemController receives the request and calls CartItemService
3. CartItemService retrieves the customer's cart
4. CartItemService checks if the menu item exists
5. CartItemService adds the item to the cart or updates the quantity if it already exists
6. CartItemController returns a 201 Created response

```mermaid
sequenceDiagram
    participant Client
    participant CartItemController
    participant CartItemService
    participant CartRepository
    participant MenuItemRepository
    participant Database

    Client->>CartItemController: POST /api/v1/carts/:customerId/items
    CartItemController->>CartItemService: AddCartItem(customerId, menuItemId, quantity)
    CartItemService->>CartRepository: findOneBy(customerId)
    CartRepository->>Database: Query cart
    alt Cart not found
        Database-->>CartRepository: Cart not found
        CartRepository-->>CartItemService: null
        CartItemService-->>CartItemController: NotFoundException
        CartItemController-->>Client: 404 Not Found
    else Cart found
        Database-->>CartRepository: Cart data
        CartRepository-->>CartItemService: Cart data
        CartItemService->>MenuItemRepository: findOneById(menuItemId)
        MenuItemRepository->>Database: Query menu item
        alt Menu item not found
            Database-->>MenuItemRepository: Menu item not found
            MenuItemRepository-->>CartItemService: null
            CartItemService-->>CartItemController: NotFoundException
            CartItemController-->>Client: 404 Not Found
        else Menu item found
            Database-->>MenuItemRepository: Menu item data
            MenuItemRepository-->>CartItemService: Menu item data
            CartItemService->>CartItemService: Update or add item to cart
            CartItemService->>CartRepository: save(updatedCart)
            CartRepository->>Database: Update cart
            Database-->>CartRepository: Cart updated
            CartRepository-->>CartItemService: Updated cart
            CartItemService-->>CartItemController: Updated cart
            CartItemController-->>Client: 200 OK
        end
    end
```

### 5. Order Processing

#### Place Order

Steps:
1. Client sends a POST request to /api/v1/orders/placeOrder/:customerId
2. OrderController receives the request and calls OrderService
3. OrderService retrieves the customer's cart
4. OrderService creates a new order from the cart items
5. OrderService saves the order to the database
6. OrderService clears the customer's cart
7. OrderController returns a 201 Created response

```mermaid
sequenceDiagram
    participant Client
    participant OrderController
    participant OrderService
    participant CartService
    participant OrderRepository
    participant Database

    Client->>OrderController: POST /api/v1/orders/placeOrder/:customerId
    OrderController->>OrderService: PlaceOrder(customerId)
    OrderService->>CartService: getCartByCustomerId(customerId)
    CartService->>Database: Query cart and items
    alt Cart not found
        Database-->>CartService: Cart not found
        CartService-->>OrderService: null
        OrderService-->>OrderController: NotFoundException
        OrderController-->>Client: 404 Not Found
    else Cart found
        Database-->>CartService: Cart data
        CartService-->>OrderService: Cart data
        OrderService->>OrderService: Create order from cart
        OrderService->>OrderRepository: save(newOrder)
        OrderRepository->>Database: Insert new order
        alt Order creation failed
            Database-->>OrderRepository: Error
            OrderRepository-->>OrderService: Error
            OrderService-->>OrderController: InternalServerError
            OrderController-->>Client: 500 Internal Server Error
        else Order created successfully
            Database-->>OrderRepository: Order created
            OrderRepository-->>OrderService: Created order
            OrderService->>CartService: clearCart(customerId)
            CartService->>Database: Clear cart items
            Database-->>CartService: Cart cleared
            OrderService-->>OrderController: Created order
            OrderController-->>Client: 201 Created
        end
    end
```

## Getting Started

### Prerequisites

- Node.js (v18.17.1 or later)
- Docker and Docker Compose
- PostgreSQL

### Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Start the PostgreSQL database: `docker-compose up -d postgres`
5. Run database migrations: `npm run typeorm migration:run`
6. Start the development server: `npm run start-dev`

The API will be available at `http://localhost:3000`. You can access the Swagger documentation at `http://localhost:3000/api/v1/docs`.

## API Documentation

Detailed API documentation is available through Swagger. After starting the server, visit `http://localhost:3000/api/v1/docs` to explore the API endpoints and test them interactively.

## License

This project is licensed under the ISC License.
