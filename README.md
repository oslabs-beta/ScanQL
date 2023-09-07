# ScanQL

ScanQL is an elegant and effective tool designed to empower developers aiming for database and query optimization to ensure their operations run smoothly and efficiently. Beyond optimization, ScanQL offers a holistic view of a database, empowering one to understand the intricate details and interrelations within their database.

## 🚀 Features

+ Database Visualization: Get a holistic view of your entire database schema, allowing for a better understanding of relations, data distribution, and table structures.

+ Query Performance Analysis: With ScanQL's testing mechanism, analyze the planning and execution times of generic SELECT and UPDATE queries, pinpointing potential bottlenecks and inefficiencies.

+ Optimization Suggestions: Based on the query tests, ScanQL provides actionable insights and suggestions for improving query performance and database structure.

## 🎯 Why ScanQL?

+ Holistic View: Go beyond traditional data views and understand your database from a macro and micro perspective.

+ Empowered Decision Making: Make informed decisions about schema changes, indexing, and more based on the insights ScanQL offers.

+ Automated Tests: Without writing a single line of SQL, get performance metrics on commonly used SELECT and UPDATE queries as soon as you connect your database

## 🔍 How ScanQL Works

+ Visualizing the Database: Simply connect to your database by submitting your URI connection string for your Postgres database, and our tool will automatically provide you with an overciew of the composition of your database, a detailed analysis of its size through various metrics, past performance analysis of quiries run on your database (Note: limited for unpaid versions of postgres databases), and also map out the database structure in the ERD tab, providing a visual representation of tables, relations, and more.

+ Performing Query Tests: ScanQL will run a series of generic SELECT and UPDATE queries on each table in your database to determine planning and execution times. This provides a baseline understanding of how optimized your current setup is.

+ Custom Query Testing: Input any query of your choice and get a comprehensive analysis of the performance of running that query. Understand metrics such as time taken, caching details, the type of scan used, and the number of rows hit. This deep dive enables fine-tuning and precise optimization of your database queries


## 🔒 Privacy & Security

At ScanQL, your privacy and security are paramount:

+ No Storage of URI Strings: We understand the significance of database URIs. ScanQL is designed to never store or cache your database URI strings, ensuring they remain confidential.

+ Data Privacy: Personal data and database contents remain entirely within your domain. ScanQL does not store, share, or transmit your data.

+ Secure Analysis: The metrics and insights provided by ScanQL are processed securely without any external sharing or storage. Our commitment is to offer optimization insights without compromising on security.


## 🤝 Contributing
We welcome contributions! If you find a bug or want to propose a feature, feel free to open an issue or create a pull request.

## 🔐 License
ScanQL is licensed under the MIT License. See LICENSE.md for more details.


![Tech Stack](https://github-readme-tech-stack.vercel.app/api/cards?title=Tech+Stack&lineCount=1&bg=%230D1117&badge=%23161B22&border=%2321262D&titleColor=%2358A6FF&line1=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI%2BCiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8%2BCiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8%2BCiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8%2BCiAgPC9nPgo8L3N2Zz4K%2CReact%2C%3B)



