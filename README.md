# Gas Asset Management System (Frontend)

This repository contains the frontend application for the __Gas Asset Management System__ (GAMS), built with __React__, __TypeScript__, and __Mantine UI__.

The backend API for this project is located in a separate repository: [click](https://github.com/OleksandrPro/gas-control-backend)

## About the Project

GAMS is a modern, enterprise-grade web application designed to manage gas pipeline infrastructure. It replaces legacy Excel-based workflows, providing a clean, responsive, and interactive user interface for managing thousands of inventory records and equipment details.


## Development Setup

### 1. Prerequisites

Ensure you have Node.js (version 18+ recommended) installed on your machine.

### 2. Installation

Clone the repository and install the dependencies:

```
npm install
```

### 3. Configure Environment Variables

Create a .env file in the root directory of the project and set the API URL pointing to your backend service.

```
API_URL=http://localhost:7777
```

### 4. Run the Application

Start the Vite development server:

```
npm run dev
```

The application will be available at http://localhost:5173 (or another port specified by Vite).

## Visual Tour

### 1. Inventory Dashboard
The main dashboard is divided into two key views:

#### 1.1. Main Data Table
Displays the gas pipeline infrastructure registry with pagination and a quick search bar.

<img width="1920" height="919" alt="Screenshot_2026-04-06_17-59-11" src="https://github.com/user-attachments/assets/49a74e77-54d9-486f-9433-4a89d28387e9" />

#### 1.2. Advanced Filter Panel
A multi-level filtering panel for querying records by card and equipment parameters.

<img width="1920" height="896" alt="Screenshot_2026-04-06_16-13-09" src="https://github.com/user-attachments/assets/c388803e-e9a6-4e14-811e-68b336bd0cd3" />

### 2. Card Creation Form
Form for creating a new inventory card. Demonstrates the process of entering general pipeline information and selecting parameters from connected reference dictionaries.

https://github.com/user-attachments/assets/043dbcd7-1b1f-4c5e-8d85-e39ebc5c01f0

### 3. Card Details
The card details page is divided into two main sections:

3.1. Card Information
Displays general card parameters, such as address, district, pressure, cut type, and total lengths.

<img width="1919" height="671" alt="Screenshot_2026-04-06_18-07-25" src="https://github.com/user-attachments/assets/e2af6fed-f96b-44dc-ae81-0b446c54ef5c" />

3.2. Equipment Section
Displays equipment associated with a specific pipeline section. The data is visually segregated into distinct operational contexts (Balance, Fact, and In Cut).

<img width="1920" height="464" alt="Screenshot_2026-04-06_18-11-57" src="https://github.com/user-attachments/assets/ae1fb7b8-94b0-4677-bbc0-5f1c55615bf9" />

### 4. Equipment Forms
Forms for adding and editing equipment data. The interface renders specific fields and validation rules based on the selected equipment type or cut parameters.

https://github.com/user-attachments/assets/10149593-578a-4f0e-aba8-12fb81159a86

### 5. Equipment Data Migration
A workflow feature for updating card states. When changing the cut type to "Full cut", a modal allows users to automatically migrate all existing equipment records to the "Cut" column from either the "Balance" or "Fact" sources.

https://github.com/user-attachments/assets/5f342309-054f-4065-842a-50c93fff3b2a

### 6. Dictionaries Page
System dictionaries (materials, districts, etc.) management page. It features inline editing capabilities, allowing users to update reference data directly within the list.

https://github.com/user-attachments/assets/e3ae4e53-cfc0-4841-9b20-2d59dd5375ce

### 7. Analytics and Pipe Length Calculator
Calculation of aggregated metrics. The Pipe Calculator evaluates the total length of the filtered infrastructure currently displayed in the data table.

<img width="1920" height="830" alt="Screenshot_2026-04-06_16-18-23" src="https://github.com/user-attachments/assets/c0ea864f-016f-4b3a-9324-010fee946c6b" />

