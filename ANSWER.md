
# Wedbush Backend Challenges — Answers

---

## 1. What was your approach (thought process) to tackling this project?

I started by carefully breaking down the functional and technical requirements. Then I designed a modular, type-safe API using Express and TypeScript. I built the logic iteratively — first the core order splitting, then market time logic, then logging, and finally REST endpoints. I prioritized readability, flexibility (e.g. config-driven precision), and ease of testing.

---

## 2. What assumptions did you make?

- Default stock price is $100 unless `price` is passed explicitly for a stock.
- Market is open from Monday to Friday, and closed on weekends.
- Allocation percentages always sum to 100%.
- No external data validation or pricing API calls are required.
- Orders are stored in memory and lost on app restart.
- Precision for share quantities is configurable via `config.ts`.

---

## 3. What challenges did you face when creating your solution?

- Ensuring share quantities are calculated with the correct decimal precision.
- Handling date logic to determine the next valid market day using `dayjs`.
- Keeping everything modular yet easy to test and extend.
- Maintaining proper type safety across controllers, services, and models.
- Avoiding common Express pitfalls.

---

## 4. If you were to migrate your code to a fully functional production environment, what are some changes and controls you would put in place?

- Add authentication (e.g. JWT) and authorization to secure the API.
- Replace in-memory storage with a persistent database (e.g. PostgreSQL or MongoDB).
- Validate input using a schema validator (e.g. Zod or Joi).
- Add comprehensive logging and monitoring (e.g. using Winston + GCP Log Explorer).
- Improve error handling with centralized middleware.
- Add automated tests (unit + integration).
- Dockerize the app and deploy with CI/CD.

---

## 5. If you’ve used LLMs to solve the challenge, describe how and where you’ve used it and how did it help?

Yes, I used an LLM (ChatGPT) to:
- Generate initial boilerplate code for Express + TypeScript setup.
- Validate API design ideas and naming conventions.
I manually reviewed and refined all generated content to ensure it met the project goals.
