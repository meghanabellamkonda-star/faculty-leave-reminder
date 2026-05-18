/************** CONFIG **************/
const FOLDER_ID = "15DPe40fDHfZJu2fq43lFW7643k6WiBtrRzQBGS7CI7AdqTovBz-C5k5XFoPbqoFvNITGig_o";
const TRACKING_SHEET_ID = "1F62XnajpLftXW9TpGOU0_xn9sejHCatJ6czSkyMC6AA";

/************** MAIN FUNCTION **************/
function processLatestExcel() {

  const trackingSheet = SpreadsheetApp
    .openById(TRACKING_SHEET_ID)
    .getSheets()[0];

  const folder = DriveApp.getFolderById(FOLDER_ID);

  // ✅ Define today ONCE
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  /* ---------- FIND LATEST EXCEL ---------- */
  let latestFile = null;
  let latestTime = 0;

  const files = folder.getFiles();
  while (files.hasNext()) {
    const file = files.next();
    const updated = file.getLastUpdated().getTime();
    if (updated > latestTime) {
      latestTime = updated;
      latestFile = file;
    }
  }

  if (!latestFile) return;

  // // ❌ Stop if Excel not uploaded today
  // const fileDate = new Date(latestFile.getLastUpdated());
  // fileDate.setHours(0, 0, 0, 0);
  // if (fileDate.getTime() !== today.getTime()) return;
  

  /* ---------- CONVERT EXCEL ---------- */
  const converted = Drive.Files.copy(
    { mimeType: MimeType.GOOGLE_SHEETS },
    latestFile.getId()
  );

  const tempSheet = SpreadsheetApp.openById(converted.id).getSheets()[0];
  const data = tempSheet.getDataRange().getValues();
  DriveApp.getFileById(converted.id).setTrashed(true);

  const trackingData = trackingSheet.getDataRange().getValues();

  /* ---------- PROCESS ABSENTEES ---------- */
  for (let i = 1; i < data.length; i++) {

    const name = data[i][2];   // EmployeeName
    const email = data[i][3];  // Email
    if (!email || !email.includes("@")) continue;

    let row = -1;

    for (let j = 1; j < trackingData.length; j++) {
      if (trackingData[j][1] === email) {
        row = j + 1;
        break;
      }
    }

    /* ---------- FIRST DAY ---------- */
    if (row === -1) {
      trackingSheet.appendRow([
        name,
        email,
        1,
        new Date(),
        "Active",
        today
      ]);
      sendMail(email, name, 1);
      continue;
    }

    /* ---------- EXISTING ---------- */
    const existingCount = trackingSheet.getRange(row, 3).getValue();
    if (existingCount >= 4) continue; // ⛔ STOP AFTER 4

    const lastSeen = new Date(trackingSheet.getRange(row, 6).getValue());
    lastSeen.setHours(0, 0, 0, 0);

    const dayDiff =
      (today.getTime() - lastSeen.getTime()) / (1000 * 60 * 60 * 24);

    // ✅ FIXED LOGIC
    const newCount = (dayDiff <= 1) ? existingCount + 1 : 1;

    trackingSheet.getRange(row, 3).setValue(newCount);
    trackingSheet.getRange(row, 4).setValue(new Date());
    trackingSheet.getRange(row, 6).setValue(today);

    if (newCount === 4) {
      trackingSheet.getRange(row, 5).setValue("Absent Marked");
    }

    sendMail(email, name, newCount);
  }

  cleanupOldDriveFiles();
  cleanupOldTrackingData();
}

/************** EMAIL FUNCTION **************/
function sendMail(email, name, count) {

  let subject, body;

  if (count <= 3) {
    subject = "Leave Reminder";
    body = `
Dear ${name},

This is reminder (${count}) regarding your absence.

Please submit your leave formality at HR.
Ignore this mail if already submitted.

Regards,
VNRVJIET Management`;
  } else {
    subject = "Absent Marked – Salary Deduction";
    body = `
Dear ${name},

You have not responded to previous reminders.

You are marked ABSENT.
Salary will be deducted accordingly.

Regards,
VNRVJIET Management`;
  }

  MailApp.sendEmail(email, subject, body);
}

/************** CLEANUP OLD FILES **************/
function cleanupOldDriveFiles() {
  const folder = DriveApp.getFolderById(FOLDER_ID);
  const limit = 30 * 24 * 60 * 60 * 1000;
  const now = Date.now();

  const files = folder.getFiles();
  while (files.hasNext()) {
    const file = files.next();
    if (now - file.getLastUpdated().getTime() > limit) {
      file.setTrashed(true);
    }
  }
}

/************** CLEANUP OLD TRACKING **************/
function cleanupOldTrackingData() {
  const sheet = SpreadsheetApp.openById(TRACKING_SHEET_ID).getSheets()[0];
  const data = sheet.getDataRange().getValues();
  const limit = 30 * 24 * 60 * 60 * 1000;
  const now = Date.now();

  for (let i = data.length - 1; i > 0; i--) {
    const lastSeen = data[i][5];
    if (lastSeen && now - new Date(lastSeen).getTime() > limit) {
      sheet.deleteRow(i + 1);
    }
  }
}