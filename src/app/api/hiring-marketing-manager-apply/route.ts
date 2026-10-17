import { NextRequest, NextResponse } from "next/server";

// POST /api/hiring-marketing-manager-apply
// Forwards candidate application & CV to Google Apps Script → Google Sheets & uluwatuhrm@staylayday.com
// Target Google Sheet: https://docs.google.com/spreadsheets/d/1xjozrsOAqe5EfjuOBeTsLIxwsHHTP5BMOV_qvjagF3o/edit?gid=0#gid=0
// Target Email: uluwatuhrm@staylayday.com
export async function POST(req: NextRequest) {
  const APPS_SCRIPT_URL =
    process.env.HIRING_MARKETING_MANAGER_SHEETS_URL ||
    process.env.NEXT_PUBLIC_HIRING_MARKETING_MANAGER_SHEETS_URL ||
    process.env.MARKETING_MANAGER_SHEETS_URL;

  try {
    const body = await req.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    let phoneStr = String(body.phone || "").trim();
    if (phoneStr && !phoneStr.startsWith("'")) {
      phoneStr = "'" + phoneStr;
    }

    // Format timestamp in Bali Time (WITA, UTC+8) in DD/MM/YYYY HH:mm format
    const now = new Date();
    const formattedTimestamp = now.toLocaleString("en-GB", {
      timeZone: "Asia/Makassar",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).replace(",", "");

    const experienceYears = String(body.experienceYears || "").trim();
    const baliAvailability = String(body.baliAvailability || "").trim();
    const startDate = String(body.startDate || "").trim();
    const digitalAds = String(body.digitalAds || "").trim();
    const hospitalityExp = String(body.hospitalityExp || "").trim();
    const teamLeadership = String(body.teamLeadership || "").trim();
    const portfolio = String(body.portfolio || "").trim();

    const cvFileName = String(body.cvFileName || "").trim();
    const cvFileType = String(body.cvFileType || "application/pdf").trim();
    const cvBase64 = String(body.cvBase64 || "").trim();
    const cvFileSize = Number(body.cvFileSize || 0);

    // Exact fields matching Google Sheet format (Columns: Date/Time, Full name, Email, Phone, Years of marketing management experience, Availability in Bali/Uluwatu, Available to Start by Oct 15th, Digital Ads Experience, Hospitality/F&B Marketing Experience, Team Leadership Experience)
    const payload = {
      // Keys matching spreadsheet headers exactly
      "Date/Time": formattedTimestamp,
      "Full name": name,
      "Email": email,
      "Phone": phoneStr,
      "Years of marketing management experience": experienceYears,
      "Availability in Bali/Uluwatu": baliAvailability,
      "Available to Start by Oct 15th": startDate,
      "Digital Ads Experience": digitalAds,
      "Hospitality/F&B Marketing Experience": hospitalityExp,
      "Team Leadership Experience": teamLeadership,
      "Portfolio / Links": portfolio,
      "CV File Name": cvFileName,

      // Normalized lowerCase / camelCase keys for Apps Script convenience
      timestamp: formattedTimestamp,
      name,
      email,
      phone: phoneStr,
      experienceYears,
      baliAvailability,
      startDate,
      digitalAds,
      hospitalityExp,
      teamLeadership,
      portfolio,

      // CV and Email forwarding payload
      cvFileName,
      cvFileType,
      cvBase64,
      cvFileSize,
      targetEmail: "uluwatuhrm@staylayday.com",
      emailSubject: `Marketing Manager - ${name || "Applicant"}`,
      position: "Marketing Manager - Lay Day & Tusk Uluwatu",
      source: "hiring-marketing-manager-lp",
    };

    if (APPS_SCRIPT_URL) {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
        redirect: "follow",
      });

      const responseText = await res.text().catch(() => "");
      console.log(`[Hiring Marketing Manager] Apps Script responded (${res.status}):`, responseText.slice(0, 150));

      if (!res.ok) {
        console.warn(`[Hiring Marketing Manager] Apps Script HTTP ${res.status}. Check Apps Script permissions.`);
      }
    } else {
      console.log(
        "[Hiring Marketing Manager] HIRING_MARKETING_MANAGER_SHEETS_URL not set in environment. Target sheet: https://docs.google.com/spreadsheets/d/1xjozrsOAqe5EfjuOBeTsLIxwsHHTP5BMOV_qvjagF3o/edit?gid=0#gid=0. Target email: uluwatuhrm@staylayday.com.",
        {
          name,
          email,
          phone: phoneStr,
          experienceYears,
          hasCV: Boolean(cvBase64),
          cvFileName,
        }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Application submitted successfully",
      deliveredToEmail: "uluwatuhrm@staylayday.com",
      hasCV: Boolean(cvBase64),
    });
  } catch (err) {
    console.error("[Hiring Marketing Manager] Submission error:", err);
    return NextResponse.json({ ok: false, error: "Submission processing failed" }, { status: 500 });
  }
}
