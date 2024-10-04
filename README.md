# HRTF.ly

HRTF.ly is a groundbreaking project designed to revolutionize personalized sound experiences using Head-Related Transfer Functions (HRTFs). By utilizing advanced technologies such as RGBD scans and acoustic data processing, HRTF.ly provides a unique auditory experience tailored to each user's physical and acoustic characteristics.

## Table of Contents
- [Abstract](#abstract)
- [Features](#features)
- [Operative Flow](#operative-flow)
- [Technology Stack](#technology-stack)
- [Entity-Relationship Model](#entity-relationship-model)
- [User Roles](#user-roles)
- [CRUD Criteria](#crud-criteria)
- [Demo](#demo)
- [License](#license)

## Abstract
HRTF.ly delivers a personalized audio experience by leveraging detailed head and ear scans, followed by precise acoustic data collection and processing. Users can create an individual SOFA (Spatially Oriented Format for Acoustics) file that encapsulates their unique spatial auditory profile, enhancing experiences in virtual reality, gaming, and other immersive applications.

## Features
- **User Registration:** Secure platform for managing personal data and progress.
- **Head Scanning:** 360-degree lidar scans to capture the geometry of the user's head and ears.
- **Acoustic Data Collection:** Laboratory-based data gathering to record how sound interacts with the user’s physical features.
- **HRTF Calculation:** Advanced processing to compute personalized HRTFs, delivered in SOFA format.
- **Personalized Audio Experience:** Custom auditory profiles for enhanced immersion in multimedia applications.

## Operative Flow
1. **User Registration:** Users sign up and receive account credentials.
2. **Head Scanning:** A lidar scan captures the user's head geometry.
3. **Scan Upload:** Users upload the scan data (RGBD format) to their personal dashboard.
4. **Acoustic Data Collection:** Sound recordings are taken from various angles around the user's head.
5. **Acoustic Data Upload:** Users upload the acoustic data for processing.
6. **HRTF Calculation:** The platform calculates the user’s HRTF and generates a SOFA file.
7. **Personalized Audio Experience:** Users download and apply their SOFA file in compatible applications.

## Technology Stack
- **Frontend:** Vue3
  - Single-page application with responsive and dynamic interaction.
  - Libraries: Axios, Material-UI, Veutify framework.
- **Backend:** Java Spring Boot
  - RESTful services with Spring MVC.
  - Security: JWT-based Spring Security.
  - Data Access: Spring Data JPA.
- **Database:** PostgreSQL/MySQL for storing user data and results.
- **Other Technologies:**
  - Docker for containerization.
  - Git for version control.
  - Jenkins/GitHub Actions for CI/CD.
  - Cloud services (AWS, Google Cloud) for hosting and storage.

## Entity-Relationship Model
Entities in HRTF.ly:
- **User:** Stores user details and account information.
- **Scan:** Manages the data related to head scans.
- **Experiment:** Handles acoustic data collection.
- **HRTF:** Stores the calculated personalized HRTF.

## User Roles
- **Admin:** Full access to all features and data. Can manage user accounts and view all scan and experiment data.
- **Operator:** Can initiate scans and experiments and manage the collection of data. Limited view of user details.
- **Customer:** Can view their own scans, experiments, and HRTFs and update personal data.

## CRUD Criteria
- **Creation:** Admins can create records for all entities, while operators can initiate scans and experiments.
- **Read:** Admins and operators can view all data, while customers can only view their own records.
- **Update:** Admins can update all entities, operators can update scan/experiment statuses, and customers can update their personal information.
- **Delete:** Only admins can delete records, ensuring data is managed in compliance with regulations.

## Demo
Explore the HRTF.ly demo [here]([https://hrtf.gelsomini.info](https://lovely-biscuit-2d4181.netlify.app/)).
