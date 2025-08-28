Project Report
Introduction
The project aimed to design and develop a questionnaire web application that allows users to respond to survey questions, with responses securely stored and made accessible to an administrator for review. The project also included the implementation of an admin dashboard with data export functionality.
Project Planning
I began by carefully reading and understanding the project concept. Based on this, I developed a project plan that outlined the layout, structure, and time allocations for each stage of the work. The plan was drafted using Google Docs to guide implementation.
I started the project on Tuesday, August 26th and completed it on Wednesday, August 27th.
Tools and Technologies
Frontend: React.js (for building the questionnaire interface and admin dashboard)


Backend/Data Storage: Browser localStorage (used to store responses)


Deployment: Vercel


Version Control: GitHub (with frequent commits after each change)


Project Implementation
User Section
A front page was created to navigate users to the questionnaire.


The questionnaire consisted of 9 questions, displayed in a slide format for easy navigation.


A submit button was implemented to save responses to the browser’s localStorage.


Upon successful submission, users received a success confirmation message.


Admin Section
An admin login system was implemented for access authorization.


Username: admin


Password: password123


The admin dashboard displays all submitted responses in a structured table.


Each row of the table represents one user’s answers.


An export button allows the administrator to export responses directly into Excel using libraries such as:


xlsx → generates .xlsx files directly in the browser


Security
The admin dashboard is encrypted with login credentials hardcoded into the application for simplicity.


Responsiveness and Deployment
The application was optimized for responsiveness across all devices.


After completion, the project was deployed on Vercel for public access.

Extra Add-ons
To further enhance functionality, I implemented a download as PDF option, enabling administrators to export responses in PDF format as well.
 I also added a login system to encrypt and protect the admin page, ensuring only authorized users can access it.
 Additionally, I ensured that the entire application is fully responsive on all devices, providing a seamless user experience across mobile, tablet, and desktop.
Future Enhancements
Looking ahead, several improvements are planned to strengthen the system:
Email Integration: An option to directly send the response table as an email attachment to the administrator involving the backend.


Backend Development: Replace localStorage with a secure backend and database for storing user responses.


Authentication & Authorization: A more secured authentication system where admins must register and log in with unique credentials, ensuring stronger data protection.




Project Access
The deployed project can be accessed via the following link:
  sumsure-project.vercel.app



