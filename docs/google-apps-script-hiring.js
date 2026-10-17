/**
 * GOOGLE APPS SCRIPT FOR LAY DAY & TUSK MARKETING MANAGER HIRING
 * 
 * Target Google Sheet: https://docs.google.com/spreadsheets/d/1xjozrsOAqe5EfjuOBeTsLIxwsHHTP5BMOV_qvjagF3o/edit?gid=0#gid=0
 * Target HR Email: uluwatuhrm@staylayday.com
 * 
 * HOW TO INSTALL:
 * 1. Open the Google Sheet above in your browser.
 * 2. In the top menu, click Extensions > Apps Script.
 * 3. Delete any existing code and paste this entire file.
 * 4. Click "Deploy" > "New deployment".
 * 5. Select type: "Web app".
 * 6. Description: "Marketing Manager Hiring Application Webhook".
 * 7. Execute as: "Me" (your Google account).
 * 8. Who has access: "Anyone" (VERY IMPORTANT: must be Anyone so the landing page can post).
 * 9. Click "Deploy" and authorize permissions.
 * 10. Copy the Web App URL (starts with https://script.google.com/macros/s/...)
 * 11. Add it to your .env.local as:
 *     HIRING_MARKETING_MANAGER_SHEETS_URL=https://script.google.com/macros/s/.../exec
 */

function doPost(e) {
  try {
    var raw = e.postData.contents;
    var data = JSON.parse(raw);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

    // Candidate details
    var timestamp = data["Date/Time"] || data.timestamp || Utilities.formatDate(new Date(), "Asia/Makassar", "dd/MM/yyyy HH:mm");
    var name = data["Full name"] || data.name || "";
    var email = data["Email"] || data.email || "";
    var phone = data["Phone"] || data.phone || "";
    var expYears = data["Years of marketing management experience"] || data.experienceYears || "";
    var baliAvail = data["Availability in Bali/Uluwatu"] || data.baliAvailability || "";
    var startAvail = data["Available to Start by Oct 15th"] || data.startDate || "";
    var digitalAds = data["Digital Ads Experience"] || data.digitalAds || "";
    var hospitalityExp = data["Hospitality/F&B Marketing Experience"] || data.hospitalityExp || "";
    var teamLeadership = data["Team Leadership Experience"] || data.teamLeadership || "";
    var portfolio = data["Portfolio / Links"] || data.portfolio || "";
    var cvFileName = data["CV File Name"] || data.cvFileName || (name.replace(/\s+/g, "_") + "_CV.pdf");

    // Process CV file attachment and Google Drive upload
    var attachments = [];
    var cvDriveUrl = "";

    if (data.cvBase64) {
      try {
        var decodedBytes = Utilities.base64Decode(data.cvBase64);
        var mimeType = data.cvFileType || "application/pdf";
        var blob = Utilities.newBlob(decodedBytes, mimeType, cvFileName);
        attachments.push(blob);

        // Upload to Google Drive folder "Marketing Manager CVs - Lay Day & Tusk"
        var folderName = "Marketing Manager CVs - Lay Day & Tusk";
        var folders = DriveApp.getFoldersByName(folderName);
        var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);
        var driveFile = folder.createFile(blob);
        driveFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        cvDriveUrl = driveFile.getUrl();
      } catch (fileErr) {
        Logger.log("Error saving file to Drive or attaching: " + fileErr);
      }
    }

    // Append to Google Sheet matching existing column layout
    // Col 1: Date/Time
    // Col 2: Full name
    // Col 3: Email
    // Col 4: Phone
    // Col 5: Years of marketing management experience
    // Col 6: Availability in Bali/Uluwatu
    // Col 7: Available to Start by Oct 15th / Start date
    // Col 8: Digital Ads Experience
    // Col 9: Hospitality/F&B Marketing Experience
    // Col 10: Team Leadership Experience
    // Col 11: Portfolio / Links
    // Col 12: CV Link / Drive URL
    sheet.appendRow([
      timestamp,
      name,
      email,
      phone,
      expYears,
      baliAvail,
      startAvail,
      digitalAds,
      hospitalityExp,
      teamLeadership,
      portfolio,
      cvDriveUrl || cvFileName
    ]);

    // Send Customized Email to uluwatuhrm@staylayday.com
    var targetEmail = "uluwatuhrm@staylayday.com";
    var subject = "Marketing Manager - " + (name || "New Applicant");

    var htmlBody = "" +
      "<div style='font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;'>" +
      "  <div style='background-color: #0C2B1D; color: #FFFFFF; padding: 24px; text-align: center;'>" +
      "    <h1 style='margin: 0; font-size: 22px; letter-spacing: 2px; text-transform: uppercase;'>LAYDAY &times; TUSK</h1>" +
      "    <p style='margin: 6px 0 0 0; font-size: 14px; opacity: 0.85; letter-spacing: 1px; color: #E5C07B;'>NEW MARKETING MANAGER APPLICATION</p>" +
      "  </div>" +
      "  <div style='padding: 24px; background-color: #FAFAF7; color: #1F2937; line-height: 1.6;'>" +
      "    <h2 style='color: #0C2B1D; margin-top: 0; border-bottom: 2px solid #E5C07B; padding-bottom: 8px;'>Applicant Profile</h2>" +
      "    <table style='width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;'>" +
      "      <tr><td style='padding: 8px; font-weight: bold; width: 220px; color: #555;'>Full Name:</td><td style='padding: 8px; font-weight: bold; font-size: 16px;'>" + name + "</td></tr>" +
      "      <tr style='background: #fff;'><td style='padding: 8px; font-weight: bold; color: #555;'>Email:</td><td style='padding: 8px;'><a href='mailto:" + email + "'>" + email + "</a></td></tr>" +
      "      <tr><td style='padding: 8px; font-weight: bold; color: #555;'>Phone / WhatsApp:</td><td style='padding: 8px;'>" + phone + "</td></tr>" +
      "      <tr style='background: #fff;'><td style='padding: 8px; font-weight: bold; color: #555;'>Submission Time:</td><td style='padding: 8px;'>" + timestamp + " (Bali Time)</td></tr>" +
      "    </table>" +
      "    <h2 style='color: #0C2B1D; border-bottom: 2px solid #E5C07B; padding-bottom: 8px;'>Quiz & Experience Screening</h2>" +
      "    <table style='width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;'>" +
      "      <tr><td style='padding: 8px; font-weight: bold; color: #555;'>Years of Experience:</td><td style='padding: 8px;'>" + expYears + "</td></tr>" +
      "      <tr style='background: #fff;'><td style='padding: 8px; font-weight: bold; color: #555;'>Based in / Can Relocate to Bali:</td><td style='padding: 8px;'>" + baliAvail + "</td></tr>" +
      "      <tr><td style='padding: 8px; font-weight: bold; color: #555;'>Ready to Start:</td><td style='padding: 8px;'>" + startAvail + "</td></tr>" +
      "      <tr style='background: #fff;'><td style='padding: 8px; font-weight: bold; color: #555;'>Digital Ads (Meta/Google):</td><td style='padding: 8px;'>" + digitalAds + "</td></tr>" +
      "      <tr><td style='padding: 8px; font-weight: bold; color: #555;'>Hospitality / F&B Experience:</td><td style='padding: 8px;'>" + hospitalityExp + "</td></tr>" +
      "      <tr style='background: #fff;'><td style='padding: 8px; font-weight: bold; color: #555;'>Team Leadership:</td><td style='padding: 8px;'>" + teamLeadership + "</td></tr>" +
      "      <tr><td style='padding: 8px; font-weight: bold; color: #555;'>Portfolio / Social Links:</td><td style='padding: 8px;'><a href='" + portfolio + "' target='_blank'>" + (portfolio || "Not provided") + "</a></td></tr>" +
      "    </table>";

    if (cvDriveUrl) {
      htmlBody += "" +
        "    <div style='background-color: #EBF5F0; border: 1px solid #C4E3D4; padding: 16px; border-radius: 6px; margin: 20px 0; text-align: center;'>" +
        "      <strong style='color: #0C2B1D;'>CV Attached & Saved to Google Drive</strong><br>" +
        "      <a href='" + cvDriveUrl + "' style='display: inline-block; margin-top: 10px; background-color: #0C2B1D; color: #FFFFFF; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;'>View CV in Google Drive</a>" +
        "    </div>";
    }

    htmlBody += "" +
      "    <p style='font-size: 12px; color: #888; text-align: center; margin-top: 30px; border-top: 1px solid #e0e0e0; padding-top: 12px;'>" +
      "      Submitted via Lay Day & Tusk Hiring Landing Page &bull; Jl. Pantai Bingin No.1, Pecatu, Uluwatu, Bali 80361" +
      "    </p>" +
      "  </div>" +
      "</div>";

    var mailOptions = {
      to: targetEmail,
      subject: subject,
      htmlBody: htmlBody,
    };

    if (attachments.length > 0) {
      mailOptions.attachments = attachments;
    }

    MailApp.sendEmail(mailOptions);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Row appended and email sent with CV",
      cvUrl: cvDriveUrl
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("doPost Error: " + error);
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "ok",
    service: "Lay Day & Tusk Marketing Manager Hiring Webhook",
    spreadsheet: "https://docs.google.com/spreadsheets/d/1xjozrsOAqe5EfjuOBeTsLIxwsHHTP5BMOV_qvjagF3o/edit?gid=0#gid=0",
    targetEmail: "uluwatuhrm@staylayday.com"
  })).setMimeType(ContentService.MimeType.JSON);
}
