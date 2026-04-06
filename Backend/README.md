# Backend Setup for Local MongoDB

This backend is configured to use a local MongoDB instance by default.

## Local MongoDB setup

1. Install MongoDB Community Server for Windows:
   - https://www.mongodb.com/try/download/community

2. Start MongoDB:
   - If installed as a service, use the Services panel or run `net start MongoDB`.
   - Otherwise, run `mongod` in a terminal.

3. Create a `.env` file from the example:
   ```bash
   cd Backend
   copy .env.example .env
   ```

4. Start the backend:
   ```bash
   npm install
   npm run dev
   ```

5. Verify connection:
   ```bash
   node testMongo.js
   ```

## Notes

- The default URI is `mongodb://127.0.0.1:27017/cbc-report-portal`.
- The frontend already points to `http://localhost:5000/api`.
- If you need to use a different MongoDB host or database, update `MONGO_URI` in `Backend/.env`.
