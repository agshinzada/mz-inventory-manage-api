# Inventory Manage API

## Overview
The **Inventory Manage API** is a Node.js and Express.js backend service that powers the **Inventory Manage** frontend application.  
It manages the company’s internal IT equipment, tracking inventory, device movements, and stock levels.  
The API communicates with an **MSSQL database** to store and retrieve all relevant data and ensures smooth integration with the frontend panel.

## Features
- RESTful API for managing IT devices and inventory.  
- Track and update device movements and allocations.  
- Add new equipment to the inventory.  
- Monitor stock levels and provide reports.  
- User authentication and role-based permissions.  
- Integration with Inventory Manage frontend application.  

## Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** MSSQL  
- **Language:** JavaScript  

## Installation
```bash
# Clone the repository
git clone https://github.com/agshinzada/mz-inventory-manage-api.git

# Navigate into the project directory
cd mz-inventory-manage-api

# Install dependencies
npm install

# Start the development server
npm run server
