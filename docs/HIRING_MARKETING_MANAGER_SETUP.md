# Marketing Manager Hiring Campaign Setup Guide

## 1. Google Spreadsheet & Target Email
- **Target Google Spreadsheet**: [Open Google Sheet](https://docs.google.com/spreadsheets/d/1xjozrsOAqe5EfjuOBeTsLIxwsHHTP5BMOV_qvjagF3o/edit?gid=0#gid=0)
- **Target HR Email**: `uluwatuhrm@staylayday.com`
- **Email Subject convention**: `Marketing Manager - [Applicant Name]`

---

## 2. Deploying the Google Apps Script Webhook (2 Minutes)

1. Open the [Google Spreadsheet](https://docs.google.com/spreadsheets/d/1xjozrsOAqe5EfjuOBeTsLIxwsHHTP5BMOV_qvjagF3o/edit?gid=0#gid=0).
2. Go to **Extensions** > **Apps Script** in the top navigation bar.
3. Replace the code in the editor with the contents of [`docs/google-apps-script-hiring.js`](./google-apps-script-hiring.js).
4. Click the blue **Deploy** button > **New deployment**.
5. Click the gear icon next to "Select type" and choose **Web app**.
6. Set the configuration:
   - **Description**: `Marketing Manager Hiring Webhook`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone` *(Crucial so the form submission can reach the script)*
7. Click **Deploy**, review Google's permission prompt, and click **Allow**.
8. Copy the generated **Web App URL** (looks like `https://script.google.com/macros/s/AKfy.../exec`).
9. Paste it into your `.env.local` file:
   ```env
   HIRING_MARKETING_MANAGER_SHEETS_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```
10. Restart your development server (`npm run dev`) or redeploy to Vercel/production with the environment variable set.

---

## 3. What the Webhook Does Automatically

When a candidate finishes the interactive quiz and attaches their CV:
1. **Google Sheets Logging**: Automatically appends the applicant's data into the target spreadsheet columns (`Date/Time`, `Full name`, `Email`, `Phone`, `Years of marketing management experience`, `Availability in Bali/Uluwatu`, `Available to Start by Oct 15th`, `Digital Ads Experience`, `Hospitality/F&B Marketing Experience`, `Team Leadership Experience`, `Portfolio / Links`, `CV File / Drive Link`).
2. **Google Drive CV Storage**: Creates a folder named `Marketing Manager CVs - Lay Day & Tusk` in Google Drive, saves the candidate's CV (PDF, DOCX), generates a view link, and records the URL in the spreadsheet.
3. **Automated HR Notification Email**: Sends a customized, branded HTML email to `uluwatuhrm@staylayday.com` with:
   - Candidate's contact info (Name, Email, WhatsApp Phone)
   - Quiz breakdown and experience screening answers
   - Portfolio & LinkedIn links
   - **The candidate's original CV attached directly to the email!**
