# Approach Document for Wedbush Backend Developer Technical Challenge

## 1. Understanding the Requirements

The challenge requires building an order splitter API for a robo-advisor to automate investments based on model portfolios. The API must:

- Accept a model portfolio (stocks with allocation percentages) and a total investment amount as input.
- Output the amount and number of shares to purchase or sell for each stock, along with when to execute the orders (considering market hours: Monday–Friday).
- Provide access to historic orders.
- Support configurable decimal places for share quantities and use a default stock price of $100 unless a market price is provided.
- Follow RESTful conventions, instrument response times, and store data in-memory (no persistence after restart).
- Support both BUY and SELL orders.

The example provided illustrates a user investing $100 in a portfolio with AAPL (60%) and TSLA (40%), expecting outputs like $60 (0.6000000 shares) for AAPL and $40 (0.4000000 shares) for TSLA.

## 2. Plan the Solution

To address the requirements efficiently, I devised the following plan:

### 2.1 Tech Stack

- **Node.js with TypeScript**: For robust, type-safe backend development.
- **Express.js**: To build RESTful APIs quickly and handle routing.
- **Day.js**: To manage market hours and calculate execution times (e.g., next market open).
- **Custom Logger**: A lightweight, custom-built logger to instrument response times in milliseconds and output them to the console, meeting performance monitoring needs without external dependencies.
- **In-memory Storage**: To store historic orders, ensuring data does not persist after restart.

### 2.2 API Design

Design RESTful endpoints to handle the functional requirements:

- **POST /orders**:
  - Input: Model portfolio (array of stocks with symbols, allocations, optional market prices), total amount, and order type (BUY/SELL).
  - Output: Order details, including the breakdown of amounts and shares per stock, execution time, and metadata (ID, creation time).
- **GET /orders**:
  - Output: List of all historic orders stored in-memory.
- **Configuration**: Use a configuration file to manage the number of decimal places for share quantities, allowing flexibility for future changes.

### 2.3 Key Components

- **Models**: Define interfaces for stocks, orders, and API inputs/outputs to ensure type safety.
- **Service Layer**: Encapsulate business logic, including:
  - Splitting the investment based on allocation percentages.
  - Calculating share quantities using default ($100) or provided market prices.
  - Determining execution time based on market hours (Monday–Friday).
  - Storing orders in-memory for historic retrieval.
- **Controllers and Routes**: Handle HTTP requests, validate inputs, and return responses.
- **Logging**: Use a custom logger to instrument response times in milliseconds, formatted and output to the console for performance monitoring.

### 2.4 Assumptions

To address ambiguity in the requirements, I made the following assumptions:

- The model portfolio provided in the input includes stock symbols (e.g., AAPL, TSLA), allocation percentages (summing to 100%), and optional market prices.
- Stock prices default to $100 unless a market price is provided in the input.
- Market hours are Monday–Friday,  orders outside these days are scheduled for the next market open.
- No transaction fees or taxes are considered.
- Stock symbols are not validated against a real stock exchange, as the API processes the provided portfolio as-is.
- Historic orders are stored in-memory as a simple array, sufficient for the proof-of-concept.

### 2.5 Development Approach

1. **Break Down the Problem**:
   - Start with the core functionality: splitting the investment and calculating shares.
   - Add execution time logic based on market hours.
   - Implement historic order storage and retrieval.
2. **Iterative Development**:
   - Build the API incrementally, starting with the POST endpoint, then adding the GET endpoint.
3. **Leverage LLMs**:
   - Use LLMs to generate boilerplate code (e.g., Express.js setup), generate different user modal portfolio  to validate api, draft documentation.
4. **Focus on Simplicity**:
   - Avoid over-engineering; prioritize meeting the requirements with clean, maintainable code.
   - Ensure the solution is flexible for different portfolios and order types.

## 3. Handling Challenges

- **Ambiguity**: Addressed by documenting assumptions (e.g., input format, market hours) and validating inputs (e.g., allocations sum to 100%).
- **Execution Time**: Used Day.js to handle time zones and market hours accurately, scheduling orders for the next market open if outside hours.
- **Configurability**: Implemented a configuration file for decimal places to allow future adjustments without code changes.
- **Performance**: Instrumented response times using a custom logger, ensuring millisecond precision and console visibility.

## 4. Production Considerations

If migrating to a production environment, I would add:

- **Security**: Add authentication (e.g., JWT), input sanitization, and HTTPS.
- **Scalability**: Replace in-memory storage with a database (e.g., MongoDB) and add caching (e.g., Redis).
- **Monitoring**: Integrate with tools like gcp log explorer for logging.
- **Error Handling**: Implement comprehensive middleware and centralized error logging.

## 5. LLM Usage

I used LLMs to:

- Generate initial Express.js and TypeScript boilerplate, reducing setup time.
- Generate different user modal portfolio  to validate api,
- Draft README content, which I then customized.