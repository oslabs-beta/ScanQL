<div align="center" width="100%"> 

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

</div>

<br />
<div align="center">
  <a href="https://scanql.dev">
    <img src="https://github.com/oslabs-beta/ScanQL/blob/main/src/assets/logo-horizontal-v2-darkmode.png" alt="Logo" width="550" height="auto">
  </a>
  <br />
  https://scanql.dev/
<br/>

<br /> 
  <p align="center">
  ScanQL is an elegant and effective tool designed to empower developers aiming for database and query optimization to ensure their operations run smoothly and efficiently. Beyond optimization, ScanQL offers a holistic view of a database, empowering 
  one to understand the intricate details and interrelations within their database.
    <br />
  </p>
</div>

## About The Project

<div align="center" width="100%">

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Javascript](https://img.shields.io/badge/javascript-%23424242.svg?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)
![Testing Library](https://img.shields.io/badge/TestingLibrary-E33332?style=for-the-badge&logo=TestingLibrary&logoColor=black)
![Docker](https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=Vitest&logoColor=FCC72B)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white)
![RadixUI](https://img.shields.io/badge/radixui-E1E2E4?style=for-the-badge&logo=radixui&logoColor=161618)
![Chart.js](https://img.shields.io/badge/Chart.js-242121?style=for-the-badge&logo=chart.js&logoColor=FF6384)

</div>



## Features:

+ Database Visualization: Get a holistic view of your entire database schema, allowing for a better understanding of relations, data distribution, and table structures.

+ Query Performance Analysis: With ScanQL's testing mechanism, analyze the planning and execution times of generic SELECT and UPDATE queries, pinpointing potential bottlenecks and inefficiencies.

+ ER Diagram: Visualize intricacies of your database structure with our enhanced ER Diagram. Experience an interactive representation of your database's relationships and dependencies, making comprehension and optimization more intuitive than ever.


## Why ScanQL?

+ Holistic View: Go beyond traditional data views and understand your database from a macro and micro perspective.

+ Empowered Decision Making: Make informed decisions about schema changes, indexing, and more based on the insights ScanQL offers.

+ Automated Tests: Without writing a single line of SQL, get performance metrics on commonly used SELECT and UPDATE queries as soon as you connect your database

## How ScanQL Works

+ Visualizing the Database: Simply connect to your database by submitting your URI connection string for your Postgres database, and our tool will automatically provide you with an overview of the composition of your database, a detailed analysis of its size through various metrics, past performance analysis of quiries run on your database (Note: limited for unpaid versions of postgres databases), and also map out the database structure in the ERD tab, providing a visual representation of tables, relations, and more.

<p align="center">
  <img src="https://github.com/oslabs-beta/ScanQL/blob/main/src/assets/GIFs/Dashboard_gif.gif" alt="animated" />
</p>

+ Performing Query Tests: ScanQL will run a series of generic SELECT and UPDATE queries on each table in your database to determine planning and execution times. This provides a baseline understanding of how optimized your current setup is.

<p align="center">
  <img src="https://github.com/oslabs-beta/ScanQL/blob/main/src/assets/GIFs/ERD_gif.gif" alt="animated" />
</p>

+ Custom Query Testing: Input any query of your choice and get a comprehensive analysis of the performance of running that query. Understand metrics such as time taken, caching details, the type of scan used, and the number of rows hit. This deep dive enables fine-tuning and precise optimization of your database queries

<p align="center">
  <img src="https://github.com/oslabs-beta/ScanQL/blob/main/src/assets/GIFs/CustomQuery_gif.gif" alt="animated" />
</p>

\*\*Note\*\*
 
- **PostgreSQL Database Provider Access:** Ensure you have the appropriate permissions with your PostgreSQL database provider. Some metrics might be restricted depending on the access 
 level you have.

- **pg_stats:** If you are leveraging `pg_stats` for metrics, you may need additional privileges or access rights. Check with your PostgreSQL database provider or your system 
 administrator for assistance.

 If you encounter any issues or need more information, consult your PostgreSQL documentation or feel free to reach out to us! 

## Privacy & Security

At ScanQL, your privacy and security are paramount:

+ No Storage of URI Strings: We understand the significance of database URIs. ScanQL is designed to never store or cache your database URI strings, ensuring they remain confidential.

+ Data Privacy: Personal data and database contents remain entirely within your domain. ScanQL does not store, share, or transmit your data.

+ Secure Analysis: The metrics and insights provided by ScanQL are processed securely without any external sharing or storage. Our commitment is to offer optimization insights without compromising on security.


## Contributing
We welcome contributions! If you find a bug or want to propose a feature, feel free to open an issue or create a pull request.

## License
ScanQL is licensed under the MIT License. See LICENSE.md for more details.

## Authors

| Developed By | Github |
| :-: | :-: |
| Daniel Kim |[![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/danykdev)
| Sam Heck |[![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Sam-Heck)
| Yahya Talab |[![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/YahyaT95)
| Danny Murcia |[![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/dm2800)
| Kurt Bulau |[![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/kbulau)

[contributors-shield]: https://img.shields.io/github/contributors/oslabs-beta/ScanQL.svg?style=for-the-badge
[contributors-url]: https://github.com/oslabs-beta/ScanQL/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/oslabs-beta/ScanQL.svg?style=for-the-badge
[forks-url]: https://github.com/oslabs-beta/ScanQL/network/members
[stars-shield]: https://img.shields.io/github/stars/oslabs-beta/ScanQL.svg?style=for-the-badge
[stars-url]: https://github.com/oslabs-beta/ScanQL/stargazers
[issues-shield]: https://img.shields.io/github/issues/oslabs-beta/ScanQL.svg?style=for-the-badge
[issues-url]: https://github.com/oslabs-beta/ScanQL/issues
[license-shield]: https://img.shields.io/github/license/oslabs-beta/ScanQL.svg?style=for-the-badge
[license-url]: https://github.com/oslabs-beta/ScanQLr/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/company/scanql/


