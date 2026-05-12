# P-rent
# Author
Pyston Patrick

# Project Description
P-rent is a web-based apartment management system designed to solve the common problems of manual tenant tracking, rent collection, and apartment management. Many landlords struggle with keeping records of tenants, tracking rent payments, and handling overdue balances. Likewise, tenants often have no convenient way to view their balance or pay rent electronically.
This project addresses these challenges by:

# This project addresses this challenges by
Providing role-based accounts for tenants and landlords
Allowing landlords to manage apartments and tenants easily
Enabling tenants to view balances and make payments
Supporting M-Pesa payments (simulated or integrated)
Storing all data in the browser (localStorage) for simplicity (upgradeable to a backend)

# Purpose
Reduce the administrative burden on landlords
Provide tenants with a digital platform for rent management
Demonstrate a full-stack workflow with user roles, dashboards, and payment tracking

## Features
# Tenant
Register and login
View rent and utility balances
Make payments locally or via M-Pesa
Track payment history
Logout securely
# Landlord
Register and login
Add apartments and tenants
Track rent payments and balances
View all tenant payment histories

# Technologies
Frontend: HTML, CSS, JavaScript
Storage: Browser localStorage
Payment: M-Pesa (API integration)
Deployment: Static hosting (GitHub Pages)

# Installation
1. Clone the repo: git clone https://github.com/PYSTON7/p-rent.git
2. Project folder: cd P-rent
3. View from browser: https://pyston7.github.io/P-rent/

## Usage
# Registration
Navigate to register.html
Select Tenant or Landlord
Fill in the required fields
Click Create Account
# Login
Navigate to login.html
Select role (Tenant/Landlord)
Enter phone and password
Tenant dashboard: dashboard.html
Landlord dashboard: admin.html
# Tenant Dashboard
View rent and water balances
Make payments (local or M-Pesa)
Track payment history
# Landlord Dashboard
Add tenants to apartments
Track balance and payments

## Known Issues
No server-side authentication (data is stored in localStorage)
M-Pesa integration is simulated unless backend API is connected
No multi-tenancy for landlords managing multiple apartments efficiently
Passwords are stored in plain text (for demonstration purposes)

# License
MIT License – see LICENSE for details.

# Copyright
© 2026 P-rent Apartment Management System. All rights reserved.
