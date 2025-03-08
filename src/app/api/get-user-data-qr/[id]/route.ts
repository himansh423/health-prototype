import { type NextRequest, NextResponse } from "next/server"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"

// Function to fetch user data
async function fetchUserData(userId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/get-user-data/${userId}`,
    )
    if (!response.ok) {
      throw new Error("Failed to fetch user data")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching user data:", error)
    throw error
  }
}

// Function to generate PDF from user data
async function generatePDF(userData: any) {
  try {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create()
    let page = pdfDoc.addPage()

    // Define colors
    const primaryBlue = rgb(0 / 255, 112 / 255, 243 / 255) // #0070f3
    const teal = rgb(67 / 255, 198 / 255, 184 / 255) // #43C6B8
    const orange = rgb(249 / 255, 115 / 255, 22 / 255) // #F97316
    const white = rgb(1, 1, 1) // white
    const black = rgb(0, 0, 0) // black
    const lightGray = rgb(0.95, 0.95, 0.95) // light gray for alternating rows
    const mediumGray = rgb(0.85, 0.85, 0.85) // medium gray for borders
    const lightBlue = rgb(0.9, 0.95, 1) // light blue for some backgrounds

    // Set up fonts
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
    const timesRomanBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold)

    // Set up page dimensions
    const { width, height } = page.getSize()
    const margin = 50
    let y = height - margin

    // Helper function to add text
    const addText = (text: string, x: number, y: number, font: any, size: number, color = black) => {
      page.drawText(text, { x, y, font, size, color })
    }

    // Helper function to draw a line
    const drawLine = (x1: number, y1: number, x2: number, y2: number, thickness = 1, color = black) => {
      page.drawLine({
        start: { x: x1, y: y1 },
        end: { x: x2, y: y2 },
        thickness,
        color,
      })
    }

    // Helper function to check if we need a new page
    const checkForNewPage = (currentY: number, requiredSpace = 150) => {
      if (currentY < requiredSpace) {
        page = pdfDoc.addPage()
        const { height } = page.getSize()

        // Add a decorative header to the new page
        page.drawRectangle({
          x: 0,
          y: height - 50,
          width: width,
          height: 50,
          color: primaryBlue,
        })

        addText("Health Profile - Continued", width / 2 - 100, height - 30, helveticaBoldFont, 18, white)
        return height - 70
      }
      return currentY
    }

    // Create a stylish header
    page.drawRectangle({
      x: 0,
      y: height - 150,
      width: width,
      height: 150,
      color: primaryBlue,
    })

    // Add a decorative element
    for (let i = 0; i < 5; i++) {
      page.drawCircle({
        x: margin + i * 20,
        y: height - 30,
        size: 8,
        color: teal,
      })
    }

    // Add title with shadow effect
    addText("Health Profile", width / 2 - 100, height - 80, timesRomanBoldFont, 36, white)

    // Add a decorative line
    drawLine(width / 2 - 100, height - 90, width / 2 + 100, height - 90, 2, white)

    // Add subtitle
    addText("Comprehensive Medical Record", width / 2 - 90, height - 110, timesRomanFont, 16, white)

    y = height - 170

    // Helper function to create a table header
    const createTableHeader = (headers: string[], yPos: number, rowWidth: number) => {
      const cellWidth = rowWidth / headers.length

      // Draw header background
      page.drawRectangle({
        x: margin - 5,
        y: yPos - 5,
        width: rowWidth + 10,
        height: 25,
        color: teal,
      })

      // Draw header cells
      headers.forEach((header, index) => {
        addText(header, margin + index * cellWidth + 5, yPos, helveticaBoldFont, 12, white)

        // Draw vertical dividers between cells (except after the last cell)
        if (index < headers.length - 1) {
          drawLine(margin + (index + 1) * cellWidth, yPos - 5, margin + (index + 1) * cellWidth, yPos + 20, 1, white)
        }
      })

      return yPos - 30
    }

    // Helper function to add a table row
    const addTableRow = (values: string[], yPos: number, rowWidth: number, rowIndex: number) => {
      const cellWidth = rowWidth / values.length
      const bgColor = rowIndex % 2 === 0 ? lightGray : white

      // Draw row background
      page.drawRectangle({
        x: margin - 5,
        y: yPos - 5,
        width: rowWidth + 10,
        height: 25,
        color: bgColor,
      })

      // Draw row values
      values.forEach((value, index) => {
        addText(value, margin + index * cellWidth + 5, yPos, helveticaFont, 10, black)

        // Draw vertical dividers between cells (except after the last cell)
        if (index < values.length - 1) {
          drawLine(
            margin + (index + 1) * cellWidth,
            yPos - 5,
            margin + (index + 1) * cellWidth,
            yPos + 20,
            0.5,
            mediumGray,
          )
        }
      })

      return yPos - 30
    }

    // Helper function to add section headers with styling
    const addSectionHeader = (text: string, yPos: number) => {
      // Check if we need a new page
      yPos = checkForNewPage(yPos, 100)

      // Draw a gradient-like effect with multiple rectangles
      for (let i = 0; i < 5; i++) {
        const opacity = 0.8 - i * 0.15
        page.drawRectangle({
          x: margin - 10 + i,
          y: yPos - 5 - i,
          width: width - 2 * margin + 20 - i * 2,
          height: 30,
          color: primaryBlue,
          opacity: opacity > 0 ? opacity : 0.1,
        })
      }

      // Add an accent bar
      page.drawRectangle({
        x: margin - 15,
        y: yPos - 5,
        width: 5,
        height: 30,
        color: orange,
      })

      addText(text, margin, yPos, helveticaBoldFont, 16, white)

      // Add decorative element
      page.drawCircle({
        x: width - margin - 15,
        y: yPos + 10,
        size: 6,
        color: orange,
      })

      return yPos - 40
    }

    // Helper function to add data rows with alternating colors
    const addDataRow = (label: string, value: string, yPos: number, rowIndex: number) => {
      // Check if we need a new page
      yPos = checkForNewPage(yPos, 30)

      const bgColor = rowIndex % 2 === 0 ? lightGray : white
      page.drawRectangle({
        x: margin - 5,
        y: yPos - 5,
        width: width - 2 * margin + 10,
        height: 20,
        color: bgColor,
        borderColor: mediumGray,
        borderWidth: 0.5,
      })

      // Add a colored dot before the label
      page.drawCircle({
        x: margin,
        y: yPos + 5,
        size: 3,
        color: teal,
      })

      addText(`${label}:`, margin + 10, yPos, helveticaBoldFont, 11, black)
      addText(value, margin + 150, yPos, helveticaFont, 11, primaryBlue)
      return yPos - 25
    }

    // Helper function to add a footer to all pages
    const addFooter = (pageObj: any) => {
      const { width, height } = pageObj.getSize()

      // Draw footer background
      pageObj.drawRectangle({
        x: 0,
        y: 0,
        width: width,
        height: 30,
        color: primaryBlue,
      })

      // Add footer text
      pageObj.drawText("Health Profile Generated on " + new Date().toLocaleDateString(), {
        x: margin,
        y: 10,
        font: helveticaFont,
        size: 10,
        color: white,
      })

      // Add page number
      const pageIndex = pdfDoc.getPageIndices().indexOf(pdfDoc.getPages().indexOf(pageObj))
      pageObj.drawText(`Page ${pageIndex + 1} of ${pdfDoc.getPageCount()}`, {
        x: width - margin - 60,
        y: 10,
        font: helveticaFont,
        size: 10,
        color: white,
      })

      // Add decorative elements
      for (let i = 0; i < 3; i++) {
        pageObj.drawCircle({
          x: width / 2 - 15 + i * 15,
          y: 15,
          size: 5,
          color: teal,
        })
      }
    }

    const user = userData.data

    // Personal details section
    y = addSectionHeader("Personal Information", y)
    let rowIndex = 0
    y = addDataRow("Name", `${user.firstName} ${user.lastName}`, y, rowIndex++)
    y = addDataRow("Age", `${user.age}`, y, rowIndex++)
    y = addDataRow("Gender", `${user.gender}`, y, rowIndex++)
    y = addDataRow("Blood Group", `${user.bloodGroup}`, y, rowIndex++)
    y = addDataRow("Date of Birth", `${new Date(user.dateOfBirth).toLocaleDateString()}`, y, rowIndex++)
    y = addDataRow("Email", `${user.email}`, y, rowIndex++)
    y = addDataRow("Phone", `${user.contactDetails.phone}`, y, rowIndex++)
    y = addDataRow("Emergency Contact", `${user.contactDetails.emergencyContact}`, y, rowIndex++)
    if (user.governmentId) {
      y = addDataRow("Government ID", `${user.governmentId}`, y, rowIndex++)
    }
    y -= 10

    // Address section
    y = addSectionHeader("Address", y)
    rowIndex = 0
    y = addDataRow(`Village`, `${user.address.village}`, y, rowIndex++)
    y = addDataRow(`District`, `${user.address.district}`, y, rowIndex++)
    y = addDataRow(`State`, `${user.address.state}`, y, rowIndex++)
    y = addDataRow(`Pincode`, `${user.address.pincode}`, y, rowIndex++)
    y -= 10

    // Subscription details
    if (user.subscriptionPlan) {
      y = addSectionHeader("Subscription Details", y)
      rowIndex = 0
      y = addDataRow("Plan", `${user.subscriptionPlan}`, y, rowIndex++)
      if (user.subscriptionAmount) {
        y = addDataRow("Amount", `Rs. ${user.subscriptionAmount}`, y, rowIndex++)
      }

      // Subscription benefits
      if (user.subscriptionBenefits && user.subscriptionBenefits.length > 0) {
        y = addDataRow("Benefits", "", y, rowIndex++)
        user.subscriptionBenefits.forEach((benefit: string, index: number) => {
          y = checkForNewPage(y, 30)
          addText(`• ${benefit}`, margin + 150, y, helveticaFont, 11, primaryBlue)
          y -= 20
        })
      }
      y -= 10
    }

    // Medical conditions as a table
    y = addSectionHeader("Chronic Conditions", y)

    if (user.chronicConditions && user.chronicConditions.length > 0) {
      // Create table headers
      const conditionHeaders = ["Condition", "Diagnosed Date", "Severity", "Status", "Management"]
      const tableWidth = width - 2 * margin
      y = createTableHeader(conditionHeaders, y, tableWidth)

      // Helper function to get severity color
      const getSeverityColor = (severity: string) => {
        switch (severity.toLowerCase()) {
          case "high":
          case "severe":
            return rgb(0.9, 0.2, 0.2) // Red for high severity
          case "medium":
          case "moderate":
            return orange // Orange for medium severity
          default:
            return rgb(0.2, 0.7, 0.2) // Green for low severity
        }
      }

      // Add table rows
      user.chronicConditions.forEach((condition: any, index: number) => {
        // Check if we need a new page
        y = checkForNewPage(y, 40)

        // Create a severity indicator
        const severityColor = getSeverityColor(condition.severity)
        const severityText = `• ${condition.severity}`

        const values = [
          condition.name,
          new Date(condition.diagnosedDate).toLocaleDateString(),
          severityText,
          condition.status,
          condition.managementPlan.length > 20
            ? condition.managementPlan.substring(0, 20) + "..."
            : condition.managementPlan,
        ]

        y = addTableRow(values, y, tableWidth, index)

        // Add severity color indicator
        page.drawCircle({
          x: margin + (tableWidth / 5) * 2 + 5,
          y: y + 25,
          size: 5,
          color: severityColor,
        })
      })
    } else {
      y = addDataRow("Note", "No chronic conditions recorded.", y, 0)
    }
    y -= 10

    // Past Medical Conditions
    if (user.pastMedicalConditions && user.pastMedicalConditions.length > 0) {
      y = addSectionHeader("Past Medical Conditions", y)

      // Create table headers
      const pastConditionHeaders = ["Condition", "Start Date", "End Date", "Treatment"]
      const tableWidth = width - 2 * margin
      y = createTableHeader(pastConditionHeaders, y, tableWidth)

      // Add table rows
      user.pastMedicalConditions.forEach((condition: any, index: number) => {
        // Check if we need a new page
        y = checkForNewPage(y, 40)

        const values = [
          condition.name,
          new Date(condition.startDate).toLocaleDateString(),
          new Date(condition.endDate).toLocaleDateString(),
          condition.treatment,
        ]

        y = addTableRow(values, y, tableWidth, index)
      })
      y -= 10
    }

    // Allergies as a table
    y = addSectionHeader("Allergies", y)

    if (user.allergies && user.allergies.length > 0) {
      // Create table headers
      const allergyHeaders = ["Allergen", "Type", "Severity", "Reaction"]
      const tableWidth = width - 2 * margin
      y = createTableHeader(allergyHeaders, y, tableWidth)

      // Add table rows
      user.allergies.forEach((allergy: any, index: number) => {
        // Check if we need a new page
        y = checkForNewPage(y, 40)

        const values = [
          allergy.allergen,
          allergy.type,
          allergy.severity,
          allergy.reaction.length > 25 ? allergy.reaction.substring(0, 25) + "..." : allergy.reaction,
        ]

        y = addTableRow(values, y, tableWidth, index)
      })
    } else {
      y = addDataRow("Note", "No allergies recorded.", y, 0)
    }
    y -= 10

    // Current medications as a table
    y = addSectionHeader("Current Medications", y)

    if (user.currentMedications && user.currentMedications.length > 0) {
      // Create table headers
      const medicationHeaders = ["Medication", "Dosage", "Prescribed By", "Schedule", "Next Refill"]
      const tableWidth = width - 2 * margin
      y = createTableHeader(medicationHeaders, y, tableWidth)

      // Add table rows
      user.currentMedications.forEach((medication: any, index: number) => {
        // Check if we need a new page
        y = checkForNewPage(y, 40)

        const values = [
          medication.name,
          medication.dosage,
          medication.prescribedBy,
          medication.schedule,
          new Date(medication.nextRefillDate).toLocaleDateString(),
        ]

        y = addTableRow(values, y, tableWidth, index)
      })
    } else {
      y = addDataRow("Note", "No current medications recorded.", y, 0)
    }
    y -= 10

    // Previous medications
    if (user.previousMedications && user.previousMedications.length > 0) {
      y = addSectionHeader("Previous Medications", y)

      // Create table headers
      const prevMedHeaders = ["Medication", "Dosage", "Prescribed By", "Start Date", "End Date", "Reason for Stopping"]
      const tableWidth = width - 2 * margin
      y = createTableHeader(prevMedHeaders, y, tableWidth)

      // Add table rows
      user.previousMedications.forEach((medication: any, index: number) => {
        // Check if we need a new page
        y = checkForNewPage(y, 40)

        const values = [
          medication.name,
          medication.dosage,
          medication.prescribedBy,
          new Date(medication.startDate).toLocaleDateString(),
          new Date(medication.endDate).toLocaleDateString(),
          medication.reasonForStopping,
        ]

        y = addTableRow(values, y, tableWidth, index)
      })
      y -= 10
    }

    // Medicine packages
    if (user.medicinePackages && user.medicinePackages.length > 0) {
      y = addSectionHeader("Medicine Packages", y)

      user.medicinePackages.forEach((pkg: any, pkgIndex: number) => {
        // Check if we need a new page
        y = checkForNewPage(y, 120)

        // Create a package card
        page.drawRectangle({
          x: margin,
          y: y - 100,
          width: width - 2 * margin,
          height: 100,
          color: lightBlue,
          borderColor: primaryBlue,
          borderWidth: 1,
        })

        // Add package header
        page.drawRectangle({
          x: margin,
          y: y,
          width: width - 2 * margin,
          height: 25,
          color: primaryBlue,
        })

        addText(pkg.name, margin + 10, y + 7, helveticaBoldFont, 14, white)

        // Add status indicator
        const statusColor = pkg.active ? teal : rgb(0.7, 0.7, 0.7)
        page.drawCircle({
          x: width - margin - 20,
          y: y + 12,
          size: 8,
          color: statusColor,
        })

        addText(pkg.active ? "Active" : "Inactive", width - margin - 60, y + 7, helveticaFont, 12, statusColor)

        // Add package details
        y -= 25
        addText(`Monthly Cost: Rs. ${pkg.monthlyCost}`, margin + 20, y, helveticaFont, 12, black)
        y -= 15
        addText(
          `Next Delivery: ${new Date(pkg.nextDeliveryDate).toLocaleDateString()}`,
          margin + 20,
          y,
          helveticaFont,
          12,
          black,
        )
        y -= 15
        addText(`Supply Remaining: ${pkg.supplyRemaining} days`, margin + 20, y, helveticaFont, 12, black)
        y -= 15

        // Add medications list
        if (pkg.medications && pkg.medications.length > 0) {
          addText("Medications:", margin + 20, y, helveticaBoldFont, 12, black)
          y -= 15

          pkg.medications.forEach((med: string, medIndex: number) => {
            addText(`• ${med}`, margin + 40, y, helveticaFont, 11, black)
            y -= 15
          })
        }

        y -= 10
      })
      y -= 10
    }

    // Vaccination records as a table
    y = addSectionHeader("Vaccination Records", y)

    if (user.vaccinationRecords && user.vaccinationRecords.length > 0) {
      // Create table headers
      const vaccineHeaders = ["Vaccine", "Type", "Date", "Doctor", "Location", "Batch #"]
      const tableWidth = width - 2 * margin
      y = createTableHeader(vaccineHeaders, y, tableWidth)

      // Add table rows
      user.vaccinationRecords.forEach((vaccine: any, index: number) => {
        // Check if we need a new page
        y = checkForNewPage(y, 40)

        const values = [
          vaccine.vaccineName,
          vaccine.type,
          new Date(vaccine.date).toLocaleDateString(),
          vaccine.doctorName,
          vaccine.location,
          vaccine.batchNumber,
        ]

        y = addTableRow(values, y, tableWidth, index)
      })
    } else {
      y = addDataRow("Note", "No vaccination records available.", y, 0)
    }
    y -= 10

    // Upcoming vaccinations
    if (user.upcomingVaccinations && user.upcomingVaccinations.length > 0) {
      y = addSectionHeader("Upcoming Vaccinations", y)

      // Create table headers
      const upcomingVaccineHeaders = ["Vaccine", "Due Date", "Free Under Govt Scheme", "Notes"]
      const tableWidth = width - 2 * margin
      y = createTableHeader(upcomingVaccineHeaders, y, tableWidth)

      // Add table rows
      user.upcomingVaccinations.forEach((vaccine: any, index: number) => {
        // Check if we need a new page
        y = checkForNewPage(y, 40)

        const values = [
          vaccine.vaccineName,
          new Date(vaccine.dueDate).toLocaleDateString(),
          vaccine.freeUnderGovtScheme ? "Yes" : "No",
          vaccine.notes || "",
        ]

        y = addTableRow(values, y, tableWidth, index)
      })
      y -= 10
    }

    // Recommended vaccinations
    if (user.recommendedVaccinations && user.recommendedVaccinations.length > 0) {
      y = addSectionHeader("Recommended Vaccinations", y)

      // Create table headers
      const recVaccineHeaders = ["Vaccine", "Description", "Priority", "Free Under Govt Scheme", "Warning"]
      const tableWidth = width - 2 * margin
      y = createTableHeader(recVaccineHeaders, y, tableWidth)

      // Add table rows
      user.recommendedVaccinations.forEach((vaccine: any, index: number) => {
        // Check if we need a new page
        y = checkForNewPage(y, 40)

        const values = [
          vaccine.vaccineName,
          vaccine.description.length > 20 ? vaccine.description.substring(0, 20) + "..." : vaccine.description,
          vaccine.priority,
          vaccine.freeUnderGovtScheme ? "Yes" : "No",
          vaccine.warning || "",
        ]

        y = addTableRow(values, y, tableWidth, index)
      })
      y -= 10
    }

    // Hospital visits as a table
    y = addSectionHeader("Hospital Visits", y)

    if (user.hospitalVisits && user.hospitalVisits.length > 0) {
      // Create table headers
      const visitHeaders = ["Hospital", "Type", "Date", "Doctor", "Specialization", "Diagnosis"]
      const tableWidth = width - 2 * margin
      y = createTableHeader(visitHeaders, y, tableWidth)

      // Add table rows
      user.hospitalVisits.forEach((visit: any, index: number) => {
        // Check if we need a new page
        y = checkForNewPage(y, 40)

        const values = [
          visit.hospitalName,
          visit.hospitalType,
          new Date(visit.date).toLocaleDateString(),
          visit.doctorName,
          visit.specialization,
          visit.diagnosis.length > 20 ? visit.diagnosis.substring(0, 20) + "..." : visit.diagnosis,
        ]

        y = addTableRow(values, y, tableWidth, index)
      })
    } else {
      y = addDataRow("Note", "No hospital visits recorded.", y, 0)
    }
    y -= 10

    // Surgeries as a table
    y = addSectionHeader("Surgeries", y)

    if (user.surgeries && user.surgeries.length > 0) {
      // Create table headers
      const surgeryHeaders = ["Surgery", "Date", "Hospital", "Surgeon", "Details", "Follow-up"]
      const tableWidth = width - 2 * margin
      y = createTableHeader(surgeryHeaders, y, tableWidth)

      // Add table rows
      user.surgeries.forEach((surgery: any, index: number) => {
        // Check if we need a new page
        y = checkForNewPage(y, 40)

        const values = [
          surgery.name,
          new Date(surgery.date).toLocaleDateString(),
          surgery.hospital,
          surgery.surgeon,
          surgery.details.length > 15 ? surgery.details.substring(0, 15) + "..." : surgery.details,
          new Date(surgery.followUp).toLocaleDateString(),
        ]

        y = addTableRow(values, y, tableWidth, index)
      })
    } else {
      y = addDataRow("Note", "No surgeries recorded.", y, 0)
    }
    y -= 10

    // Health reports
    if (user.healthReports && user.healthReports.length > 0) {
      y = addSectionHeader("Health Reports", y)

      // Create table headers
      const reportHeaders = ["Type", "Summary", "Period", "First Reading", "Latest Reading", "Improvement"]
      const tableWidth = width - 2 * margin
      y = createTableHeader(reportHeaders, y, tableWidth)

      // Add table rows
      user.healthReports.forEach((report: any, index: number) => {
        // Check if we need a new page
        y = checkForNewPage(y, 40)

        const period = `${new Date(report.startDate).toLocaleDateString()} - ${new Date(report.endDate).toLocaleDateString()}`
        const improvementText = report.improvement ? `Yes (${report.improvementValue})` : "No"

        const values = [report.type, report.summary, period, report.firstReading, report.latestReading, improvementText]

        y = addTableRow(values, y, tableWidth, index)
      })
      y -= 10
    }

    // Family details as a table
    y = addSectionHeader("Family Details", y)

    if (user.familyDetails && user.familyDetails.length > 0) {
      // Create table headers
      const familyHeaders = ["Name", "Relationship", "Age", "Covered Under Insurance"]
      const tableWidth = width - 2 * margin
      y = createTableHeader(familyHeaders, y, tableWidth)

      // Add table rows
      user.familyDetails.forEach((family: any, index: number) => {
        // Check if we need a new page
        y = checkForNewPage(y, 40)

        const values = [
          family.name,
          family.relationship,
          family.age.toString(),
          family.coveredUnderInsurance ? "Yes" : "No",
        ]

        y = addTableRow(values, y, tableWidth, index)
      })
    } else {
      y = addDataRow("Note", "No family details recorded.", y, 0)
    }
    y -= 10

    // Insurance information
    y = addSectionHeader("Insurance Information", y)

    if (user.insuranceCoverage) {
      // Check if we need a new page
      y = checkForNewPage(y, 150)

      // Create a stylish insurance card
      page.drawRectangle({
        x: margin,
        y: y - 120,
        width: width - 2 * margin,
        height: 120,
        color: lightBlue,
        borderColor: primaryBlue,
        borderWidth: 1,
        borderOpacity: 0.5,
      })

      // Add insurance card header
      page.drawRectangle({
        x: margin,
        y: y - 30,
        width: width - 2 * margin,
        height: 30,
        color: primaryBlue,
      })

      addText("Insurance Card", margin + 10, y - 15, helveticaBoldFont, 14, white)

      // Add insurance logo placeholder
      page.drawCircle({
        x: width - margin - 50,
        y: y - 15,
        size: 10,
        color: white,
      })

      // Add insurance details
      y -= 40
      addText(`Provider: ${user.insuranceProvider}`, margin + 20, y, helveticaBoldFont, 12, black)
      y -= 15
      addText(`Policy Number: ${user.insurancePolicyNumber}`, margin + 20, y, helveticaFont, 12, black)
      y -= 15
      addText(`Type: ${user.insuranceType}`, margin + 20, y, helveticaFont, 12, black)
      y -= 15

      // Add coverage details with visual indicator
      const coverageAmount = user.insuranceCoverageAmount
      const usedAmount = user.insuranceUsed
      const remainingPercentage = Math.max(0, 100 - (usedAmount / coverageAmount) * 100)

      addText(`Coverage: Rs. ${coverageAmount.toLocaleString()}`, margin + 20, y, helveticaFont, 12, black)
      y -= 15
      addText(`Used: Rs. ${usedAmount.toLocaleString()}`, margin + 20, y, helveticaFont, 12, black)
      y -= 15

      // Add a coverage bar
      const barWidth = 200
      const usedWidth = barWidth * (usedAmount / coverageAmount)

      // Draw background bar
      page.drawRectangle({
        x: margin + 100,
        y: y - 5,
        width: barWidth,
        height: 10,
        color: lightGray,
        borderColor: mediumGray,
        borderWidth: 0.5,
      })

      // Draw used amount bar
      page.drawRectangle({
        x: margin + 100,
        y: y - 5,
        width: usedWidth,
        height: 10,
        color: remainingPercentage < 20 ? rgb(0.9, 0.2, 0.2) : remainingPercentage < 50 ? orange : teal,
      })

      addText(
        `Valid Until: ${new Date(user.insuranceValidUntil).toLocaleDateString()}`,
        margin + 20,
        y - 20,
        helveticaFont,
        12,
        black,
      )
      y -= 40
    } else {
      y = addDataRow("Note", "No insurance coverage recorded.", y, 0)
      y -= 10
    }

    // Government schemes as a table
    y = addSectionHeader("Government Schemes", y)

    if (user.govtSchemes && user.govtSchemes.length > 0) {
      // Create table headers
      const schemeHeaders = ["Scheme", "Status", "Card Number", "Valid Until", "Coverage"]
      const tableWidth = width - 2 * margin
      y = createTableHeader(schemeHeaders, y, tableWidth)

      // Add table rows
      user.govtSchemes.forEach((scheme: any, index: number) => {
        // Check if we need a new page
        y = checkForNewPage(y, 40)

        const values = [
          scheme.name,
          scheme.status,
          scheme.cardNumber,
          new Date(scheme.validUntil).toLocaleDateString(),
          scheme.coverageDetails.length > 20 ? scheme.coverageDetails.substring(0, 20) + "..." : scheme.coverageDetails,
        ]

        y = addTableRow(values, y, tableWidth, index)
      })
    } else {
      y = addDataRow("Note", "No government schemes recorded.", y, 0)
    }

    // Add appointments if available
    if (user.appointments && user.appointments.length > 0) {
      y = addSectionHeader("Upcoming Appointments", y)

      // Create table headers
      const appointmentHeaders = ["Date", "Time", "Doctor", "Hospital", "Purpose"]
      const tableWidth = width - 2 * margin
      y = createTableHeader(appointmentHeaders, y, tableWidth)

      // Add table rows
      user.appointments.forEach((appointment: any, index: number) => {
        // Check if we need a new page
        y = checkForNewPage(y, 40)

        const appointmentDate = new Date(appointment.date)
        const values = [
          appointmentDate.toLocaleDateString(),
          appointment.time || "N/A",
          appointment.doctorName || "N/A",
          appointment.hospitalName || "N/A",
          appointment.purpose || "N/A",
        ]

        y = addTableRow(values, y, tableWidth, index)
      })
      y -= 10
    }

    // Add footers to all pages
    pdfDoc.getPages().forEach((pageObj) => {
      addFooter(pageObj)
    })

    // Finalize the PDF
    const pdfBytes = await pdfDoc.save()
    return Buffer.from(pdfBytes)
  } catch (error) {
    console.error("Error generating PDF:", error)
    throw error
  }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Fetch user data
    const userData = await fetchUserData(id)

    // Replace ₹ with Rs. in the data
    const sanitizedUserData = JSON.parse(JSON.stringify(userData).replace(/₹/g, "Rs."))

    // Generate PDF
    const pdfBuffer = await generatePDF(sanitizedUserData)

    // Return the PDF as a downloadable file
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="health_profile_${id}.pdf"`,
      },
    })
  } catch (error) {
    console.error("Error generating PDF:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate PDF",
        error: (error as Error).message,
      },
      { status: 500 },
    )
  }
}

