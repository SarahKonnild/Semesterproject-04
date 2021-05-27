# Semesterproject-04

This product is the result of the 4th semester project period of the BEng degree in Software Technology at University of Southern Denmark, belonging to group ST04 consisting of Sarah Manon Pradel, Simon Quvang Kristiansen, Kasper Svane and Mahmoud Adil El-Set.

This product was developed in the period of (DD.MM.YYYY) 01.02.2021 to 30.05.2021. The goal was to create a Manufacturing Execution System (MES) for a fictional beer brewery, which should allow them to handle their daily production business in a more easy and intuitive way. This version of the project requested a re-structuring of the project from the 3rd semester, where the goal was to do the same thing, but with a different set of requirements.

The overall goal of this project was therefore to:
- Further document the development process, using e.g. requirement models (SysML) and classic architectural models (UML)
- Create a component-based system with a self-chosen method of integration. Here it was chosen to develop a microservice architecture, which best fit the original web-application that was developed on the 3rd semester. In addition, it employed a horizontal method of integration, which led to a thick client structure.
- Formulate the requirements as functional and non-functional, and relate them to the overall architecture and stakeholder needs

And the project is therefore also very heavily dependent on the documentation/report, in order to understand the full scope of the response to these above points. This report can also be found in this repository.

IMPORTANT INFORMATION! 

In order to log into the system, use the credentials: email: test@test.com password: 123456

In order to have all the required modules and extensions in the application, run "npm install" in the following folders:
- API Gateway
- Authentication
- Batches
- Brewster
- frontend
- Optimization

In order to run the application, run the "npm start" command in the frontend folder, and "npm start" in the API Gateway folder. There is no particular order it has to happen in, but without running "npm start" in the API Gateway folder, the system is not connected to the databases, and therefore it is not possible to log in.
