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

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
