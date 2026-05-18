🚀 Faculty Leave Reminder Automation System

📌 Overview

A smart automation system built with **Google Apps Script** that eliminates manual faculty leave follow-ups.

This project automatically:

📂 Fetches the latest Excel file from Google Drive  
🧹 Cleans and processes leave data  
📊 Stores processed records in Google Sheets  
📧 Sends automated reminder emails to faculty  
⏰ Runs automatically using scheduled triggers  

Instead of manually checking leave records and emailing people, the workflow becomes fully automated.


## ✨ Features

🔍 Automatically detects latest uploaded Excel file  
📥 Reads Excel data from Google Drive  
🧹 Data cleaning and transformation  
📊 Google Sheet tracking system  
📧 Automated email notifications  
🚫 Duplicate reminder prevention  
⏰ Time-driven automation using triggers  
⚡ Zero manual intervention after setup  


## 🛠 Tech Stack

- Google Apps Script
- JavaScript
- Google Sheets
- Google Drive
- Gmail Service
- Trigger-based automation


## ⚙ Workflow Architecture

Uploads Excel file
        ↓
Google Drive Folder
        ↓
Apps Script fetches latest file
        ↓
Data Cleaning + Processing
        ↓
Google Sheets Tracking
        ↓
Email Reminder Automation
        ↓
Scheduled Trigger Repeats Process


## 📁 Project Structure


FacultyLeaveReminder/
│
├── Code.gs
├── appsscript.json
└── README.md


# 🚀 Setup Guide

## 1️⃣ Create Google Sheet

Create a new Google Sheet.

This will store:

✅ processed records  
✅ cleaned data  
✅ duplicate tracking  

Example URL:

https://docs.google.com/spreadsheets/d/1ABCxyz123456789/edit

Copy:

1ABCxyz123456789

## 2️⃣ Create Google Drive Folder

Create a folder in Google Drive.

Upload faculty Excel files here.

Example URL:


https://drive.google.com/drive/folders/1XYZfolder123456

Copy:


1XYZfolder123456


## 3️⃣ Open Apps Script

Open your Google Sheet.

Navigate:

Extensions → Apps Script

This launches Apps Script editor.


## 4️⃣ Paste Code

Delete sample code.

Paste:

-javascript
Code.gs


Also copy:

-javascript
appsscript.json

## 5️⃣ Configure IDs

Inside code:Replace ids with your ids here

-javascript
const FOLDER_ID = "YOUR_GOOGLE_DRIVE_FOLDER_ID";
const TRACKING_SHEET_ID = "YOUR_GOOGLE_SHEET_ID";


Example:

-javascript
const FOLDER_ID = "1XYZfolder123456";
const TRACKING_SHEET_ID = "1ABCxyz123456789";


## 6️⃣ Upload Excel File

Upload Excel file into configured Drive folder.

The script automatically processes the latest uploaded file.

## 7️⃣ Grant Permissions

Run:
processLatestExcel()

Google asks for authorization.

Grant:

🔓 Drive Access  
🔓 Sheets Access  
🔓 Gmail Access  

## 8️⃣ Configure Automation Trigger

Click:

⏰ Clock Icon → Add Trigger

Settings:

Function: processLatestExcel
Deployment: Head
Event Source: Time-driver

Suggested schedules:

🕘 Daily at 9 AM  
⏰ Every Hour  
📅 Every Morning  

## ▶ Running the Project

Manual run:

Run → processLatestExcel()

Automatic run:

Trigger-based scheduling


## 📧 Email Automation

Example email recipient:

john.smith@example.com

The email template can be customized in the script.




## ⭐ If you found this useful

Give this repository a ⭐ on GitHub
